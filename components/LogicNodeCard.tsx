
import React from 'react';
import { LogicNode, LogicType, Era } from '../types';
import { MessageSquare, Gavel, HelpCircle, Scale, BookOpen, ShieldAlert, ArrowRight, PlayCircle } from 'lucide-react';

interface Props {
  node: LogicNode;
  depth?: number;
  onSelect?: (node: LogicNode) => void;
  onPlayTimestamp?: (seconds: number) => void;
  isActive?: boolean;
}

const getTypeIcon = (type: LogicType) => {
  switch (type) {
    case LogicType.QUESTION: return <HelpCircle className="w-4 h-4 text-red-600" />;
    case LogicType.ANSWER: return <MessageSquare className="w-4 h-4 text-green-600" />;
    case LogicType.PROOF: return <Scale className="w-4 h-4 text-blue-600" />;
    case LogicType.REBUTTAL: return <ShieldAlert className="w-4 h-4 text-orange-600" />;
    case LogicType.LAW: return <Gavel className="w-4 h-4 text-purple-800" />;
    case LogicType.SOURCE: return <BookOpen className="w-4 h-4 text-amber-700" />;
    default: return <ArrowRight className="w-4 h-4 text-gray-500" />;
  }
};

const getEraColor = (era: Era) => {
    switch (era) {
        case Era.TANNA: return 'bg-amber-50 border-amber-200';
        case Era.AMORA: return 'bg-blue-50 border-blue-200';
        case Era.RISHON: return 'bg-emerald-50 border-emerald-200';
        case Era.ACHRON: return 'bg-purple-50 border-purple-200';
        default: return 'bg-white border-gray-200';
    }
}

export const LogicNodeCard: React.FC<Props> = ({ node, depth = 0, onSelect, onPlayTimestamp, isActive }) => {
  return (
    <div className="flex flex-col relative">
      <div 
        className={`
          relative p-4 rounded-lg border-l-4 shadow-sm transition-all duration-200 cursor-pointer
          ${getEraColor(node.era)}
          ${isActive ? 'ring-2 ring-blue-500 shadow-md transform scale-[1.01]' : 'hover:shadow-md'}
          mb-3
        `}
        style={{ marginLeft: `${depth * 1.5}rem` }}
        onClick={() => onSelect && onSelect(node)}
      >
        {/* Connector Line for nested items */}
        {depth > 0 && (
          <div className="absolute -left-4 top-6 w-4 h-px bg-gray-300" />
        )}

        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <span className="p-1 bg-white rounded-full shadow-sm">
                {getTypeIcon(node.type)}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              {node.type} • {node.speaker || node.era}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            {node.timestamp !== undefined && onPlayTimestamp && (
                <button 
                  onClick={(e) => { e.stopPropagation(); onPlayTimestamp(node.timestamp!); }}
                  className="p-1 bg-white hover:bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100 shadow-sm transition-colors"
                  title="Play in Shiur"
                >
                    <PlayCircle size={14} />
                </button>
            )}
            {node.concepts.length > 0 && (
                <div className="flex gap-1">
                    {node.concepts.map(c => (
                        <span key={c} className="w-2 h-2 rounded-full bg-amber-400" title="Contains Concept"></span>
                    ))}
                </div>
            )}
          </div>
        </div>

        <div className="font-hebrew text-xl leading-relaxed text-gray-900 mb-2 text-right" dir="rtl">
          {node.hebrewText}
        </div>
        
        <div className="text-sm text-gray-600 leading-snug font-light border-t border-gray-200/50 pt-2">
          {node.englishText}
        </div>
      </div>

      {node.children && node.children.length > 0 && (
        <div className="flex flex-col relative border-l border-gray-300 ml-4 pl-0">
          {node.children.map((child) => (
            <LogicNodeCard 
                key={child.id} 
                node={child} 
                depth={depth}
                onSelect={onSelect}
                onPlayTimestamp={onPlayTimestamp}
                isActive={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};
