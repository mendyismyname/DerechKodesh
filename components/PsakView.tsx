import React, { useState } from 'react';
import { PsakEntry, ShulchanAruchData } from '../types';
import { BookOpen, Languages } from 'lucide-react';

interface Props {
  chain: PsakEntry[]; // Kept for backward compatibility
  data?: ShulchanAruchData; 
}

import { MOCK_SUGYA } from '../constants';

export const PsakView: React.FC<Props> = ({ chain, data = MOCK_SUGYA.shulchanAruch }) => {
  const [activeComment, setActiveComment] = useState<string | null>(null);
  const [showTranslation, setShowTranslation] = useState(true);

  if (!data) return <div className="p-8 text-center text-slate-500">No Shulchan Aruch data available.</div>;

  return (
    <div className="h-full bg-[#fdfbf7] overflow-y-auto p-4 md:p-8 flex justify-center">
      
      {/* Vilna Page Container */}
      <div className="w-full max-w-[1400px] bg-white shadow-xl border border-stone-300 min-h-[1200px] relative p-8 md:p-12">
        
        {/* Paper Texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none"></div>

        {/* Shulchan Aruch Header */}
        <div className="flex justify-between items-end border-b-2 border-stone-800 border-double pb-4 mb-10 relative z-10">
            <div className="w-1/4 text-left">
                <div className="text-xl font-bold font-hebrew-serif text-stone-800">סימן {data.siman}</div>
                
                {/* Toggle Button */}
                <button 
                    onClick={() => setShowTranslation(!showTranslation)}
                    className={`mt-2 flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-wider border rounded transition-all ${showTranslation ? 'bg-stone-800 text-white border-stone-800' : 'bg-white text-stone-500 border-stone-300 hover:bg-stone-50'}`}
                >
                    <Languages size={12} />
                    English
                </button>
            </div>
            
            <div className="text-center w-1/2">
                <h1 className="text-5xl font-black font-hebrew-serif text-stone-900 tracking-tight">שולחן ערוך</h1>
                <div className="text-xl font-hebrew-serif font-bold text-stone-600 mt-2">חושן משפט</div>
            </div>
            
            <div className="text-xl font-bold font-hebrew-serif text-stone-800 w-1/4 text-right">סעיף {data.seif}</div>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full relative z-10">
            
            {/* Right Column: Mishna Brura / Commentaries */}
            <div className="md:col-span-3 text-right space-y-6" dir="rtl">
                <div className="border-b border-stone-300 pb-1 mb-2 text-center">
                    <span className="font-rashi font-bold text-lg text-stone-900">משנה ברורה</span>
                </div>
                <div className="text-justify font-rashi text-[13px] leading-[1.4] text-stone-800">
                    {data.mishnaBrura.map((mb) => (
                        <div key={mb.id} className="mb-4">
                            <span 
                                onClick={() => setActiveComment(activeComment === mb.id ? null : mb.id)}
                                className={`
                                    cursor-pointer hover:bg-stone-100 rounded px-1 transition-colors
                                    ${activeComment === mb.id ? 'bg-yellow-100 font-bold' : ''}
                                `}
                            >
                                <span className="font-bold">({mb.noteChar}) </span>
                                {mb.text}{" "}
                            </span>
                            
                            {/* Embedded Translation (Toggled) */}
                            {showTranslation && (
                                <div className="text-[11px] text-stone-500 font-sans border-r-2 border-stone-200 pr-2 mt-1 animate-in fade-in">
                                    {mb.translation}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Center Column: Mechaber & Rema */}
            <div className="md:col-span-6 border-x border-stone-300 px-8 md:px-12">
                <div className="text-justify font-hebrew-serif text-2xl leading-[1.6] text-stone-900 mb-8" dir="rtl">
                    {data.mainText.map((segment, idx) => {
                        const isRema = segment.type === 'REMA';
                        return (
                            <React.Fragment key={idx}>
                                <span 
                                    className={`
                                        ${isRema ? "font-rashi text-[0.85em] mx-1 inline-block" : "font-bold"}
                                        ${isRema ? "text-stone-700" : "text-stone-900"}
                                    `}
                                >
                                    {isRema && <span className="font-sans text-[0.7em] font-bold mr-1">(הגה: </span>}
                                    {segment.text}
                                    {isRema && <span className="font-sans text-[0.7em] font-bold ml-1">)</span>}
                                </span>
                                {" "}
                            </React.Fragment>
                        );
                    })}
                </div>

                {/* English Summary Block (Toggled) */}
                {showTranslation && (
                    <div className="bg-[#fcfaf5] p-6 rounded border border-stone-200 mb-8 animate-in fade-in slide-in-from-top-2">
                        <div className="flex items-center gap-2 mb-3 border-b border-stone-200 pb-2">
                             <BookOpen size={14} className="text-stone-400"/>
                             <h4 className="text-xs font-bold uppercase tracking-widest text-stone-500">Summary & Translation</h4>
                        </div>
                        <div className="space-y-4 font-serif text-stone-800 text-sm leading-relaxed">
                            {data.mainText.map((seg, i) => (
                                <p key={i}>
                                    <span className="font-bold text-[10px] uppercase text-stone-400 mr-2">{seg.type}</span>
                                    {seg.translation}
                                </p>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Visual Separator */}
                <div className="flex justify-center my-8 opacity-40">
                     <div className="w-24 h-px bg-stone-600"></div>
                     <div className="mx-3 text-stone-600 text-sm font-serif">♦</div>
                     <div className="w-24 h-px bg-stone-600"></div>
                </div>

                <div className="text-justify font-rashi text-sm leading-relaxed text-stone-700" dir="rtl">
                    <span className="font-bold text-base border-b border-stone-400 inline-block mb-1">באר היטב:</span>
                    <br/>
                    (א) <span className="font-bold">שניים.</span> עיין בסמ"ע ס"ק א דמיירי בבעלי דינים הבאים לבית דין. ועיין בש"ך שחולק על דבריו וסובר דאפילו תפסו מעצמם.
                </div>
            </div>

            {/* Left Column: Biur Halacha / Harav */}
            <div className="md:col-span-3 text-right space-y-6" dir="rtl">
                 <div className="border-b border-stone-300 pb-1 mb-2 text-center">
                    <span className="font-rashi font-bold text-lg text-stone-900">שולחן ערוך הרב</span>
                </div>
                 <div className="text-justify font-rashi text-[13px] leading-[1.4] text-stone-800">
                    {data.shulchanAruchHarav.map((sh) => (
                        <div 
                            key={sh.id}
                            onClick={() => setActiveComment(activeComment === sh.id ? null : sh.id)}
                            className={`
                                cursor-pointer hover:bg-stone-100 rounded p-1 transition-colors mb-4
                                ${activeComment === sh.id ? 'bg-purple-50 ring-1 ring-purple-100' : ''}
                            `}
                        >
                            <div className="font-bold text-stone-900 mb-1">♦ {sh.text}</div>
                            
                            {/* Embedded Translation (Toggled) */}
                            {showTranslation && (
                                <div className="text-[11px] text-stone-500 font-sans border-r-2 border-stone-200 pr-2 animate-in fade-in">
                                    {sh.translation}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

        </div>

      </div>
    </div>
  );
};