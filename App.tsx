
import React, { useState, useEffect, useRef } from 'react';
import { MOCK_SUGYA, INITIAL_CONCEPTS, AVAILABLE_SUGYAS } from './constants';
import { LogicNodeCard } from './components/LogicNodeCard';
import { ConceptBadge } from './components/ConceptBadge';
import { Whiteboard } from './components/Whiteboard';
import { AnalysisDashboard } from './components/AnalysisDashboard';
import { PsakView } from './components/PsakView';
import { ShearBlat } from './components/ShearBlat';
import { TzurasHadaf } from './components/TzurasHadaf';
import { ScholarDepthView } from './components/ScholarDepthView';
import { SugyaSelector } from './components/SugyaSelector';
import { LogicNode, Concept, StudyStage } from './types';
import Hls from 'hls.js';
import { 
    BookOpen, Settings, X, ChevronRight, Layers, Book, 
    SidebarClose, SidebarOpen, ZoomIn, Map, Home, Lightbulb, ListTree, GripHorizontal,
    ChevronDown, Search, Gavel, FileText, Network, Sparkles, Workflow, ExternalLink, Video,
    Play, Pause, Volume2, SkipForward, SkipBack, Maximize2, User
} from 'lucide-react';

const App: React.FC = () => {
  // --- STATE ---
  const [currentSugya, setCurrentSugya] = useState(MOCK_SUGYA);
  const [currentStage, setCurrentStage] = useState<StudyStage>(StudyStage.SELECTOR);
  const [viewMode, setViewMode] = useState<'LEARN' | 'WHITEBOARD'>('LEARN');
  
  // Navigation State
  const [activePerspectiveId, setActivePerspectiveId] = useState<string | null>(null);
  const [activeSource, setActiveSource] = useState<'CHUMASH' | 'MISHNA' | 'GEMARA'>('CHUMASH');
  const [analysisSection, setAnalysisSection] = useState<'STRUCTURE' | 'LOGIC' | 'MELITZA'>('STRUCTURE');

  // Data State
  const [concepts, setConcepts] = useState<Concept[]>(INITIAL_CONCEPTS);
  const [whiteboardNodes, setWhiteboardNodes] = useState<LogicNode[]>([]);
  
  // UI State
  const [expandedConceptId, setExpandedConceptId] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<LogicNode | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarTab, setSidebarTab] = useState<'OUTLINE' | 'CONCEPTS'>('OUTLINE');
  
  // Resize State
  const [panelHeight, setPanelHeight] = useState(400); 
  const isDraggingPanel = useRef(false);

  // Media Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  // --- MEDIA PLAYER LOGIC ---
  useEffect(() => {
    if (currentSugya.resources?.hlsUrl && videoRef.current) {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
      
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(currentSugya.resources.hlsUrl);
        hls.attachMedia(videoRef.current);
        hlsRef.current = hls;
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = currentSugya.resources.hlsUrl;
      }
    }
  }, [currentSugya.resources?.hlsUrl]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const jumpToTimestamp = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // --- HANDLERS ---
  const handleSwitchSugya = (id: string) => {
      const selected = AVAILABLE_SUGYAS.find(s => s.id === id);
      if (selected && selected.data) {
          setCurrentSugya(selected.data);
          setCurrentStage(StudyStage.INTRO);
          setSelectedNode(null);
          setActivePerspectiveId(null);
          setActiveSource('CHUMASH');
          setIsSidebarOpen(true);
      }
  };

  const handleReturnToLibrary = () => {
      setCurrentStage(StudyStage.SELECTOR);
      setIsSidebarOpen(false);
  }

  const handleAddToWhiteboard = (node: LogicNode) => {
    if (!whiteboardNodes.find(n => n.id === node.id)) {
        setWhiteboardNodes([...whiteboardNodes, node]);
    }
  };

  const handleConceptClick = async (concept: Concept) => {
      setExpandedConceptId(expandedConceptId === concept.id ? null : concept.id);
  };

  const handleNodeSelect = (node: LogicNode) => {
      setSelectedNode(node);
      handleAddToWhiteboard(node);
  };

  const handleScholarSelect = (stage: StudyStage, id: string) => {
      setCurrentStage(stage);
      setActivePerspectiveId(id);
  };
  
  const handleSourceSelect = (source: 'CHUMASH' | 'MISHNA' | 'GEMARA') => {
      setCurrentStage(StudyStage.SOURCE_TEXT);
      setActiveSource(source);
  }

  const handleAnalysisSelect = (section: 'STRUCTURE' | 'LOGIC' | 'MELITZA') => {
      setCurrentStage(StudyStage.ANALYSIS);
      setAnalysisSection(section);
  }

  const handleScholarNavigation = (direction: 'next' | 'prev') => {
      const list = currentStage === StudyStage.DEPTH_RISHONIM 
          ? currentSugya.perspectives 
          : currentSugya.achronimPerspectives;
      
      const currentIndex = list.findIndex(p => p.id === activePerspectiveId);
      if (currentIndex === -1 && list.length > 0) {
          setActivePerspectiveId(list[0].id);
          return;
      }

      const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      
      if (newIndex >= 0 && newIndex < list.length) {
          setActivePerspectiveId(list[newIndex].id);
      }
  };

  const startResize = (e: React.MouseEvent) => {
      e.preventDefault();
      isDraggingPanel.current = true;
      document.addEventListener('mousemove', doResize);
      document.addEventListener('mouseup', stopResize);
  };

  const doResize = (e: MouseEvent) => {
      if (!isDraggingPanel.current) return;
      const newHeight = window.innerHeight - e.clientY;
      if (newHeight > 200 && newHeight < window.innerHeight * 0.8) {
          setPanelHeight(newHeight);
      }
  };

  const stopResize = () => {
      isDraggingPanel.current = false;
      document.removeEventListener('mousemove', doResize);
      document.removeEventListener('mouseup', stopResize);
  };

  useEffect(() => {
      if (currentStage === StudyStage.SELECTOR) {
          setIsSidebarOpen(false);
      }
  }, [currentStage]);

  const activeScholar = 
      currentStage === StudyStage.DEPTH_RISHONIM 
        ? currentSugya.perspectives.find(p => p.id === activePerspectiveId) || currentSugya.perspectives[0]
        : currentStage === StudyStage.DEPTH_ACHRONIM 
            ? currentSugya.achronimPerspectives.find(p => p.id === activePerspectiveId) || currentSugya.achronimPerspectives[0]
            : null;

  return (
    <div className="flex h-screen w-screen overflow-hidden text-slate-800 font-sans bg-[#fdfbf7]">
      
      {/* SIDEBAR */}
      <aside 
        className={`
            bg-white border-r border-slate-200 flex flex-col flex-shrink-0 z-30 
            transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] shadow-xl lg:shadow-none
            ${isSidebarOpen ? 'w-72 translate-x-0' : 'w-0 -translate-x-full opacity-0 overflow-hidden'}
        `}
      >
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity mb-5" onClick={() => setCurrentStage(StudyStage.SELECTOR)}>
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-amber-500 font-bold font-hebrew text-xl shadow-sm">מ</div>
                <h1 className="font-bold tracking-tight text-slate-900 text-lg">MySugya</h1>
            </div>
            <div className="flex bg-slate-200/50 p-1 rounded-lg">
                <button onClick={() => setSidebarTab('OUTLINE')} className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-bold rounded-md transition-all ${sidebarTab === 'OUTLINE' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}><ListTree size={14} /> Outline</button>
                <button onClick={() => setSidebarTab('CONCEPTS')} className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-bold rounded-md transition-all ${sidebarTab === 'CONCEPTS' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}><Lightbulb size={14} /> Concepts</button>
            </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 pb-5">
            {sidebarTab === 'OUTLINE' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="grid grid-cols-1 mb-6">
                        <button onClick={() => setViewMode(viewMode === 'LEARN' ? 'WHITEBOARD' : 'LEARN')} className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${viewMode === 'WHITEBOARD' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}>
                            <Map size={20} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">{viewMode === 'WHITEBOARD' ? 'Close Whiteboard' : 'Open Whiteboard'}</span>
                        </button>
                    </div>
                    <div className="space-y-4">
                        <div onClick={() => setCurrentStage(StudyStage.INTRO)} className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all ${currentStage === StudyStage.INTRO ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}><FileText size={16} /><span>Sugya Intro</span></div>
                        <div onClick={() => setCurrentStage(StudyStage.SOURCE_TEXT)} className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all ${currentStage === StudyStage.SOURCE_TEXT ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}><BookOpen size={16} /><span>Sources</span></div>
                        <div onClick={() => setCurrentStage(StudyStage.ANALYSIS)} className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all ${currentStage === StudyStage.ANALYSIS ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}><Search size={16} /><span>Analysis</span></div>
                        <div onClick={() => setCurrentStage(StudyStage.DEPTH_RISHONIM)} className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all ${currentStage === StudyStage.DEPTH_RISHONIM ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}><Book size={16} /><span>Rishonim</span></div>
                        <div onClick={() => setCurrentStage(StudyStage.PSAK)} className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all ${currentStage === StudyStage.PSAK ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}><Gavel size={16} /><span>Psak Halacha</span></div>
                    </div>
                </div>
            )}
            {sidebarTab === 'CONCEPTS' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                    {concepts.map(c => (
                        <div key={c.id}>
                            <ConceptBadge concept={c} onClick={handleConceptClick} />
                            {expandedConceptId === c.id && (
                                <div className="mt-2 p-3 bg-slate-50 rounded-lg border border-slate-200 animate-in slide-in-from-top-2">
                                    <p className="text-xs text-slate-600 leading-relaxed mb-3">{c.description}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
        <div className="p-4 border-t border-slate-100 bg-slate-50/30">
            <button onClick={handleReturnToLibrary} className="w-full flex items-center justify-center gap-2 text-slate-500 hover:text-slate-800 text-xs font-bold uppercase py-2 rounded-lg hover:bg-slate-100">
                <Home size={14} /> Library
            </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col relative transition-all duration-300 min-w-0 bg-[#fdfbf7] pb-24">
        <div className="absolute top-4 left-4 z-50 print:hidden">
             <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-lg bg-white/80 backdrop-blur border border-slate-200 shadow-sm hover:bg-white text-slate-600">
                {isSidebarOpen ? <SidebarClose size={20} /> : <SidebarOpen size={20} />}
            </button>
        </div>

        {viewMode === 'WHITEBOARD' ? (
             <Whiteboard sugya={currentSugya} onClose={() => setViewMode('LEARN')} />
        ) : (
             <div className="flex-1 overflow-hidden flex flex-col relative">
                <div className="flex-1 overflow-y-auto p-0 w-full scroll-smooth" style={{ paddingBottom: selectedNode ? `${panelHeight}px` : '0px' }}>
                    {currentStage === StudyStage.INTRO && <ShearBlat onStart={() => { setCurrentStage(StudyStage.SOURCE_TEXT); setActiveSource('CHUMASH'); }} title={currentSugya.title} subtitle="Elucidated & Analyzed" resources={currentSugya.resources} />}
                    {currentStage === StudyStage.SOURCE_TEXT && <TzurasHadaf sugya={currentSugya} activeSource={activeSource} onAnalyze={handleNodeSelect} onSwitchSugya={handleSwitchSugya} availableSugyas={AVAILABLE_SUGYAS} />}
                    {currentStage === StudyStage.ANALYSIS && <AnalysisDashboard sugya={currentSugya} section={analysisSection} onSelectNode={() => {}} />}
                    {currentStage === StudyStage.PSAK && <PsakView chain={currentSugya.psakChain} data={currentSugya.shulchanAruch} />}
                    {(currentStage === StudyStage.DEPTH_RISHONIM || currentStage === StudyStage.DEPTH_ACHRONIM) && activeScholar && (
                       <ScholarDepthView perspective={activeScholar} sourceText={currentSugya.baseText} category={currentStage === StudyStage.DEPTH_RISHONIM ? 'RISHONIM' : 'ACHRONIM'} onNavigate={handleScholarNavigation} onPlayTimestamp={jumpToTimestamp} />
                    )}
                </div>

                {selectedNode && (
                    <div className="fixed bottom-24 left-0 right-0 lg:left-80 bg-white border-t-2 border-slate-900 shadow-2xl z-40 flex flex-col" style={{ height: `${panelHeight}px` }}>
                        <div className="h-3 w-full bg-slate-100 border-b border-slate-200 cursor-ns-resize flex items-center justify-center" onMouseDown={startResize}><GripHorizontal size={16} className="text-slate-400" /></div>
                        <div className="h-12 border-b border-slate-200 flex items-center justify-between px-6 bg-slate-50">
                             <div className="flex items-center gap-3">
                                <div className="p-1.5 bg-slate-200 rounded text-slate-700"><ZoomIn size={16} /></div>
                                <span className="font-bold text-slate-700 text-sm uppercase">Analysis & Detail</span>
                                {selectedNode.timestamp !== undefined && (
                                    <button onClick={() => jumpToTimestamp(selectedNode.timestamp!)} className="flex items-center gap-1.5 ml-4 px-3 py-1 bg-indigo-600 text-white rounded-full text-[10px] font-bold uppercase hover:bg-indigo-700 transition-colors">
                                        <Play size={10} fill="currentColor" /> Play in Shiur
                                    </button>
                                )}
                             </div>
                             <button onClick={() => setSelectedNode(null)} className="p-1 hover:bg-slate-200 rounded-full text-slate-400"><X size={20} /></button>
                        </div>
                        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                            <div className="p-6 overflow-y-auto bg-slate-50/30">
                                <h3 className="font-hebrew text-2xl mb-4 text-right font-bold text-slate-900 border-r-4 border-slate-900 pr-4 py-1" dir="rtl">{selectedNode.hebrewText}</h3>
                                <p className="text-slate-700 leading-relaxed text-sm bg-white p-4 rounded-lg border border-slate-200 shadow-sm font-serif">{selectedNode.englishText}</p>
                            </div>
                            <div className="p-6 overflow-y-auto bg-white">
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg"><div className="text-[10px] text-slate-400 uppercase font-bold mb-1">Speaker</div><div className="text-sm font-semibold text-slate-800">{selectedNode.speaker || selectedNode.era}</div></div>
                                    <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg"><div className="text-[10px] text-slate-400 uppercase font-bold mb-1">Era</div><div className="text-sm font-semibold text-slate-800">{selectedNode.era}</div></div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {selectedNode.concepts.map(cId => {
                                        const concept = concepts.find(c => c.id === cId);
                                        return concept ? <span key={cId} className="px-3 py-1.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-md text-xs font-bold flex items-center gap-2"><Lightbulb size={12} className="text-amber-500" />{concept.nameHebrew}</span> : null;
                                    })}
                                </div>
                            </div>
                            <div className="p-6 overflow-y-auto bg-slate-50/30 flex flex-col">
                                <button onClick={() => handleAddToWhiteboard(selectedNode)} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-lg text-sm font-bold uppercase hover:bg-slate-800 shadow-lg"><Map size={16} /> Add to Logic Map</button>
                            </div>
                        </div>
                    </div>
                )}
             </div>
        )}
        
        {/* MEDIA PLAYER FOOTER */}
        <div className="fixed bottom-0 left-0 right-0 h-24 bg-white border-t border-slate-200 flex flex-col z-[60] shadow-2xl">
            <video ref={videoRef} className="hidden" onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} />
            <div className="w-full h-1.5 bg-slate-100 cursor-pointer relative group" onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                if (videoRef.current) videoRef.current.currentTime = pos * duration;
              }}>
                <div className="h-full bg-indigo-600 relative transition-all" style={{ width: `${isNaN(currentTime / duration) ? 0 : (currentTime / duration) * 100}%` }}>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-indigo-600 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
            </div>
            <div className="flex-1 flex items-center justify-between px-6">
                <div className="flex items-center gap-4 w-1/4">
                    <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center text-amber-500 font-bold text-lg">ש</div>
                    <div><div className="text-sm font-bold text-slate-900 line-clamp-1">{currentSugya.title}</div><div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1"><User size={10} /> R Dovid Sackton</div></div>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-8">
                        <button onClick={() => videoRef.current && (videoRef.current.currentTime -= 10)} className="text-slate-400 hover:text-slate-900"><SkipBack size={20} /></button>
                        <button onClick={handlePlayPause} className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center hover:scale-110 shadow-md">
                            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                        </button>
                        <button onClick={() => videoRef.current && (videoRef.current.currentTime += 10)} className="text-slate-400 hover:text-slate-900"><SkipForward size={20} /></button>
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 flex gap-1"><span>{formatTime(currentTime)}</span><span>/</span><span>{formatTime(duration)}</span></div>
                </div>
                <div className="flex items-center justify-end gap-6 w-1/4">
                    <div className="flex items-center gap-2"><Volume2 size={18} className="text-slate-400" /><div className="w-20 h-1 bg-slate-200 rounded-full"></div></div>
                    <button className="text-slate-400"><Maximize2 size={18} /></button>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default App;
