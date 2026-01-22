
import React from 'react';
import { BookOpen, Landmark, Hourglass, Crown, Video, FileText, ExternalLink } from 'lucide-react';

interface Props {
  onStart: () => void;
  title: string;
  subtitle: string;
  resources?: {
      videoUrl?: string;
      pdfUrl?: string;
  };
}

// Simple SVG Ornamental Corner
const CornerOrnament = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`w-16 h-16 md:w-24 md:h-24 absolute text-slate-900 opacity-20 ${className}`} fill="currentColor">
    <path d="M10,10 L40,10 C35,15 35,25 40,30 C30,30 25,35 25,45 L25,90 L15,90 L15,40 C15,25 25,15 40,15 L90,15 L90,5 L10,5 Z" />
    <path d="M5,5 L5,90 L10,90 L10,10 L90,10 L90,5 Z" />
    <circle cx="25" cy="25" r="3" />
    <path d="M35,35 Q45,45 55,35 T75,35" fill="none" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const ShearBlat: React.FC<Props> = ({ onStart, title, subtitle, resources }) => {
  return (
    <div className="h-full bg-[#e8e4da] flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden">
      
      {/* Container */}
      <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-12 gap-8 relative flex-1 items-center">
        
        {/* Left Column - Historical Context (Hidden on mobile) */}
        <div className="hidden lg:flex flex-col col-span-3 text-slate-800 opacity-60 hover:opacity-100 transition-opacity duration-500 self-center">
             <div className="mb-4 border-b border-slate-600 pb-2 flex items-center gap-2">
                 <Hourglass className="text-slate-700" size={18} />
                 <h3 className="font-serif font-bold text-slate-900 uppercase tracking-widest text-xs">Historical Context</h3>
             </div>
             
             <div className="prose prose-sm prose-slate font-serif text-justify leading-relaxed text-slate-900 text-xs">
                 <p className="mb-4">
                    <span className="font-bold">Kiddushin</span> is the last tractate of Seder Nashim. It deals with the acquisition of a wife (Betrothal) and related monetary laws.
                 </p>
                 <p>
                    The discussions in this sugya explore the boundaries of monetary acquisition and abstract value.
                 </p>
             </div>
        </div>

        {/* Center Column - Title Page (Lifted Card) */}
        <div className="col-span-1 lg:col-span-6 flex flex-col items-center justify-center relative z-10 w-full h-full max-h-[850px]">
             
             {/* The Card */}
             <div className="w-full max-w-lg mx-auto bg-[#fffefb] shadow-2xl border-[6px] border-double border-slate-900 px-8 py-12 md:px-12 md:py-16 text-center relative rounded-sm transform transition-transform duration-700 hover:scale-[1.01]">
                
                {/* Ornaments */}
                <CornerOrnament className="top-2 left-2" />
                <CornerOrnament className="top-2 right-2 transform rotate-90" />
                <CornerOrnament className="bottom-2 left-2 transform -rotate-90" />
                <CornerOrnament className="bottom-2 right-2 transform rotate-180" />

                {/* Top Header */}
                <div className="relative mb-6 md:mb-8">
                    <div className="font-hebrew text-lg md:text-xl text-slate-500 font-bold tracking-widest uppercase mb-2">תלמוד בבלי</div>
                    <div className="w-24 h-px bg-slate-300 mx-auto"></div>
                </div>
                
                {/* Main Titles */}
                <h1 className="font-hebrew text-6xl md:text-8xl font-bold text-slate-900 leading-[0.8] drop-shadow-sm mb-4 tracking-tighter">
                  מסכת
                </h1>
                <h1 className="font-hebrew text-5xl md:text-7xl font-bold text-slate-900 leading-[0.9] drop-shadow-sm mb-12 tracking-tight">
                  קידושין
                </h1>
                
                {/* Chapter Box */}
                <div className="border-y-4 border-slate-900 py-1 my-8 w-full max-w-sm mx-auto">
                    <div className="border-y border-slate-900 py-4 px-2 bg-slate-50">
                         <div className="font-hebrew text-3xl md:text-4xl text-slate-900 font-bold">
                            {title.split(':')[0]}
                         </div>
                    </div>
                </div>

                {/* Perek Indicator */}
                <div className="flex justify-center items-center gap-4 my-8 opacity-90">
                     <div className="h-px w-12 bg-slate-900"></div>
                     <Crown size={20} className="text-slate-900" />
                     <div className="font-hebrew text-2xl md:text-3xl font-bold text-slate-900">
                        פרק ראשון
                     </div>
                     <Crown size={20} className="text-slate-900" />
                     <div className="h-px w-12 bg-slate-900"></div>
                </div>

                <p className="font-serif text-lg md:text-xl italic text-slate-700 mb-8 font-light">
                    "{subtitle}"
                </p>

                {/* Action Button */}
                <div className="mt-4 relative z-20">
                    <button 
                        onClick={onStart}
                        className="
                            group relative inline-flex items-center gap-3 px-10 py-4 
                            bg-white text-slate-900 text-lg font-serif tracking-[0.2em] uppercase font-bold
                            border-2 border-slate-900
                            hover:bg-slate-900 hover:text-[#fdfbf7] transition-all duration-300
                            shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]
                            hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]
                        "
                    >
                        <BookOpen size={20} className="text-amber-700 group-hover:text-amber-400" />
                        <span>Begin Sugya</span>
                    </button>
                </div>

                {/* External Resources Links */}
                {resources && (resources.videoUrl || resources.pdfUrl) && (
                    <div className="mt-8 flex items-center justify-center gap-6 relative z-20">
                        {resources.videoUrl && (
                            <a 
                                href={resources.videoUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-indigo-600 transition-colors group"
                            >
                                <Video size={14} className="group-hover:scale-110 transition-transform" />
                                <span>Kol Halashon Video</span>
                                <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        )}
                        {resources.videoUrl && resources.pdfUrl && <div className="w-px h-4 bg-slate-300"></div>}
                        {resources.pdfUrl && (
                            <a 
                                href={resources.pdfUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-indigo-600 transition-colors group"
                            >
                                <FileText size={14} className="group-hover:scale-110 transition-transform" />
                                <span>Mekoros PDF</span>
                                <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        )}
                    </div>
                )}
                
                <div className="mt-8 text-[10px] text-slate-400 uppercase tracking-[0.3em] font-sans border-t border-slate-200 pt-4 w-1/2 mx-auto">
                    Vilna Edition • MySugya
                </div>
             </div>
        </div>

        {/* Right Column - Introduction/Analysis (Hidden on mobile) */}
        <div className="hidden lg:flex flex-col col-span-3 text-left opacity-60 hover:opacity-100 transition-opacity duration-500 self-center">
             <div className="mb-4 border-b border-slate-600 pb-2 flex items-center gap-2 justify-end md:justify-start">
                 <Landmark className="text-slate-700" size={18} />
                 <h3 className="font-serif font-bold text-slate-900 uppercase tracking-widest text-xs">Topic Intro</h3>
             </div>
             
             <div className="prose prose-sm prose-slate font-serif text-justify leading-relaxed text-slate-900 text-xs">
                 <p className="mb-4">
                    <span className="font-bold">The Case:</span> Can a woman be betrothed if she doesn't receive money, but instructs the man to give it to someone else?
                 </p>
                 <p>
                    <span className="font-bold">The Ruling:</span> The Gemara compares this to a Guarantor (Arev), creating a fascinating link between monetary law and marriage.
                 </p>
             </div>
        </div>

      </div>
    </div>
  );
};
