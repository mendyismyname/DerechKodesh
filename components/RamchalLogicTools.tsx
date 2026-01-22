
import React, { useState } from 'react';
import { LogicSystemData } from '../types';
import { Network, GitBranch, Split, AlertTriangle, ChevronDown } from 'lucide-react';

interface Props {
  data: LogicSystemData;
}

export const RamchalLogicTools: React.FC<Props> = ({ data }) => {
  const [hoveredStmtIdx, setHoveredStmtIdx] = useState<number | null>(null);
  
  const hasData = data && data.statements && data.statements.length > 0;

  if (!hasData) {
      return (
          <div className="flex flex-col items-center justify-center h-full p-12 text-center">
              <Network size={64} className="text-slate-300 mb-6" />
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Ramchal Logic System Empty</h3>
              <p className="text-slate-500 max-w-md">
                  A logical breakdown of this sugya using the methodology of the Ramchal is currently unavailable.
              </p>
          </div>
      )
  }

  const activeStmt = hoveredStmtIdx !== null ? data.statements[hoveredStmtIdx] : data.statements[0];

  return (
    <div className="h-full flex flex-col items-center bg-[#fdfbf7] overflow-y-auto p-4 md:p-8">
      <div className="w-full max-w-[1400px] mb-8 text-center border-b border-stone-300 pb-4">
          <h2 className="font-hebrew text-4xl font-bold text-slate-900">מערכת ההגיון</h2>
          <p className="text-slate-500 mt-2 font-serif italic text-sm">Logic System Analysis (Ramchal Methodology)</p>
      </div>

      <div className="w-full max-w-[1600px] grid grid-cols-1 lg:grid-cols-12 gap-6 relative flex-1 min-h-[800px]">
        <div className="lg:col-span-3 text-right space-y-6" dir="rtl">
             <div className="text-center border-b border-stone-300 pb-2 mb-4"><h3 className="font-hebrew font-bold text-xl text-stone-900">היקש (Syllogism)</h3></div>
             <div className="space-y-4">
                <div className="bg-white p-4 rounded shadow-sm border-r-4 border-blue-500">
                    <div className="text-xs font-bold text-blue-600 mb-1">הקדמה (Premise 1)</div>
                    <div className="text-stone-800 font-serif text-sm">{data.syllogism.premise1}</div>
                </div>
                <div className="bg-white p-4 rounded shadow-sm border-r-4 border-blue-500">
                    <div className="text-xs font-bold text-blue-600 mb-1">קישור (Premise 2)</div>
                    <div className="text-stone-800 font-serif text-sm">{data.syllogism.premise2}</div>
                </div>
                <div className="bg-emerald-50 p-4 rounded shadow-sm border-r-4 border-emerald-500">
                    <div className="text-xs font-bold text-emerald-600 mb-1">תולדה (Conclusion)</div>
                    <div className="text-stone-900 font-bold font-serif text-sm">{data.syllogism.conclusion}</div>
                </div>
             </div>
        </div>

        <div className="lg:col-span-6 bg-white shadow-xl border border-stone-300 p-8 rounded-sm relative flex flex-col">
            <div className="text-center mb-6"><span className="font-hebrew text-2xl font-bold text-stone-900 border-b-2 border-stone-900 pb-1 px-6 inline-block tracking-wide">משא ומתן</span></div>
            <div className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                {data.statements.map((stmt, idx) => (
                    <div key={idx} onMouseEnter={() => setHoveredStmtIdx(idx)} className={`relative p-6 rounded-lg transition-all border-2 cursor-pointer ${hoveredStmtIdx === idx ? 'border-indigo-600 bg-indigo-50/30' : 'border-transparent hover:bg-stone-50'}`}>
                        <div className="flex items-start justify-between mb-2">
                             <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded text-white bg-slate-600`}>{stmt.type}</span>
                             <span className="text-xs text-stone-400 font-mono">Step {idx + 1}</span>
                        </div>
                        <p className="font-hebrew text-2xl text-stone-900 leading-relaxed text-right" dir="rtl">{stmt.text}</p>
                    </div>
                ))}
            </div>
        </div>

        <div className="lg:col-span-3 text-right space-y-6" dir="rtl">
            <div className="text-center border-b border-stone-300 pb-2 mb-4"><h3 className="font-hebrew font-bold text-xl text-stone-900">ניתוח המשפט</h3></div>
            {activeStmt ? (
                <div className="space-y-4 animate-in fade-in">
                    <div className="bg-indigo-50 p-4 rounded shadow-sm border border-indigo-100"><div className="text-xs font-bold text-indigo-600 mb-1">נושא (Subject)</div><div className="text-stone-900 font-bold text-lg">{activeStmt.analysis.subject}</div></div>
                    <div className="bg-indigo-50 p-4 rounded shadow-sm border border-indigo-100"><div className="text-xs font-bold text-indigo-600 mb-1">נשוא (Predicate)</div><div className="text-stone-900 font-bold text-lg">{activeStmt.analysis.predicate}</div></div>
                </div>
            ) : <div className="text-center text-stone-400 italic">Hover over a statement.</div>}
        </div>
      </div>
    </div>
  );
};
