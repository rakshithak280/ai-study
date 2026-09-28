export type BranchId = 
  | 'mechanical'
  | 'computer_science'
  | 'electrical_electronics'
  | 'civil_structural'
  | 'chemical_materials'
  | 'aerospace'
  | 'biomedical'
  | 'mechatronics';

export interface Branch {
  id: BranchId;
  name: string;
  code: string;
  tagline: string;
  primaryDomain: string;
  accentColor: string;
  iconName: string;
  coreConcepts: string[];
  thinkingModel: string;
  keyGoverningLaw: string;
  strengths: string[];
}

export type SubjectCategory = 
  | 'core_foundations'
  | 'computer_science_ai'
  | 'electrical_silicon'
  | 'mechanical_thermal'
  | 'civil_materials'
  | 'cross_frontiers';

export interface SubjectModule {
  title: string;
  duration: string;
  summary: string;
  keyFormulas?: string[];
  practicalExercise?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  branchHint?: Record<BranchId, string>;
}

export interface Subject {
  id: string;
  title: string;
  category: SubjectCategory;
  level: 'Foundational' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  summary: string;
  description: string;
  prerequisites: string[];
  tags: string[];
  branchMotivation: Record<BranchId, {
    importance: string;
    nativeAnalogy: string;
    difficultyRating: 1 | 2 | 3 | 4 | 5;
  }>;
  modules: SubjectModule[];
  keyFormulas: {
    name: string;
    formula: string;
    variables: string;
    physicalMeaning: string;
  }[];
  codeSnippet?: {
    language: string;
    title: string;
    code: string;
  };
  quiz: QuizQuestion[];
}

export interface ConceptBridge {
  id: string;
  targetConcept: string;
  targetDomain: string;
  summary: string;
  bridges: Record<BranchId, {
    coreIntuition: string;
    familiarAnalogy: string;
    mappingTable: {
      nativeTerm: string;
      targetTerm: string;
      sharedPhysicalRole: string;
    }[];
    mathematicalEquivalence: {
      nativeEquation: string;
      targetEquation: string;
      underlyingUniversalMath: string;
    };
    commonTrap: string;
    quickExperiment: string;
  }>;
}

export interface CapstoneProject {
  id: string;
  title: string;
  tagline: string;
  branchesInvolved: BranchId[];
  complexity: 'Intermediate' | 'Advanced' | 'Mastery';
  durationWeeks: number;
  objective: string;
  branchRoles: {
    branchId: BranchId;
    role: string;
    responsibilities: string[];
  }[];
  systemArchitecture: string[];
  billOfMaterials: {
    item: string;
    category: 'Hardware' | 'Electronics' | 'Software' | 'Mechanical';
    approxCost: string;
    purpose: string;
  }[];
  starterCode?: {
    language: string;
    filename: string;
    snippet: string;
  };
  learningOutcomes: string[];
}

export interface EngineeringConstant {
  symbol: string;
  name: string;
  value: string;
  unit: string;
  domain: string;
  significance: string;
}
