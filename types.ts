
export enum LogicType {
  STATEMENT = 'STATEMENT',
  QUESTION = 'QUESTION',
  ANSWER = 'ANSWER',
  PROOF = 'PROOF',
  REBUTTAL = 'REBUTTAL',
  PRINCIPLE = 'PRINCIPLE',
  CASE = 'CASE',
  LAW = 'LAW',
  SOURCE = 'SOURCE',
  FACTOR = 'FACTOR'
}

export enum Era {
  TANNA = 'TANNA',
  AMORA = 'AMORA',
  RISHON = 'RISHON',
  ACHRON = 'ACHRON',
  HALACHA = 'HALACHA'
}

export enum StudyStage {
  SELECTOR = 'SELECTOR',       // New: Library/Selection Screen
  INTRO = 'INTRO',             // Shear Blat / Title Page
  SOURCE_TEXT = 'SOURCE_TEXT', // Mishna & Gemara (Tzuras Hadaf)
  ANALYSIS = 'ANALYSIS',       // Case, Law, Factor extraction
  LOGIC_SYSTEM = 'LOGIC_SYSTEM', // Ramchal Methodology Tools
  DEPTH_RISHONIM = 'DEPTH_RISHONIM',
  DEPTH_ACHRONIM = 'DEPTH_ACHRONIM',
  PSAK = 'PSAK'                // Practical Law
}

export interface Concept {
  id: string;
  nameHebrew: string;
  nameEnglish: string;
  description: string;
  category: 'Kinyan' | 'Mamon' | 'Issur' | 'Kodshim' | 'Logic';
  subComponents?: string[];
  relatedLaws?: string[];
}

export interface LogicNode {
  id: string;
  type: LogicType;
  speaker?: string;
  era: Era;
  hebrewText: string;
  englishText: string;
  concepts: string[]; // IDs of concepts
  children: LogicNode[];
  isExpanded?: boolean;
  notes?: string;
  parentId?: string;
  timestamp?: number; // Seconds into the shiur
}

export interface Perspective {
  id: string;
  scholarName: string; // e.g., "Rashi", "Tosfos", "Rambam"
  scholarNameHebrew?: string; // e.g. "רש״י"
  description: string;
  rootNode: LogicNode; // The logic tree according to this scholar
  timestamp?: number; // Seconds into the shiur
  // New deep analysis fields
  analysis?: {
      focus: string; // What part of the source they focus on
      chiddush: string; // What they add
      reasoning: string; // The "Svara"
      dispute?: string; // Who they are arguing with
  }
}

export interface AnalysisComponent {
  id: string;
  category: 'CASE' | 'LAW' | 'FACTOR' | 'SOURCE';
  title: string;
  description: string;
  refId: string; // ID of the LogicNode this refers to
}

export interface PsakEntry {
  id: string;
  authority: string; // e.g. Shulchan Aruch
  text: string;
  ruling: string;
  citation: string;
  basedOn: string[]; // IDs of previous opinions/nodes
}

// Logic System Types (Ramchal)
export interface LogicStatement {
  text: string;
  type: string; // e.g., "Meimra", "Kushya"
  color: string;
  analysis: {
    subject: string;
    predicate: string;
    statementType: string;
    reason?: string;
  }
}

export interface Syllogism {
  premise1: string;
  premise2: string;
  conclusion: string;
}

export interface LogicSystemData {
  statements: LogicStatement[];
  syllogism: Syllogism;
}

export interface ModernApplication {
    id: string;
    title: string;
    scenario: string;
    parallels: string;
    ruling: string;
    deepAnalysis?: {
        yesod: string; // The fundamental conceptual link
        perspectives: {
            authority: string; // e.g. "According to Rashba"
            logic: string; // How their specific logic applies here
            outcome: string; // The specific ruling for this case
        }[];
    };
}

export interface VisualFlowStep {
    id: string;
    label: string;
    type: 'ACTION' | 'QUESTION' | 'DECISION' | 'RESULT';
    description?: string;
    status: 'VALID' | 'INVALID' | 'DISPUTED' | 'NEUTRAL';
    branches?: VisualFlowStep[];
}

export interface ShulchanAruchData {
    siman: string;
    seif: string;
    mainText: { type: 'MECHABER' | 'REMA', text: string, translation?: string }[];
    mishnaBrura: { id: string, noteChar: string, text: string, translation: string }[];
    shulchanAruchHarav: { id: string, text: string, translation: string }[];
}

export interface ChumashData {
    sourceRef: string; // e.g. "Devarim 24:1"
    text: string;
    translation: string;
    rashi: { id: string, text: string, translation?: string }[];
    targum: string;
    targumTranslation?: string;
}

export interface MishnaContextText {
    ref: string;
    hebrew: string;
    english: string;
}

export interface Commentary {
    id: string;
    scholar: string;
    hebrewText: string;
    englishText: string;
}

export interface SugyaSection {
  id: string;
  title: string;
  sourceRef: string; // e.g., "Bava Metzia 2a"
  
  // Sources
  chumashText?: ChumashData;
  mishnaContext?: {
      previous?: MishnaContextText;
      next?: MishnaContextText;
      bartenura?: Commentary[];
  };
  baseText: LogicNode; // The Mishna
  gemaraText?: LogicNode; // The Gemara
  secondaryGemaraText?: LogicNode; // Optional 2nd source

  perspectives: Perspective[]; // Rishonim
  achronimPerspectives: Perspective[]; // Achronim
  analysis: AnalysisComponent[];
  psakChain: PsakEntry[];
  shulchanAruch: ShulchanAruchData;
  logicSystem: LogicSystemData;
  modernAnalysis: ModernApplication[];
  visualFlow: VisualFlowStep[];
  
  // External Resources
  resources?: {
      videoUrl?: string;
      pdfUrl?: string;
      hlsUrl?: string; // New: HLS stream link
  };
}

export interface AppState {
  currentSugya: SugyaSection;
  activePerspectiveId: string | null;
  learnedConcepts: Concept[];
  whiteboardNodes: LogicNode[];
  currentStage: StudyStage;
  mode: 'LEARN' | 'WHITEBOARD' | 'SUMMARY';
}
