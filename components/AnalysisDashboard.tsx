
import React, { useState } from 'react';
import { ModernApplication, VisualFlowStep, SugyaSection } from '../types';
import { Briefcase, Gavel, Scale, BookOpen, ArrowRight, DollarSign, ChevronDown, X, Sparkles } from 'lucide-react';

interface Props {
  sugya: SugyaSection;
  section: 'STRUCTURE' | 'LOGIC' | 'MELITZA';
  onSelectNode: (id: string) => void;
}

export const AnalysisDashboard: React.FC<Props> = ({ sugya, section, onSelectNode }) => {
  const [activeLogicIdx, setActiveLogicIdx] = useState<number>(0);
  const [selectedMelitza, setSelectedMelitza] = useState<ModernApplication | null>(null);
  
  const hasData = (sugya.analysis && sugya.analysis.length > 0) || (sugya.logicSystem?.statements && sugya.logicSystem.statements.length > 0);

  if (!hasData) {
      return (
          <div className="flex flex-col items-center justify-center h-full p-12 text-center bg-[#fdfbf7]">
              <div className="max-w-md p-8 bg-white border border-stone-300 shadow-xl rounded-sm">
                <BookOpen size={64} className="text-stone-300 mb-6 mx-auto" />
                <h3 className="text-2xl font-hebrew font-bold text-stone-900 mb-2">חסר תוכן הניתוח</h3>
                <p className="text-stone-500 font-serif italic">
                    Deep analysis content is missing for this Sugya.
                </p>
              </div>
          </div>
      )
  }

  // --- SUB-COMPONENT RENDERERS ---

  const renderVisualFlowStep = (step: VisualFlowStep) => {
      const hasBranches = step.branches && step.branches.length > 0;

      return (
          <div key={step.id} className="flex flex-col items-center w-full">
              <div className={`
                  relative z-10 w-full max-w-md bg-white border-2 p-4 rounded-lg shadow-sm mb-8
                  ${step.type === 'QUESTION' ? 'border-red-200 bg-red-50/10' : 
                    step.type === 'DECISION' ? 'border-amber-200 bg-amber-50/10' : 
                    step.type === 'RESULT' ? 'border-emerald-200 bg-emerald-50/10' : 'border-stone-200'}
              `}>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-stone-300">
                      <ChevronDown size={20} />
                  </div>
                  <div className="text-center">
                      <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 block
                          ${step.type === 'QUESTION' ? 'text-red-500' : 
                            step.type === 'DECISION' ? 'text-amber-500' : 
                            step.type === 'RESULT' ? 'text-emerald-500' : 'text-stone-400'}
                      `}>
                          {step.type}
                      </span>
                      <div className="font-bold text-stone-800 text-sm mb-1">{step.label}</div>
                      {step.description && <div className="text-xs text-stone-500 font-serif">{step.description}</div>}
                  </div>
              </div>
              {hasBranches && (
                  <div className="flex justify-center w-full relative">
                      {step.branches!.length > 1 && (
                          <div className="absolute top-[-16px] left-[25%] right-[25%] h-0.5 bg-stone-300 rounded"></div>
                      )}
                      <div className="flex w-full justify-around gap-4">
                          {step.branches!.map((branch) => (
                              <div key={branch.id} className="flex-1 flex flex-col items-center relative">
                                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 h-8 w-0.5 bg-stone-300"></div>
                                  {renderVisualFlowStep(branch)}
                              </div>
                          ))}
                      </div>
                  </div>
              )}
          </div>
      );
  };

  const renderStructurePage = () => (
      <div className="w-full max-w-[1600px] grid grid-cols-1 lg:grid-cols-12 gap-6 relative flex-1 min-h-[800px]">
        <div className="lg:col-span-3 text-right space-y-8" dir="rtl">
            <div className="text-center border-b border-stone-300 pb-2 mb-4">
                 <h3 className="font-hebrew font-bold text-xl text-stone-900">יסודות ותבונות</h3>
                 <span className="text-[10px] text-stone-400 uppercase tracking-widest block mt-1">Components</span>
            </div>
            <div className="space-y-6">
                {['CASE', 'LAW', 'FACTOR', 'SOURCE'].map((category) => {
                    const item = sugya.analysis?.find(d => d.category === category);
                    if (!item) return null;
                    return (
                        <div key={category} className="group cursor-pointer">
                            <div className="flex items-center gap-2 mb-1 text-stone-400 group-hover:text-stone-600 transition-colors justify-end border-b border-stone-100 pb-1">
                                <span className="text-[10px] font-bold uppercase tracking-widest">{category}</span>
                                {category === 'CASE' && <Briefcase size={12} />}
                                {category === 'LAW' && <Gavel size={12} />}
                                {category === 'FACTOR' && <Scale size={12} />}
                                {category === 'SOURCE' && <BookOpen size={12} />}
                            </div>
                            <div className="bg-[#fcfaf5] p-3 rounded border border-stone-200 hover:border-stone-400 transition-all shadow-sm">
                                <div className="font-bold text-stone-900 text-sm mb-1">{item.title}</div>
                                <div className="text-xs text-stone-600 font-serif leading-relaxed pl-4 border-l-2 border-stone-300">
                                    {item.description}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
        <div className="lg:col-span-9 bg-white shadow-lg border-x border-stone-200 p-8 md:p-12 relative flex flex-col min-h-[1000px]">
            <div className="text-center mb-10">
                <span className="font-hebrew text-3xl font-bold text-stone-900 border-b-2 border-stone-900 pb-1 px-6 inline-block tracking-wide">
                    משא ומתן
                </span>
                <span className="text-[10px] text-stone-400 uppercase tracking-widest block mt-2">Flow of the Sugya</span>
            </div>
            <div className="flex-1 space-y-0 relative py-4 max-w-4xl mx-auto w-full">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-stone-200 -translate-x-1/2 z-0"></div>
                {sugya.visualFlow?.map((step) => (
                    <div key={step.id} className="relative z-10 w-full">
                        {renderVisualFlowStep(step)}
                    </div>
                ))}
            </div>
        </div>
      </div>
  );

  const renderLogicPage = () => {
      const activeStmt = sugya.logicSystem?.statements?.[activeLogicIdx];
      return (
        <div className="w-full max-w-[1600px] grid grid-cols-12 gap-0 border-x border-stone-300 shadow-2xl min-h-[900px] bg-[#fdfbf7]">
            <div className="col-span-12 md:col-span-3 border-l border-stone-300 py-8 px-4 bg-[#fcfaf5]" dir="rtl">
                <div className="text-center mb-6"><span className="font-rashi font-bold text-xl text-stone-900 border-b border-stone-300 pb-1 inline-block">היקש הראשי</span></div>
                {sugya.logicSystem?.syllogism ? (
                    <div className="text-justify font-rashi text-sm leading-[1.6] text-stone-800 space-y-4">
                        <div><span className="font-bold block text-stone-600 mb-1 text-xs">הקדמה א' (A):</span>{sugya.logicSystem.syllogism.premise1}</div>
                        <div><span className="font-bold block text-stone-600 mb-1 text-xs">הקדמה ב' (B):</span>{sugya.logicSystem.syllogism.premise2}</div>
                        <div className="pt-2 border-t border-stone-200 mt-2"><span className="font-bold block text-stone-900 mb-1 text-xs">מסקנה (C):</span><span className="font-bold">{sugya.logicSystem.syllogism.conclusion}</span></div>
                    </div>
                ) : <div className="text-center text-stone-400 italic font-rashi">אין נתונים</div>}
            </div>
            <div className="col-span-12 md:col-span-6 py-12 px-8 bg-white relative">
                <div className="text-center mb-10"><span className="font-hebrew-serif text-3xl font-bold text-stone-900 border-b-2 border-stone-900 pb-1 px-6 inline-block tracking-[0.1em]">מהלך הסוגיא</span></div>
                <div className="space-y-6">
                    {sugya.logicSystem?.statements?.map((stmt, idx) => (
                        <div key={idx} onMouseEnter={() => setActiveLogicIdx(idx)} className={`relative p-6 rounded transition-all duration-300 cursor-pointer border group ${activeLogicIdx === idx ? 'bg-[#fffdf0] border-[#d4c5a9] shadow-sm' : 'bg-white border-transparent hover:bg-stone-50 hover:border-stone-100'}`}>
                            <div className="absolute top-4 left-4 text-[10px] font-mono text-stone-300">{String(idx + 1).padStart(2, '0')}</div>
                            <div className="flex justify-end mb-2">
                                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border tracking-wider bg-stone-100 text-stone-600 border-stone-200`}>{stmt.type}</span>
                            </div>
                            <p className="font-hebrew-serif text-2xl leading-[1.5] text-stone-900 text-right" dir="rtl">{stmt.text}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="col-span-12 md:col-span-3 border-r border-stone-300 py-8 px-4 bg-[#fcfaf5] flex flex-col" dir="rtl">
                <div className="text-center mb-6 border-b border-stone-300 pb-2"><span className="font-rashi font-bold text-xl text-stone-900">ביאור וניתוח</span></div>
                {activeStmt ? (
                    <div className="space-y-6 animate-in fade-in">
                        <div className="text-justify font-rashi text-sm leading-[1.4] text-stone-800"><span className="font-bold text-stone-900">נושא: </span>{activeStmt.analysis.subject}</div>
                        <div className="text-justify font-rashi text-sm leading-[1.4] text-stone-800"><span className="font-bold text-stone-900">נשוא: </span>{activeStmt.analysis.predicate}</div>
                    </div>
                ) : <div className="text-center font-rashi text-stone-400 text-sm mt-10">עמוד על אחד השלבים כדי לראות את הביאור.</div>}
            </div>
        </div>
      );
  }

  const renderMelitzaPage = () => (
      <div className="w-full max-w-[1200px] flex-1 min-h-[800px] py-8">
          <div className="text-center mb-12">
              <h3 className="font-hebrew font-bold text-4xl text-stone-900 mb-2">מליצה ונפקא מינה</h3>
              <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Modern Applications & Parallels</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sugya.modernAnalysis?.map((ma, idx) => (
                  <div key={idx} onClick={() => setSelectedMelitza(ma)} className="bg-white p-8 rounded-lg border border-stone-200 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all group relative cursor-pointer overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-stone-400 group-hover:bg-amber-600"></div>
                      <div className="flex items-center gap-3 mb-4 border-b border-stone-100 pb-3"><div className="bg-[#fcfaf5] p-2 rounded-full text-stone-600 group-hover:bg-amber-600 group-hover:text-white transition-colors border border-stone-100"><DollarSign size={20} /></div><span className="font-bold text-stone-900 text-lg">{ma.title}</span></div>
                      <div className="space-y-4">
                          <div><span className="text-[10px] text-stone-400 uppercase font-bold block mb-1">Scenario</span><p className="text-sm text-stone-600 font-serif leading-relaxed line-clamp-3">{ma.scenario}</p></div>
                          <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between"><span className="text-[10px] font-bold uppercase text-stone-400 group-hover:text-amber-600">Click for Detail</span><ArrowRight size={16} className="text-stone-300 group-hover:text-amber-600" /></div>
                      </div>
                  </div>
              ))}
          </div>
          {selectedMelitza && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                  <div className="bg-[#fcfaf5] w-full max-w-4xl h-[90vh] rounded-lg shadow-2xl border border-stone-300 flex flex-col relative overflow-hidden">
                      <div className="flex items-center justify-between p-6 border-b border-stone-200 bg-white">
                          <h2 className="text-3xl font-bold text-stone-900 font-hebrew">{selectedMelitza.title}</h2>
                          <button onClick={() => setSelectedMelitza(null)} className="p-2 hover:bg-stone-100 rounded-full text-stone-400"><X size={24} /></button>
                      </div>
                      <div className="flex-1 overflow-y-auto p-8">
                          <p className="font-serif text-xl text-stone-800 leading-relaxed text-center italic mb-8">"{selectedMelitza.scenario}"</p>
                          <div className="p-4 bg-white border rounded text-center"><div className="font-bold text-slate-800">Outcome</div><div>{selectedMelitza.ruling}</div></div>
                      </div>
                  </div>
              </div>
          )}
      </div>
  );

  return (
    <div className="h-full flex flex-col items-center bg-[#fdfbf7] overflow-y-auto p-4 md:p-8">
      <div className="w-full max-w-[1600px] mb-8 flex items-end justify-between border-b border-stone-300 pb-4">
          <div className="text-center flex-1">
               <h1 className="font-hebrew text-4xl md:text-5xl font-black text-stone-900 tracking-tight">
                  ביאור הסוגיא
               </h1>
          </div>
      </div>
      {section === 'STRUCTURE' && renderStructurePage()}
      {section === 'LOGIC' && renderLogicPage()}
      {section === 'MELITZA' && renderMelitzaPage()}
    </div>
  );
};
