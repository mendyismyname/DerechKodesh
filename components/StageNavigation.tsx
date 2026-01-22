import React from 'react';
import { StudyStage } from '../types';
import { 
  BookOpen, Search, Book, Layers, Gavel 
} from 'lucide-react';

interface Props {
  currentStage: StudyStage;
  setStage: (s: StudyStage) => void;
  vertical?: boolean;
}

const steps = [
  { id: StudyStage.SOURCE_TEXT, label: 'Source Text', icon: BookOpen },
  { id: StudyStage.ANALYSIS, label: 'Deep Analysis', icon: Search },
  // Logic System merged into Analysis
  { id: StudyStage.DEPTH_RISHONIM, label: 'Rishonim', icon: Book },
  { id: StudyStage.DEPTH_ACHRONIM, label: 'Achronim', icon: Layers },
  { id: StudyStage.PSAK, label: 'Psak', icon: Gavel },
];

export const StageNavigation: React.FC<Props> = ({ currentStage, setStage, vertical = false }) => {
  return (
    <div className={`flex ${vertical ? 'flex-col gap-2 w-full' : 'items-center gap-1'}`}>
        {steps.map((step) => {
            const isActive = currentStage === step.id;
            const Icon = step.icon;
            
            return (
                <button
                    key={step.id}
                    onClick={() => setStage(step.id)}
                    className={`
                        flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all
                        ${isActive 
                            ? 'bg-slate-900 text-white shadow-md' 
                            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}
                        ${vertical ? 'w-full justify-start' : ''}
                    `}
                >
                    <Icon size={14} className={isActive ? 'text-amber-400' : 'text-slate-400'} />
                    {step.label}
                </button>
            );
        })}
    </div>
  );
};