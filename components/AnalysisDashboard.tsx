import React, { useState } from 'react';
import { AnalysisComponent, ModernApplication, VisualFlowStep, SugyaSection, LogicStatement } from '../types';
import { Briefcase, Gavel, Scale, BookOpen, ArrowRight, DollarSign, BrainCircuit, ArrowDown, Sparkles, Network, AlertTriangle, Split, CheckCircle2, ChevronDown, Check, X } from 'lucide-react';

interface Props {
  sugya: SugyaSection;
  section: 'STRUCTURE' | 'LOGIC' | 'MELITZA';
  onSelectNode: (id: string) => void;
  onGenerateAi: () => void;
  isGenerating: boolean;
}

export const AnalysisDashboard: React.FC<Props> = ({ sugya, section, onSelectNode, onGenerateAi, isGenerating }) => {
  const [activeLogicIdx, setActiveLogicIdx] = useState<number>(0);
  const [selectedMelitza, setSelectedMelitza] = useState<ModernApplication | null>(null);
  
  const hasData = (sugya.analysis && sugya.analysis.length > 0) || (sugya.logicSystem?.statements && sugya.logicSystem.statements.length > 0);

  if (isGenerating) {
       return (
          <div className="flex flex-col items-center justify-center h-full p-12 text-center bg-[#fdfbf7]">
              <div className="w-16 h-16 border-4 border-stone-300 border-t-slate-900 rounded-full animate-spin mb-6"></div>
              <h3 className="text-xl font-bold text-stone-800 mb-2 font-hebrew">מעבד נתונים...</h3>
              <p className="text-stone-500 font-serif">Deconstructing arguments, mapping logic flow, and finding modern parallels.</p>
          </div>
       );
  }

  if (!hasData && !isGenerating) {
      return (
          <div className="flex flex-col items-center justify-center h-full p-12 text-center bg-[#fdfbf7]">
              <div className="max-w-md p-8 bg-white border border-stone-300 shadow-xl rounded-sm">
                <BrainCircuit size={64} className="text-stone-300 mb-6 mx-auto" />
                <h3 className="text-2xl font-hebrew font-bold text-stone-900 mb-2">חסר תוכן הניתוח</h3>
                <p className="text-stone-500 mb-8 font-serif italic">
                    Deep analysis content is missing for this Sugya.
                </p>
                <button 
                    onClick={onGenerateAi}
                    className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-sm font-bold uppercase tracking-widest text-xs shadow-lg hover:bg-slate-800 hover:-translate-y-1 transition-all w-full"
                >
                    <Sparkles size={16} className="text-amber-400" />
                    Generate with AI
                </button>
              </div>
          </div>
      )
  }

  // --- SUB-COMPONENT RENDERERS (Vilna Pages) ---

  const renderVisualFlowStep = (step: VisualFlowStep) => {
      const hasBranches = step.branches && step.branches.length > 0;

      return (
          <div key={step.id} className="flex flex-col items-center w-full">
              {/* Node */}
              <div className={`
                  relative z-10 w-full max-w-md bg-white border-2 p-4 rounded-lg shadow-sm mb-8
                  ${step.type === 'QUESTION' ? 'border-red-200 bg-red-50/10' : 
                    step.type === 'DECISION' ? 'border-amber-200 bg-amber-50/10' : 
                    step.type === 'RESULT' ? 'border-emerald-200 bg-emerald-50/10' : 'border-stone-200'}
              `}>
                  {/* Arrow Point (Top) */}
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

              {/* Branches */}
              {hasBranches && (
                  <div className="flex justify-center w-full relative">
                      {/* Horizontal Connector Line */}
                      {step.branches!.length > 1 && (
                          <div className="absolute top-[-16px] left-[25%] right-[25%] h-0.5 bg-stone-300 rounded"></div>
                      )}
                      
                      <div className="flex w-full justify-around gap-4">
                          {step.branches!.map((branch, idx) => (
                              <div key={branch.id} className="flex-1 flex flex-col items-center relative">
                                  {/* Vertical Connector from Parent Line */}
                                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 h-8 w-0.5 bg-stone-300"></div>
                                  
                                  {renderVisualFlowStep(branch)}
                              </div>
                          ))}
                      </div>
                  </div>
              )}
              
              {/* Vertical Line for next linear step (rendered by parent loop if linear) - managed by spacing/border in main loop */}
          </div>
      );
  };

  const renderStructurePage = () => (
      <div className="w-full max-w-[1600px] grid grid-cols-1 lg:grid-cols-12 gap-6 relative flex-1 min-h-[800px]">
        {/* RIGHT (Tvunos) */}
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

        {/* CENTER (Massa U'Matan) */}
        <div className="lg:col-span-9 bg-white shadow-[0_0_40px_-10px_rgba(0,0,0,0.1)] border-x border-stone-200 p-8 md:p-12 relative flex flex-col min-h-[1000px]">
            <div className="text-center mb-10">
                <span className="font-hebrew text-3xl font-bold text-stone-900 border-b-2 border-stone-900 pb-1 px-6 inline-block tracking-wide">
                    משא ומתן
                </span>
                <span className="text-[10px] text-stone-400 uppercase tracking-widest block mt-2">Flow of the Sugya</span>
            </div>
            
            <div className="flex-1 space-y-0 relative py-4 max-w-4xl mx-auto w-full">
                {/* Main Vertical Spine for root items */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-stone-200 -translate-x-1/2 z-0"></div>
                
                {sugya.visualFlow && sugya.visualFlow.length > 0 ? (
                    sugya.visualFlow.map((step, idx) => (
                        <div key={step.id} className="relative z-10 w-full">
                            {renderVisualFlowStep(step)}
                        </div>
                    ))
                ) : (
                    <div className="text-center text-stone-400 italic">No visual flow data available.</div>
                )}
            </div>
        </div>
      </div>
  );

  const renderLogicPage = () => {
      const activeStmt = sugya.logicSystem?.statements?.[activeLogicIdx];
      
      return (
        <div className="w-full max-w-[1600px] grid grid-cols-12 gap-0 border-x border-stone-300 shadow-2xl min-h-[900px] bg-[#fdfbf7]">
            
            {/* RIGHT COLUMN: SYLLOGISM (RASHI STYLE) */}
            <div className="col-span-12 md:col-span-3 border-l border-stone-300 py-8 px-4 bg-[#fcfaf5]" dir="rtl">
                <div className="text-center mb-6">
                    <span className="font-rashi font-bold text-xl text-stone-900 border-b border-stone-300 pb-1 inline-block">היקש הראשי</span>
                </div>
                
                {sugya.logicSystem?.syllogism ? (
                    <div className="text-justify font-rashi text-sm leading-[1.6] text-stone-800 space-y-4">
                        <div>
                            <span className="font-bold block text-stone-600 mb-1 text-xs">הקדמה א' (A):</span>
                            {sugya.logicSystem.syllogism.premise1}
                        </div>
                        <div>
                            <span className="font-bold block text-stone-600 mb-1 text-xs">הקדמה ב' (B):</span>
                            {sugya.logicSystem.syllogism.premise2}
                        </div>
                        <div className="pt-2 border-t border-stone-200 mt-2">
                            <span className="font-bold block text-stone-900 mb-1 text-xs">מסקנה (C):</span>
                            <span className="font-bold">{sugya.logicSystem.syllogism.conclusion}</span>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-stone-400 italic font-rashi">אין נתונים</div>
                )}
            </div>

            {/* CENTER COLUMN: LOGIC STATEMENTS (GEMARA STYLE) */}
            <div className="col-span-12 md:col-span-6 py-12 px-8 bg-white relative">
                {/* Header */}
                <div className="text-center mb-10">
                    <span className="font-hebrew-serif text-3xl font-bold text-stone-900 border-b-2 border-stone-900 pb-1 px-6 inline-block tracking-[0.1em]">
                        מהלך הסוגיא
                    </span>
                </div>

                <div className="space-y-6">
                    {sugya.logicSystem?.statements?.map((stmt, idx) => {
                        const isActive = activeLogicIdx === idx;
                        // Muted colors based on logic type
                        const typeLabel = stmt.type;
                        let badgeClass = "bg-stone-100 text-stone-600 border-stone-200";
                        if (stmt.color === 'blue') badgeClass = "bg-slate-100 text-slate-700 border-slate-200";
                        if (stmt.color === 'amber') badgeClass = "bg-[#f5f5dc] text-[#8b4513] border-[#deb887]"; // Beige/Brown
                        if (stmt.color === 'green') badgeClass = "bg-[#f0fff4] text-[#2f4f4f] border-[#c1e1c1]"; // Muted Green

                        return (
                            <div 
                                key={idx} 
                                onMouseEnter={() => setActiveLogicIdx(idx)}
                                className={`
                                    relative p-6 rounded transition-all duration-300 cursor-pointer border group
                                    ${isActive 
                                        ? 'bg-[#fffdf0] border-[#d4c5a9] shadow-sm' 
                                        : 'bg-white border-transparent hover:bg-stone-50 hover:border-stone-100'}
                                `}
                            >
                                {/* Step Number - Floating */}
                                <div className="absolute top-4 left-4 text-[10px] font-mono text-stone-300 group-hover:text-stone-400">
                                    {String(idx + 1).padStart(2, '0')}
                                </div>

                                {/* Type Badge */}
                                <div className="flex justify-end mb-2">
                                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border tracking-wider ${badgeClass}`}>
                                        {typeLabel}
                                    </span>
                                </div>

                                {/* Text */}
                                <p className="font-hebrew-serif text-2xl leading-[1.5] text-stone-900 text-right" dir="rtl">
                                    {stmt.text}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* LEFT COLUMN: ANALYSIS (TOSFOS STYLE) */}
            <div className="col-span-12 md:col-span-3 border-r border-stone-300 py-8 px-4 bg-[#fcfaf5] flex flex-col" dir="rtl">
                <div className="text-center mb-6 border-b border-stone-300 pb-2">
                    <span className="font-rashi font-bold text-xl text-stone-900">ביאור וניתוח</span>
                </div>

                {activeStmt ? (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        {/* Subject */}
                        <div className="text-justify font-rashi text-sm leading-[1.4] text-stone-800">
                            <span className="font-bold text-stone-900">נושא: </span>
                            {activeStmt.analysis.subject}
                        </div>

                        {/* Predicate */}
                        <div className="text-justify font-rashi text-sm leading-[1.4] text-stone-800">
                            <span className="font-bold text-stone-900">נשוא: </span>
                            {activeStmt.analysis.predicate}
                        </div>

                        {/* Reason / Logic */}
                        {activeStmt.analysis.reason && (
                            <div className="text-justify font-rashi text-sm leading-[1.4] text-stone-800 bg-[#f3f0e6] p-2 rounded border border-[#e5e0d0]">
                                <span className="font-bold block text-stone-600 mb-1 text-xs">הסבר / סיבה:</span>
                                {activeStmt.analysis.reason}
                            </div>
                        )}

                        <div className="mt-8 text-center">
                            <div className="text-[10px] text-stone-400 font-sans uppercase tracking-widest border-t border-stone-200 pt-2">
                                Classification: {activeStmt.analysis.statementType}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center font-rashi text-stone-400 text-sm mt-10">
                        עמוד על אחד השלבים כדי לראות את הביאור.
                    </div>
                )}
            </div>

        </div>
      );
  }

  const renderMelitzaDetail = () => {
      if (!selectedMelitza) return null;

      return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-[#fcfaf5] w-full max-w-4xl h-[90vh] rounded-lg shadow-2xl border border-stone-300 flex flex-col relative overflow-hidden">
                  
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-stone-200 bg-white">
                      <div>
                          <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                              <Sparkles size={12} className="text-amber-500" />
                              Melitza Deep Dive
                          </div>
                          <h2 className="text-3xl font-bold text-stone-900 font-hebrew">{selectedMelitza.title}</h2>
                      </div>
                      <button 
                        onClick={() => setSelectedMelitza(null)}
                        className="p-2 hover:bg-stone-100 rounded-full text-stone-400 hover:text-stone-700 transition-colors"
                      >
                          <X size={24} />
                      </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-8">
                      {/* Scenario */}
                      <div className="mb-10 text-center max-w-2xl mx-auto">
                          <p className="font-serif text-xl text-stone-800 leading-relaxed italic">
                              "{selectedMelitza.scenario}"
                          </p>
                      </div>

                      {/* The Yesod (Connection) */}
                      {selectedMelitza.deepAnalysis && (
                          <div className="mb-12 bg-white border-y-4 border-stone-200 p-8 text-center relative">
                              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fcfaf5] px-4 py-1 border border-stone-200 rounded-full text-xs font-bold uppercase tracking-widest text-stone-500">
                                  The Underlying Connection (Yesod)
                              </div>
                              <p className="font-bold text-lg text-stone-900">{selectedMelitza.deepAnalysis.yesod}</p>
                          </div>
                      )}

                      {/* Responsa Table (Applications) */}
                      {selectedMelitza.deepAnalysis && (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              {selectedMelitza.deepAnalysis.perspectives.map((pers, idx) => (
                                  <div key={idx} className="bg-white rounded border border-stone-200 p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow">
                                      <div className="mb-4 border-b border-stone-100 pb-2">
                                          <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Authority</span>
                                          <div className="font-hebrew font-bold text-xl text-stone-900 mt-1">{pers.authority}</div>
                                      </div>
                                      
                                      <div className="flex-1 mb-6">
                                          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-2">Applied Logic</span>
                                          <p className="text-sm font-serif text-stone-600 leading-relaxed">
                                              {pers.logic}
                                          </p>
                                      </div>

                                      <div className={`mt-auto p-3 rounded text-center border ${
                                          pers.outcome.includes('Valid') ? 'bg-emerald-50 border-emerald-100 text-emerald-800' :
                                          pers.outcome.includes('Invalid') ? 'bg-red-50 border-red-100 text-red-800' :
                                          'bg-amber-50 border-amber-100 text-amber-800'
                                      }`}>
                                          <span className="text-[10px] font-bold uppercase tracking-widest block mb-1">Outcome</span>
                                          <div className="font-bold text-sm">{pers.outcome}</div>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      )}
                  </div>

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
                  <div 
                    key={idx} 
                    onClick={() => setSelectedMelitza(ma)}
                    className="bg-white p-8 rounded-lg border border-stone-200 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden cursor-pointer"
                  >
                      <div className="absolute top-0 left-0 w-full h-1 bg-stone-400 group-hover:bg-amber-600 transition-colors"></div>
                      <div className="flex items-center gap-3 mb-4 border-b border-stone-100 pb-3">
                          <div className="bg-[#fcfaf5] p-2 rounded-full text-stone-600 group-hover:bg-amber-600 group-hover:text-white transition-colors border border-stone-100">
                              <DollarSign size={20} />
                          </div>
                          <span className="font-bold text-stone-900 text-lg">{ma.title}</span>
                      </div>
                      
                      <div className="space-y-4">
                          <div>
                              <span className="text-[10px] text-stone-400 uppercase font-bold block mb-1">Scenario</span>
                              <p className="text-sm text-stone-600 font-serif leading-relaxed line-clamp-3">{ma.scenario}</p>
                          </div>
                          <div>
                              <span className="text-[10px] text-stone-400 uppercase font-bold block mb-1">Parallel</span>
                              <p className="text-sm text-stone-600 font-serif leading-relaxed italic border-l-2 border-stone-300 pl-3 line-clamp-2">{ma.parallels}</p>
                          </div>
                          <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
                              <span className="text-[10px] font-bold uppercase text-stone-400 group-hover:text-amber-600 transition-colors">Click for Deep Analysis</span>
                              <ArrowRight size={16} className="text-stone-300 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                          </div>
                      </div>
                  </div>
              ))}
          </div>
          {renderMelitzaDetail()}
      </div>
  );

  return (
    <div className="h-full flex flex-col items-center bg-[#fdfbf7] overflow-y-auto overflow-x-hidden p-4 md:p-8">
      
      {/* Vilna Header */}
      <div className="w-full max-w-[1600px] mb-8 flex items-end justify-between border-b border-stone-300 pb-4">
          <div className="text-left w-1/4 hidden md:block">
               <div className="font-bold text-stone-500 text-xs uppercase tracking-widest mb-1">
                   {section === 'STRUCTURE' ? 'Structural Analysis' : section === 'LOGIC' ? 'Logical Framework' : 'Practical Application'}
               </div>
               <div className="font-serif text-stone-800 italic text-sm">
                   {section === 'STRUCTURE' ? 'Massa U\'Matan' : section === 'LOGIC' ? 'Higayon (Ramchal)' : 'Melitza'}
               </div>
          </div>
          
          <div className="text-center flex-1">
               <h1 className="font-hebrew text-4xl md:text-5xl font-black text-stone-900 tracking-tight">
                  ביאור הסוגיא
               </h1>
          </div>

          <div className="flex flex-col items-end w-1/4 hidden md:flex">
               <button 
                  onClick={onGenerateAi}
                  className="flex items-center gap-2 text-stone-400 hover:text-indigo-600 transition-colors text-[10px] font-bold uppercase tracking-widest"
              >
                  <Sparkles size={12} /> Regenerate Data
              </button>
          </div>
      </div>

      {section === 'STRUCTURE' && renderStructurePage()}
      {section === 'LOGIC' && renderLogicPage()}
      {section === 'MELITZA' && renderMelitzaPage()}

    </div>
  );
};