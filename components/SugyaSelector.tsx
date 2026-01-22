
import React, { useState } from 'react';
import { AVAILABLE_SUGYAS, SEDARIM, MESECHTOS, TURIM, SIMANIM_MOCK } from '../constants';
import { BookOpen, Scroll, ChevronRight, Crown, Scale, Book, ArrowLeft, ChevronDown, CheckCircle2, BrainCircuit, Lock, Sparkles, User } from 'lucide-react';

interface Props {
  onSelect: (sugyaId: string) => void;
}

type Mode = 'MISHNA' | 'HALACHA';

export const SugyaSelector: React.FC<Props> = ({ onSelect }) => {
  const [mode, setMode] = useState<Mode>('MISHNA');
  
  // Navigation State
  const [selectedSeder, setSelectedSeder] = useState<string | null>(null);
  const [selectedMesechta, setSelectedMesechta] = useState<string | null>(null);
  const [selectedTur, setSelectedTur] = useState<string | null>(null);
  const [selectedSiman, setSelectedSiman] = useState<any | null>(null);

  // Handlers
  const handleReset = () => {
      setSelectedSeder(null);
      setSelectedMesechta(null);
      setSelectedTur(null);
      setSelectedSiman(null);
  };

  const handleModeChange = (newMode: Mode) => {
      setMode(newMode);
      handleReset();
  };

  const getFilteredSugyas = () => {
      if (!selectedMesechta) return [];
      return AVAILABLE_SUGYAS.filter(s => s.masechta === selectedMesechta);
  };

  const getFeaturedSugyas = () => {
      return AVAILABLE_SUGYAS.filter(s => s.hasContent);
  }

  const renderBreadcrumbs = () => {
      return (
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6 bg-white px-4 py-2 rounded-full shadow-sm w-fit mx-auto animate-in fade-in slide-in-from-top-4">
             <button onClick={handleReset} className="hover:text-indigo-600 font-bold uppercase tracking-wider">{mode}</button>
             {selectedSeder && (
                 <>
                    <ChevronRight size={14} />
                    <button onClick={() => {setSelectedMesechta(null)}} className="hover:text-indigo-600 font-bold">{SEDARIM.find(s => s.id === selectedSeder)?.english}</button>
                 </>
             )}
             {selectedMesechta && (
                 <>
                    <ChevronRight size={14} />
                    <span className="font-bold text-slate-900">{selectedMesechta}</span>
                 </>
             )}
             {selectedTur && (
                 <>
                    <ChevronRight size={14} />
                    <button onClick={() => setSelectedSiman(null)} className="hover:text-indigo-600 font-bold">{TURIM.find(t => t.id === selectedTur)?.english}</button>
                 </>
             )}
             {selectedSiman && (
                 <>
                    <ChevronRight size={14} />
                    <span className="font-bold text-slate-900">{selectedSiman.label}</span>
                 </>
             )}
        </div>
      );
  }

  // --- MISHNA / GEMARA RENDERERS ---

  const renderFeatured = () => (
      <div className="mb-12 animate-in fade-in duration-500">
          <div className="text-center mb-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
                  <Sparkles size={14} className="text-amber-500" />
                  Quick Access: Full Sugyas
              </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {getFeaturedSugyas().map(s => (
                  <div 
                    key={`featured-${s.id}`}
                    onClick={() => onSelect(s.id)}
                    className="bg-white rounded-xl border border-indigo-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group overflow-hidden ring-1 ring-indigo-50"
                  >
                        <div className={`h-1.5 w-full ${s.color}`}></div>
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-[10px] font-bold uppercase text-indigo-600 tracking-widest bg-indigo-50 px-2 py-0.5 rounded-full">{s.masechta} {s.daf}</span>
                                <Scroll size={16} className="text-indigo-200 group-hover:text-indigo-500" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-1 font-hebrew">{s.title}</h3>
                            <p className="text-xs text-slate-500 line-clamp-2">{s.description}</p>
                        </div>
                  </div>
              ))}
          </div>
      </div>
  );

  const renderSedarim = () => (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SEDARIM.map(seder => (
              <div 
                  key={seder.id}
                  onClick={() => setSelectedSeder(seder.id)}
                  className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg cursor-pointer transition-all hover:-translate-y-1 group relative overflow-hidden"
              >
                  <div className="absolute top-0 left-0 w-2 h-full bg-slate-200 group-hover:bg-indigo-600 transition-colors"></div>
                  <div className="flex justify-between items-start mb-4 pl-4">
                      <div className="font-hebrew text-3xl font-bold text-slate-800">{seder.hebrew}</div>
                      <BookOpen className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                  </div>
                  <div className="pl-4">
                    <h3 className="text-xl font-bold text-slate-900">{seder.english}</h3>
                    <p className="text-slate-500 text-sm mt-1">{seder.description}</p>
                  </div>
              </div>
          ))}
      </div>
  );

  const renderMesechtos = () => {
      const list = MESECHTOS[selectedSeder!] || [];
      return (
          <div className="animate-in slide-in-from-right-4 fade-in duration-300">
              <button onClick={() => setSelectedSeder(null)} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors text-sm font-bold uppercase tracking-wider">
                  <ArrowLeft size={16} /> Back to Sedarim
              </button>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Select Mesechta</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {list.map(m => (
                      <div 
                          key={m}
                          onClick={() => setSelectedMesechta(m)}
                          className="bg-white p-4 rounded-lg border border-slate-200 hover:border-indigo-500 hover:shadow-md cursor-pointer transition-all text-center"
                      >
                          <div className="font-bold text-lg text-slate-800">{m}</div>
                      </div>
                  ))}
                  {list.length === 0 && (
                      <div className="col-span-full text-center text-slate-400 py-10 italic">No Mesechtos available in this mock version.</div>
                  )}
              </div>
          </div>
      );
  };

  const renderSugyas = () => {
      const sugyas = getFilteredSugyas();
      return (
          <div className="animate-in slide-in-from-right-4 fade-in duration-300">
              <button onClick={() => setSelectedMesechta(null)} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors text-sm font-bold uppercase tracking-wider">
                  <ArrowLeft size={16} /> Back to Mesechtos
              </button>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Available Sugyas in {selectedMesechta}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sugyas.map(s => (
                      <div 
                        key={s.id}
                        onClick={s.hasContent ? () => onSelect(s.id) : undefined}
                        className={`
                            rounded-xl border shadow-sm transition-all group overflow-hidden relative
                            ${s.hasContent 
                                ? 'bg-white border-slate-200 hover:shadow-xl hover:-translate-y-1 cursor-pointer' 
                                : 'bg-slate-50 border-slate-100 cursor-not-allowed opacity-70 grayscale'}
                        `}
                      >
                          <div className={`h-2 w-full ${s.hasContent ? s.color : 'bg-slate-300'}`}></div>
                          <div className="p-6">
                              <div className="flex justify-between items-start mb-2">
                                  <span className="text-xs font-bold uppercase text-slate-400 tracking-widest">{s.daf}</span>
                                  {s.hasContent ? <Scroll size={18} className="text-slate-300 group-hover:text-indigo-500" /> : <Lock size={18} className="text-slate-300" />}
                              </div>
                              <h3 className="text-xl font-bold text-slate-800 mb-2 font-hebrew">{s.title}</h3>
                              <p className="text-sm text-slate-600">{s.description}</p>
                              
                              {s.hasContent ? (
                                <div className="mt-4 flex items-center text-xs font-bold uppercase text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Start Learning <ChevronRight size={14} className="ml-1" />
                                </div>
                              ) : (
                                <div className="mt-4 text-xs font-bold uppercase text-slate-400">
                                    Coming Soon
                                </div>
                              )}
                          </div>
                      </div>
                  ))}
                  {sugyas.length === 0 && (
                       <div className="col-span-full text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                           <BookOpen size={48} className="text-slate-300 mx-auto mb-4" />
                           <p className="text-slate-500 font-bold">No Sugyas currently available for this Mesechta.</p>
                           <p className="text-slate-400 text-sm mt-1">Try Bava Metzia (2a) for a full demo.</p>
                       </div>
                  )}
              </div>
          </div>
      );
  };

  // --- HALACHA / SHULCHAN ARUCH RENDERERS ---

  const renderTurim = () => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {TURIM.map(tur => (
              <div 
                  key={tur.id}
                  onClick={() => setSelectedTur(tur.id)}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg cursor-pointer transition-all hover:-translate-y-1 group relative overflow-hidden flex"
              >
                  <div className={`w-3 ${tur.color}`}></div>
                  <div className="p-6 flex-1">
                      <div className="flex justify-between items-start mb-3">
                          <div className="font-hebrew text-2xl font-bold text-slate-800">{tur.hebrew}</div>
                          <Scale className="text-slate-300 group-hover:text-slate-600 transition-colors" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">{tur.english}</h3>
                      <p className="text-slate-500 text-sm mt-2">{tur.description}</p>
                  </div>
              </div>
          ))}
      </div>
  );

  const renderSimanim = () => {
      const list = SIMANIM_MOCK[selectedTur!] || [];
      const currentTur = TURIM.find(t => t.id === selectedTur);

      return (
          <div className="animate-in slide-in-from-right-4 fade-in duration-300 max-w-3xl mx-auto">
               <button onClick={() => setSelectedTur(null)} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors text-sm font-bold uppercase tracking-wider">
                  <ArrowLeft size={16} /> Back to Arba Turim
              </button>
              
              <div className={`p-6 rounded-xl text-white mb-8 ${currentTur?.color || 'bg-slate-800'}`}>
                   <h2 className="text-2xl font-bold font-hebrew">{currentTur?.hebrew}</h2>
                   <p className="opacity-80">{currentTur?.english}</p>
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-4 uppercase tracking-wider text-xs">Select Siman (Chapter)</h3>
              <div className="grid grid-cols-1 gap-4">
                  {list.map(siman => (
                      <div 
                          key={siman.id}
                          onClick={() => setSelectedSiman(siman)}
                          className="bg-white p-5 rounded-lg border border-slate-200 hover:border-indigo-500 hover:shadow-md cursor-pointer transition-all flex justify-between items-center group"
                      >
                          <div>
                              <div className="font-bold text-lg text-slate-900">{siman.label}</div>
                              <div className="text-slate-500 text-sm">{siman.desc}</div>
                          </div>
                          <ChevronRight className="text-slate-300 group-hover:text-indigo-500" />
                      </div>
                  ))}
                  {list.length === 0 && (
                      <div className="text-center py-10 text-slate-400 bg-white rounded-lg border border-dashed">
                          No Simanim mocked for this section yet. Try Choshen Mishpat.
                      </div>
                  )}
              </div>
          </div>
      );
  };

  const renderHalachaView = () => {
      if (!selectedSiman) return null;
      
      return (
          <div className="animate-in slide-in-from-right-4 fade-in duration-300 max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
               {/* Toolbar */}
               <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">
                   <button onClick={() => setSelectedSiman(null)} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors text-xs font-bold uppercase tracking-wider">
                      <ArrowLeft size={14} /> Back to Simanim
                   </button>
                   <div className="font-bold text-slate-800">{selectedSiman.label} - Halacha View</div>
                   <div className="w-20"></div> {/* Spacer */}
               </div>

               <div className="p-8">
                   {/* Shulchan Aruch Text Mock */}
                   <div className="mb-8 text-center">
                       <h2 className="font-hebrew text-3xl font-bold text-slate-900 mb-4">שולחן ערוך</h2>
                       <div className="font-hebrew text-xl leading-loose text-justify text-slate-800" dir="rtl">
                           שניים אוחזין בטלית, זה אומר אני מצאתיה וזה אומר אני מצאתיה... יחלוקו.
                           <br/>
                           <span className="text-sm text-slate-500 block mt-2">(Simulated text blend of Mechaber and Rema)</span>
                       </div>
                   </div>

                   {/* Mishna Brura / Harav Note */}
                   <div className="flex gap-4 mb-8">
                       <div className="flex-1 bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm">
                           <div className="font-bold text-slate-700 mb-1">Mishna Brura</div>
                           <p className="text-slate-600">Explains that the oath is required because...</p>
                       </div>
                       <div className="flex-1 bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm">
                           <div className="font-bold text-slate-700 mb-1">Shulchan Aruch HaRav</div>
                           <p className="text-slate-600">Clarifies the specific nature of the grasp required.</p>
                       </div>
                   </div>

                   {/* Action to Analyze Sugya */}
                   <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-center">
                       <h3 className="text-xl font-bold text-indigo-900 mb-2">Understand the Source</h3>
                       <p className="text-indigo-700 mb-6">Dive deep into the Talmudic Sugya that forms the basis of this ruling.</p>
                       
                       {selectedSiman.linkedSugyaId ? (
                           <button 
                                onClick={() => onSelect(selectedSiman.linkedSugyaId!)}
                                className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-full font-bold shadow-lg hover:bg-indigo-700 hover:scale-105 transition-all"
                           >
                               <BrainCircuit size={20} />
                               Analyze Source Sugya
                           </button>
                       ) : (
                           <button disabled className="inline-flex items-center gap-2 px-8 py-3 bg-slate-300 text-slate-500 rounded-full font-bold cursor-not-allowed">
                               Source Not Linked
                           </button>
                       )}
                   </div>
               </div>
          </div>
      );
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col py-8 px-4 relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>

        <div className="max-w-6xl w-full mx-auto relative z-10 flex-1 flex flex-col">
            {/* Header */}
            <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="h-px w-12 bg-slate-300"></div>
                    <Crown className="text-amber-600" size={24} />
                    <div className="h-px w-12 bg-slate-300"></div>
                </div>
                <h1 className="text-4xl md:text-5xl font-hebrew font-bold text-slate-900 tracking-tight mb-2">
                    בית המדרש
                </h1>
                <p className="text-slate-500 font-serif italic mb-6">
                    Select a path to begin your analysis
                </p>
                
                {/* Credits to R Dovid Sackton */}
                <div className="flex items-center justify-center gap-3 bg-white/50 backdrop-blur-sm border border-stone-200 py-2 px-6 rounded-full w-fit mx-auto shadow-sm">
                    <User size={16} className="text-stone-400" />
                    <span className="text-xs text-stone-600 font-bold uppercase tracking-widest">
                        Based on Shiurim of <a href="https://www2.kolhalashon.com/en/regularSite/ravs/977995" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">R Dovid Sackton</a>
                    </span>
                    <span className="text-[10px] text-stone-400 font-serif italic">Mount Zion, Jerusalem</span>
                </div>
            </div>

            {/* Mode Switcher */}
            {(!selectedSeder && !selectedTur) && (
                <div className="flex justify-center mb-12">
                    <div className="bg-white p-1 rounded-full shadow-sm border border-slate-200 flex">
                        <button 
                            onClick={() => handleModeChange('MISHNA')}
                            className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-sm transition-all ${mode === 'MISHNA' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                            <BookOpen size={16} />
                            Lomdus (Mishna/Gemara)
                        </button>
                        <button 
                            onClick={() => handleModeChange('HALACHA')}
                            className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-sm transition-all ${mode === 'HALACHA' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                            <Scale size={16} />
                            Halacha (Shulchan Aruch)
                        </button>
                    </div>
                </div>
            )}

            {/* Breadcrumbs */}
            {(selectedSeder || selectedTur) && renderBreadcrumbs()}

            {/* Content Container */}
            <div className="flex-1">
                {mode === 'MISHNA' && (
                    <>
                        {/* Quick Access Section (Only visible on main menu) */}
                        {!selectedSeder && !selectedMesechta && renderFeatured()}
                        
                        {!selectedSeder && renderSedarim()}
                        {selectedSeder && !selectedMesechta && renderMesechtos()}
                        {selectedMesechta && renderSugyas()}
                    </>
                )}

                {mode === 'HALACHA' && (
                    <>
                        {!selectedTur && renderTurim()}
                        {selectedTur && !selectedSiman && renderSimanim()}
                        {selectedSiman && renderHalachaView()}
                    </>
                )}
            </div>
            
            <div className="mt-20 text-center flex flex-col gap-2">
                <a 
                    href="https://x.com/mendysel" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] text-slate-400 hover:text-indigo-600 font-bold uppercase tracking-widest transition-colors"
                >
                    Created by Mendy S
                </a>
                <div className="text-slate-300 text-[9px] uppercase tracking-widest">
                    MySugya Platform • v1.4
                </div>
            </div>
        </div>
    </div>
  );
};
