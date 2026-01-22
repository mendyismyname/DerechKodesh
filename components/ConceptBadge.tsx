import React from 'react';
import { Concept } from '../types';
import { Box, Sparkles } from 'lucide-react';

interface Props {
  concept: Concept;
  onClick: (c: Concept) => void;
}

export const ConceptBadge: React.FC<Props> = ({ concept, onClick }) => {
  return (
    <div 
      onClick={() => onClick(concept)}
      className="
        group flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-amber-100 to-amber-50 
        border border-amber-200 rounded-md cursor-pointer hover:shadow-md transition-all
      "
    >
      <div className="p-1 bg-amber-200 rounded text-amber-800">
        <Box className="w-4 h-4" />
      </div>
      <div>
        <div className="font-hebrew font-bold text-gray-800 text-sm">{concept.nameHebrew}</div>
        <div className="text-xs text-gray-500 group-hover:text-amber-700">{concept.nameEnglish}</div>
      </div>
      <Sparkles className="w-3 h-3 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
    </div>
  );
};
