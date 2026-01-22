
import React, { useState } from 'react';
import { Perspective, LogicNode } from '../types';
import { Languages, BookOpen, Quote, ChevronLeft, ChevronRight, MessageSquare, PlayCircle } from 'lucide-react';

interface Props {
  perspective: Perspective;
  sourceText: LogicNode;
  category: 'RISHONIM' | 'ACHRONIM';
  onNavigate: (direction: 'next' | 'prev') => void;
  onPlayTimestamp?: (seconds: number) => void;
}

export const ScholarDepthView: React.FC<Props> = ({ perspective, category, onNavigate, onPlayTimestamp }) => {
  const [showEnglish, setShowEnglish] = useState(false);

  if (!perspective) {
      return (
          <div className="h-full flex flex-col items-center justify-center bg-[#fdfbf7] text-stone-500">
              <div className="animate-pulse">Select a scholar from the sidebar</div>
          </div>
      );
  }

  return (
    <div className="h-full flex flex-col items-center bg-[#fdfbf7] overflow-y-auto overflow-x-hidden p-4 md:p-8">
      
      {/* Navigation Buttons (Absolute) */}
      <button 
        onClick={() => onNavigate('prev')}
        className="fixed left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 border border-stone-200 shadow-md rounded-full text-stone-500 hover:text-stone-900 hover:bg-white transition-all z-20 print:hidden hidden md:block"
        title="Previous Perspective"
      >
          <ChevronLeft size={24} />
      </button>
      <button 
        onClick={() => onNavigate('next')}
        className="fixed right-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 border border-stone-200 shadow-md rounded-full text-stone-500 hover:text-stone-900 hover:bg-white transition-all z-20 print:hidden hidden md:block"
        title="Next Perspective"
      >
          <ChevronRight size={24} />
      </button>

      {/* Vilna Page Container */}
      <div className="w-full max-w-4xl bg-white shadow-2xl border border-stone-200 relative min-h-[1000px]">
        
        {/* Paper Texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none"></div>

        {/* Header - Tzuras Hadaf Style */}
        <div className="pt-8 pb-4 px-12 border-b-2 border-stone-800 border-double mx-8 flex items-end justify-between relative z-10">
            {/* Right: Category/Siman */}
            <div className="w-1/4 text-right">
                 <div className="font-hebrew-serif text-lg font-bold text-stone-900">
                    {category === 'RISHONIM' ? 'חידושי ראשונים' : 'אוצר אחרונים'}
                 </div>
                 <div className="font-hebrew-serif text-sm text-stone-600 mt-1">קידושין ו׳:</div>
            </div>

            {/* Center: Scholar Name */}
            <div className="w-1/2 text-center">
                 <div className="font-hebrew-serif text-4xl md:text-5xl font-black text-stone-900 leading-[0.8] tracking-tight">
                    {perspective.scholarNameHebrew || perspective.scholarName}
                 </div>
            </div>

            {/* Left: Tools */}
            <div className="w-1/4 text-left flex justify-end items-center gap-3">
                 {perspective.timestamp !== undefined && onPlayTimestamp && (
                    <button 
                        onClick={() => onPlayTimestamp(perspective.timestamp!)}
                        className="flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-wider border border-indigo-200 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded transition-all"
                    >
                        <PlayCircle size={14} />
                        Shiur
                    </button>
                 )}
                 <button 
                    onClick={() => setShowEnglish(!showEnglish)}
                    className={`flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-wider border rounded transition-all ${showEnglish ? 'bg-stone-800 text-white border-stone-800' : 'bg-white text-stone-500 border-stone-300 hover:bg-stone-50'}`}
                 >
                    <Languages size={14} />
                    English
                 </button>
            </div>
        </div>

        {/* Main Content Area - Grid Layout */}
        <div className="p-8 md:p-12 relative z-10">
            
            {/* Main Hebrew Text Block */}
            <div className="mb-8" dir="rtl">
                <div className="text-justify font-hebrew-serif text-2xl leading-[1.6] text-stone-900">
                     {/* Split logic to bold the Dh (Dibbur Hamatchil) */}
                     {perspective.rootNode.hebrewText.split(' ').map((word, i) => {
                         // Simple heuristic: Bold first 3 words
                         return <span key={i} className={i < 3 ? "font-black" : ""}>{word} </span>
                     })}
                </div>
            </div>

            {/* Inline English Translation (Toggled) */}
            {showEnglish && (
                <div className="mb-10 bg-stone-50 p-6 border-l-4 border-stone-300 animate-in fade-in slide-in-from-top-2 duration-300">
                    <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">
                        <BookOpen size={14} /> Translation
                    </h4>
                    <p className="font-serif text-stone-800 text-lg leading-relaxed">
                        {perspective.rootNode.englishText}
                    </p>
                </div>
            )}

            {/* Separator */}
            <div className="flex justify-center mb-10 opacity-30">
                <div className="w-16 h-px bg-stone-800"></div>
                <div className="mx-4 text-stone-800">♦</div>
                <div className="w-16 h-px bg-stone-800"></div>
            </div>

            {/* Analysis Columns (Biurim) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8" dir="rtl">
                
                {/* Right Column: Explanation */}
                <div>
                     <div className="font-hebrew-serif font-bold text-lg text-stone-900 border-b border-stone-300 pb-2 mb-4">
                        ביאור העניין
                     </div>
                     <div className="space-y-4">
                        <div>
                            <span className="font-bold text-sm text-stone-500 block mb-1">נושא (Topic):</span>
                            <p className="font-serif text-stone-800 text-sm leading-relaxed">{perspective.analysis?.focus}</p>
                        </div>
                        <div className="bg-[#fcfaf5] p-3 rounded border border-stone-100">
                            <span className="font-bold text-sm text-stone-500 block mb-1">חידוש (Novel Idea):</span>
                            <p className="font-serif text-stone-900 font-medium text-sm leading-relaxed">{perspective.analysis?.chiddush}</p>
                        </div>
                     </div>
                </div>

                {/* Left Column: Logic/Reasoning (Notes) */}
                <div>
                     <div className="font-hebrew-serif font-bold text-lg text-stone-900 border-b border-stone-300 pb-2 mb-4">
                        הערות וסברות
                     </div>
                     <div className="space-y-4">
                        <div className="relative pl-6 md:pl-0 md:pr-6">
                            <Quote className="absolute top-0 right-0 text-stone-200 transform scale-x-[-1]" size={32} />
                            <p className="font-serif text-stone-800 text-sm leading-relaxed italic relative z-10">
                                "{perspective.analysis?.reasoning}"
                            </p>
                        </div>
                        
                        {/* Discussion/Notes */}
                        {perspective.analysis?.dispute && (
                            <div className="mt-4 pt-4 border-t border-stone-200 border-dashed">
                                <span className="font-bold text-xs text-stone-400 block mb-1 uppercase tracking-widest flex items-center gap-1">
                                    <MessageSquare size={12} /> Discussion
                                </span>
                                <p className="font-serif text-stone-600 text-xs leading-relaxed">{perspective.analysis.dispute}</p>
                            </div>
                        )}
                        
                        {/* Additional Notes if present on rootNode */}
                        {perspective.rootNode.notes && (
                            <div className="mt-4 bg-stone-50 p-3 rounded border border-stone-100">
                                <span className="font-bold text-xs text-stone-400 block mb-1 uppercase tracking-widest">Additional Notes</span>
                                <p className="font-serif text-stone-600 text-xs leading-relaxed">{perspective.rootNode.notes}</p>
                            </div>
                        )}
                     </div>
                </div>

            </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-4 left-0 right-0 text-center">
             <div className="text-[10px] text-stone-400 font-hebrew-serif">מהדורת סוגיא דיפ • {perspective.scholarName}</div>
        </div>

      </div>
    </div>
  );
};
