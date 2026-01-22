
import React, { useState } from 'react';
import { LogicNode, SugyaSection } from '../types';
import { BookOpen, Scroll, Book, ArrowUp, ArrowDown } from 'lucide-react';

interface Props {
  sugya: SugyaSection;
  activeSource: 'CHUMASH' | 'MISHNA' | 'GEMARA';
  onAnalyze: (node: LogicNode) => void;
  onSwitchSugya: (id: string) => void;
  availableSugyas: {id: string, title: string, masechta: string, masechtaHebrew?: string, daf: string}[];
}

export const TzurasHadaf: React.FC<Props> = ({ sugya, activeSource, onAnalyze, onSwitchSugya, availableSugyas }) => {
  const [showEnglish, setShowEnglish] = useState(false);
  const [sugyaDropdownOpen, setSugyaDropdownOpen] = useState(false);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  // Helper to extract or parse comment segments
  const getCommentarySegments = (scholar: string) => {
    const root = sugya.perspectives.find(p => p.scholarName.includes(scholar))?.rootNode;
    if (!root) return [];
    
    // If structured children exist, use them
    if (root.children && root.children.length > 0) {
        return root.children.map(child => ({
            id: child.id,
            dh: child.hebrewText.split('-')[0] || child.hebrewText.split('.')[0] || '',
            body: child.hebrewText, // Assuming full text is here
            english: child.englishText,
            sourceNode: child
        }));
    }

    // Fallback: Parse the flat text
    const segments = root.hebrewText.split('.').filter(s => s.trim().length > 5);
    return segments.map((s, idx) => {
        const parts = s.split('-');
        const dh = parts[0]?.trim();
        const body = parts.slice(1).join('-').trim() || parts[0]?.trim();
        
        return {
            id: `${root.id}-seg-${idx}`,
            dh: dh,
            body: s.includes('-') ? body : '', 
            english: root.englishText,
            sourceNode: { ...root, id: `${root.id}-seg-${idx}`, hebrewText: s.trim() }
        };
    });
  };

  const rashiSegments = getCommentarySegments('Rashi');
  const tosfosSegments = getCommentarySegments('Tosfos');

  const handleInteraction = (node: LogicNode) => {
      setHighlightedId(node.id);
      onAnalyze(node);
  };

  const isRelated = (id: string) => {
      return highlightedId === id;
  };

  // Header Logic
  let titleDisplay = '';
  let subTitleDisplay = '';
  let headerLeftContent: React.ReactNode = null;

  if (activeSource === 'CHUMASH') {
      titleDisplay = 'מקראות גדולות';
      subTitleDisplay = 'חומש דברים';
      // Custom display for Chumash: Posuk, Page, Chapter, Yom
      // Mocking specific data for the "Kiddushin 6b" sugya context (Devarim 24:1)
      headerLeftContent = (
          <div className="flex flex-col items-end">
              <div className="font-hebrew-serif font-bold text-stone-900 text-right">
                  <span className="text-xl">פרק כ"ד : פסוק א'</span>
              </div>
              <div className="font-hebrew-serif text-sm text-stone-600 mt-1 flex gap-3">
                  <span>יום שני</span>
                  <span>|</span>
                  <span>עמוד קכ"ד</span>
              </div>
          </div>
      );
  } else if (activeSource === 'MISHNA') {
      titleDisplay = 'משניות'; 
      subTitleDisplay = 'סדר נשים';
      // Mishna Style: Perek:Mishna (e.g. א:א)
      headerLeftContent = (
          <div className="font-hebrew-serif text-3xl font-bold text-stone-900 mb-2">
              א : א
          </div>
      );
  } else {
      // Gemara
      const found = availableSugyas.find(s => s.id === sugya.id);
      titleDisplay = (found as any)?.masechtaHebrew || sugya.sourceRef.split(' ')[0] || 'קידושין'; 
      subTitleDisplay = 'עין משפט נר מצוה';
      // Gemara Style: Hebrew Daf (e.g. ו: - ז.)
      // Transforming "6b-7a" to hebrew approximation
      headerLeftContent = (
          <div className="font-hebrew-serif text-3xl font-bold text-stone-900 mb-2" dir="rtl">
              ו: - ז.
          </div>
      );
  }


  // --- RENDERERS ---

  const renderHeader = () => (
    <div className="pt-6 pb-2 px-12 border-b-2 border-stone-800 border-double mx-8 flex items-end justify-between relative z-10">
        {/* Right: Perek/Parsha */}
        <div className="w-1/4 text-right">
             <div className="font-hebrew-serif text-xl font-bold text-stone-900">
                {activeSource === 'CHUMASH' ? 'פרשת כי תצא' : 'פרק ראשון'}
             </div>
             <div className="font-hebrew-serif text-sm text-stone-600 mt-1">
                {subTitleDisplay}
             </div>
        </div>

        {/* Center: Title */}
        <div className="w-1/2 text-center">
             <div 
                className="font-hebrew-serif text-5xl md:text-6xl font-black text-stone-900 leading-[0.9] tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
                onClick={(e) => { e.stopPropagation(); setSugyaDropdownOpen(!sugyaDropdownOpen); }}
             >
                {titleDisplay}
             </div>
             
             {/* Sugya Selector Dropdown */}
             {sugyaDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 bg-white border border-stone-200 shadow-xl rounded-sm py-2 z-50 text-left">
                    {availableSugyas.map(s => (
                        <button
                            key={s.id}
                            onClick={() => { onSwitchSugya(s.id); setSugyaDropdownOpen(false); }}
                            className={`w-full text-left px-4 py-3 text-sm font-bold border-b border-stone-100 last:border-0 hover:bg-stone-50 transition-colors ${s.id === sugya.id ? 'text-indigo-700 bg-indigo-50/50' : 'text-stone-700'}`}
                        >
                            <span className="block font-hebrew text-lg mb-0.5">{s.title}</span>
                            <span className="text-xs text-stone-400 uppercase tracking-wide">{s.masechta} {s.daf}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>

        {/* Left: Daf/Source + Toggle */}
        <div className="w-1/4 text-left flex flex-col items-end">
             {headerLeftContent}
             
             {/* English Toggle Consistent Placement */}
             <button 
                onClick={() => setShowEnglish(!showEnglish)}
                className={`mt-2 flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-wider border rounded transition-all ${showEnglish ? 'bg-stone-800 text-white border-stone-800' : 'bg-white text-stone-500 border-stone-300 hover:bg-stone-50'}`}
             >
                <BookOpen size={14} />
                English
             </button>
        </div>
    </div>
  );

  const renderChumashContent = () => {
      if (!sugya.chumashText) return <div className="p-10 text-center">No Chumash text available.</div>;
      
      return (
        <div className="grid grid-cols-12 gap-8 relative min-h-[900px] p-8">
            
            {/* Right: Rashi (Wider, no Ramban column) */}
            <div className="col-span-12 md:col-span-4 border-l border-stone-300 pl-6 text-right" dir="rtl">
                <div className="text-center mb-6 border-b border-stone-300 pb-2">
                    <span className="font-rashi font-bold text-xl text-stone-900">רש"י</span>
                </div>
                <div className="text-justify font-rashi text-base leading-relaxed text-stone-800 space-y-6">
                    {sugya.chumashText.rashi.map((r) => (
                        <div key={r.id}>
                            <div className="text-stone-900">
                                <span className="font-bold">{r.text.split('-')[0]} - </span>
                                {r.text.split('-')[1]}
                            </div>
                            {showEnglish && r.translation && (
                                <div className="mt-2 text-sm font-serif text-stone-600 border-r-2 border-stone-300 pr-2">
                                    {r.translation}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Center: Posuk & Targum (Takes up rest of space) */}
            <div className="col-span-12 md:col-span-8 flex flex-col items-center pt-8">
                 {/* Main Hebrew Text */}
                 <div className="text-center mb-8 w-full">
                     <div className="font-hebrew-serif text-5xl leading-[1.6] font-bold text-stone-900 mb-6" dir="rtl">
                         {sugya.chumashText.text}
                     </div>
                     {showEnglish && (
                         <div className="font-serif text-stone-700 text-xl italic text-center max-w-3xl mx-auto border-t border-stone-200 pt-4">
                             {sugya.chumashText.translation}
                         </div>
                     )}
                 </div>
                 
                 {/* Targum Onkelos */}
                 <div className="mt-12 pt-8 border-t-2 border-double border-stone-300 w-full">
                     <div className="text-center mb-6">
                        <span className="font-hebrew-serif font-bold text-stone-500 text-base uppercase tracking-[0.2em]">תרגום אונקלוס</span>
                     </div>
                     <div className="font-hebrew-serif text-2xl leading-[1.6] text-stone-800 text-center mb-4" dir="rtl">
                         {sugya.chumashText.targum}
                     </div>
                     {showEnglish && sugya.chumashText.targumTranslation && (
                         <div className="font-serif text-stone-600 text-base italic text-center max-w-3xl mx-auto">
                             {sugya.chumashText.targumTranslation}
                         </div>
                     )}
                 </div>
            </div>

        </div>
      );
  };

  const renderMishnaContent = () => (
      <div className="grid grid-cols-12 gap-6 p-8 min-h-[900px]">
          
          {/* Right Column: Bartenura */}
          <div className="col-span-12 md:col-span-3 border-l border-stone-300 pl-4 text-right" dir="rtl">
              <div className="text-center mb-4 border-b border-stone-300 pb-2">
                  <span className="font-rashi font-bold text-lg text-stone-900">ר' עובדיה מברטנורא</span>
              </div>
              <div className="space-y-6">
                  {sugya.mishnaContext?.bartenura?.map(comment => (
                      <div key={comment.id} className="text-justify font-rashi text-sm leading-relaxed">
                          <div className="text-stone-900">{comment.hebrewText}</div>
                          {showEnglish && (
                              <div className="mt-2 text-stone-600 font-serif text-xs border-r-2 border-stone-300 pr-2">
                                  {comment.englishText}
                              </div>
                          )}
                      </div>
                  ))}
                  {!sugya.mishnaContext?.bartenura && (
                      <div className="text-center text-stone-400 italic">No Bartenura text available.</div>
                  )}
              </div>
          </div>

          {/* Center: Mishna Sequence */}
          <div className="col-span-12 md:col-span-9 flex flex-col items-center max-w-4xl mx-auto">
              {/* Previous Mishna */}
              {sugya.mishnaContext?.previous && (
                  <div className="w-full text-center opacity-50 hover:opacity-100 transition-opacity mb-8 cursor-pointer">
                      <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase text-stone-400 mb-2">
                          <ArrowUp size={12} /> Previous Mishna ({sugya.mishnaContext.previous.ref})
                      </div>
                      <div className="font-hebrew-serif text-xl text-stone-600 line-clamp-2" dir="rtl">
                          {sugya.mishnaContext.previous.hebrew}
                      </div>
                      {showEnglish && (
                          <div className="font-serif text-xs text-stone-500 mt-1">{sugya.mishnaContext.previous.english}</div>
                      )}
                  </div>
              )}

              {/* Current Mishna */}
              <div className="w-full bg-white shadow-sm border border-stone-200 p-8 rounded-sm mb-8">
                  <div className="text-center mb-6">
                      <span className="font-hebrew-serif text-3xl font-bold text-stone-900 border-b-2 border-stone-900 pb-1 px-8 inline-block tracking-[0.3em]">משנה</span>
                  </div>
                  <div 
                      className="text-justify font-hebrew-serif text-4xl leading-[1.8] text-stone-900 mb-6"
                      dir="rtl"
                      onClick={() => handleInteraction(sugya.baseText)}
                  >
                      {sugya.baseText.hebrewText}
                  </div>
                  {showEnglish && (
                      <div className="font-serif text-stone-800 text-xl leading-relaxed border-t border-stone-100 pt-4 mt-4">
                          {sugya.baseText.englishText}
                      </div>
                  )}
              </div>

              {/* Next Mishna */}
              {sugya.mishnaContext?.next && (
                  <div className="w-full text-center opacity-50 hover:opacity-100 transition-opacity mt-8 cursor-pointer">
                      <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase text-stone-400 mb-2">
                          <ArrowDown size={12} /> Next Mishna ({sugya.mishnaContext.next.ref})
                      </div>
                      <div className="font-hebrew-serif text-xl text-stone-600 line-clamp-2" dir="rtl">
                          {sugya.mishnaContext.next.hebrew}
                      </div>
                      {showEnglish && (
                          <div className="font-serif text-xs text-stone-500 mt-1">{sugya.mishnaContext.next.english}</div>
                      )}
                  </div>
              )}
          </div>
      </div>
  );

  const renderGemaraContent = () => (
    <div className="grid grid-cols-12 gap-0 relative min-h-[900px]">
        
        {/* Right Column: Rashi (Wider: 3 cols) */}
        <div className="col-span-12 md:col-span-3 md:col-start-1 md:col-end-4 border-l border-stone-300 py-6 px-3 bg-[#fdfbf7]/30 flex flex-col">
            <div className="text-center mb-4">
                <span className="font-rashi font-bold text-lg text-stone-900 border-b border-stone-400 pb-1 inline-block">רש"י</span>
            </div>
            <div className="text-justify font-rashi text-[13px] leading-[1.3] text-stone-800 space-y-3 flex-1" dir="rtl">
                {rashiSegments.map((seg, idx) => (
                    <div 
                        key={seg.id}
                        className={`
                            cursor-pointer rounded-sm transition-colors block mb-2 p-1
                            ${isRelated(seg.id) ? 'bg-yellow-100/80 text-black' : 'hover:bg-stone-200/50'}
                        `}
                        onClick={() => handleInteraction(seg.sourceNode)}
                    >
                        <div>
                            <span className="font-bold">{seg.dh}. </span>
                            {seg.body}
                        </div>
                        {/* Inline Rashi Translation */}
                        {showEnglish && seg.english && (
                            <div className="mt-1 text-[11px] font-serif text-stone-600 border-r-2 border-stone-400 pr-2 bg-white/50 p-1 rounded">
                                {seg.english}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>

        {/* Center Column: Gemara (Narrower: 6 cols) */}
        <div className="col-span-12 md:col-span-6 md:col-start-4 md:col-end-10 py-10 px-6 relative">
            
            {/* Mishna Header */}
            <div className="text-center mb-6">
                <span className="font-hebrew-serif text-2xl font-bold text-stone-900 border-b-2 border-stone-900 pb-1 px-8 inline-block tracking-[0.3em]">מתני׳</span>
            </div>

            {/* Mishna Text & Inline Translation */}
            <div 
                className={`
                    text-justify font-hebrew-serif text-3xl leading-[1.6] text-stone-900 mb-2 cursor-pointer p-2 rounded transition-all
                    ${isRelated(sugya.baseText.id) ? 'bg-yellow-50 shadow-sm ring-1 ring-yellow-200' : 'hover:bg-stone-50'}
                `}
                dir="rtl"
                onClick={() => handleInteraction(sugya.baseText)}
            >
                {sugya.baseText.hebrewText}
            </div>
            {showEnglish && (
                <div className="mb-8 font-serif text-stone-800 text-lg leading-relaxed text-right border-r-4 border-stone-300 pr-4 bg-white/50 p-2 rounded">
                    {sugya.baseText.englishText}
                </div>
            )}

            {/* Gemara Marker */}
            <div className="flex items-center justify-center gap-4 my-8">
                <div className="h-px bg-stone-900 w-16"></div>
                <span className="font-hebrew-serif text-2xl font-bold text-stone-900">גמ׳</span>
                <div className="h-px bg-stone-900 w-16"></div>
            </div>

            {/* Gemara Text & Inline Translation */}
            {sugya.gemaraText && (
                <>
                    <div 
                        className={`
                            text-justify font-hebrew-serif text-2xl leading-[1.6] text-stone-900 mb-2 cursor-pointer p-2 rounded transition-all
                            ${isRelated(sugya.gemaraText.id) ? 'bg-yellow-50 shadow-sm ring-1 ring-yellow-200' : 'hover:bg-stone-50'}
                        `}
                        dir="rtl"
                        onClick={() => handleInteraction(sugya.gemaraText!)}
                    >
                        {sugya.gemaraText.hebrewText}
                    </div>
                    {showEnglish && (
                        <div className="mb-8 font-serif text-stone-800 text-lg leading-relaxed text-right border-r-4 border-stone-300 pr-4 bg-white/50 p-2 rounded">
                            {sugya.gemaraText.englishText}
                        </div>
                    )}
                </>
            )}

            {/* Secondary Gemara */}
            {sugya.secondaryGemaraText && (
                <div className="mt-12 pt-8 border-t border-dashed border-stone-300">
                    <div className="text-center mb-4">
                         <span className="font-hebrew-serif text-lg font-bold text-stone-500">מקור נוסף</span>
                    </div>
                    <div className="text-justify font-hebrew-serif text-xl leading-[1.6] text-stone-700 bg-stone-50 p-4 rounded mb-2" dir="rtl">
                        <span className="font-bold text-sm block mb-2">{sugya.secondaryGemaraText.speaker}</span>
                        {sugya.secondaryGemaraText.hebrewText}
                    </div>
                    {showEnglish && (
                        <div className="font-serif text-stone-800 text-sm leading-relaxed text-right italic border-r-4 border-stone-300 pr-4">
                            {sugya.secondaryGemaraText.englishText}
                        </div>
                    )}
                </div>
            )}
        </div>

        {/* Left Column: Tosfos (Wider: 3 cols) */}
        <div className="col-span-12 md:col-span-3 md:col-start-10 md:col-end-13 border-r border-stone-300 py-6 px-3 bg-[#fdfbf7]/30 flex flex-col">
            <div className="text-center mb-4">
                <span className="font-rashi font-bold text-lg text-stone-900 border-b border-stone-400 pb-1 inline-block">תוספות</span>
            </div>
            <div className="text-justify font-rashi text-[12px] leading-[1.3] text-stone-800 space-y-3 flex-1" dir="rtl">
                {tosfosSegments.map((seg, idx) => (
                    <div 
                        key={seg.id}
                        className={`
                            cursor-pointer rounded-sm transition-colors block mb-2 p-1
                            ${isRelated(seg.id) ? 'bg-yellow-100/80 text-black' : 'hover:bg-stone-200/50'}
                        `}
                        onClick={() => handleInteraction(seg.sourceNode)}
                    >
                        <div>
                            <span className="font-bold">{seg.dh}. </span>
                            {seg.body}
                        </div>
                        {/* Inline Tosfos Translation */}
                        {showEnglish && seg.english && (
                            <div className="mt-1 text-[11px] font-serif text-stone-600 border-r-2 border-stone-400 pr-2 bg-white/50 p-1 rounded">
                                {seg.english}
                            </div>
                        )}
                    </div>
                ))}
                {tosfosSegments.length === 0 && <span className="text-stone-400 italic text-[11px] text-center block">אין תוספות לסוגיא זו במערכת</span>}
            </div>
        </div>

    </div>
  );

  return (
    <div className="h-full flex flex-col items-center bg-[#fdfbf7] overflow-y-auto overflow-x-hidden relative p-4 md:p-8" onClick={() => setSugyaDropdownOpen(false)}>
      
      {/* Vilna Page Container */}
      <div className="w-full max-w-[1600px] my-4 bg-white shadow-2xl border border-stone-200 relative min-h-[1200px]">
        
        {/* Page Texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none"></div>

        {/* Vilna Header */}
        {renderHeader()}

        {/* Main Grid Content */}
        {activeSource === 'CHUMASH' && renderChumashContent()}
        {activeSource === 'MISHNA' && renderMishnaContent()}
        {activeSource === 'GEMARA' && renderGemaraContent()}

        {/* Footer Notes (Mesoret Hashas style) */}
        <div className="border-t-2 border-stone-800 border-double mx-8 py-4 mb-8">
            <div className="flex justify-between text-[10px] font-hebrew-serif text-stone-600 px-4">
                <span>מסורת הש"ס: א. [דף ב.] ב. [רמב"ם פ"ג]</span>
                <span>עין משפט: א. מיי' פ"ט מהל' גזילה</span>
                <span>תורה אור: א. (שמות כב)</span>
            </div>
        </div>

      </div>
    </div>
  );
};
