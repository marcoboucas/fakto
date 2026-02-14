// ========================================
// Base Formation Types
// ========================================

export type FormationType = "Catalogue" | "Sur-mesure";
export type FormationModality = "E-learning" | "Présentiel" | "Distanciel";
export type FormationStatus = "Publié" | "Brouillon";
export type UserFormationStatus = "not-started" | "in-progress" | "completed";

// ========================================
// Workflow Element Types
// ========================================

export type WorkflowElementType = "course" | "qcm" | "evaluation";
export type ElementStatus = "locked" | "current" | "completed";

// Base workflow element (DRY principle)
export interface BaseWorkflowElement {
  id: string;
  title: string;
  description: string;
  type: WorkflowElementType;
  order: number;
  duration: string;
}

// ========================================
// Course Types
// ========================================

export interface Course extends BaseWorkflowElement {
  type: "course";
  videoUrl: string;
}

export interface CourseInput {
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  order: number;
}

// ========================================
// QCM (Quiz) Types
// ========================================

export interface QcmAnswer {
  id: string;
  text: string;
  isCorrect: boolean;
  detailedResponse: string; // Shown after selection
}

export interface QcmQuestion {
  id: string;
  text: string;
  answers: QcmAnswer[]; // Always 4 answers
  order: number;
}

export interface Qcm extends BaseWorkflowElement {
  type: "qcm";
  questions: QcmQuestion[];
}

export interface QcmInput {
  title: string;
  description: string;
  duration: string;
  order: number;
  questions: {
    text: string;
    order: number;
    answers: {
      text: string;
      isCorrect: boolean;
      detailedResponse: string;
    }[];
  }[];
}

// ========================================
// Evaluation Types
// ========================================

export interface EvaluationDocument {
  id: string;
  title: string;
  url: string;
  order: number;
}

export interface EvaluationQuestion {
  id: string;
  text: string;
  answers: QcmAnswer[]; // Reuse QcmAnswer type (DRY)
  order: number;
}

export interface Evaluation extends BaseWorkflowElement {
  type: "evaluation";
  detailedDescription: string;
  documents: EvaluationDocument[];
  questions: EvaluationQuestion[];
}

export interface EvaluationInput {
  title: string;
  description: string;
  detailedDescription: string;
  duration: string;
  order: number;
  documents: {
    title: string;
    url: string;
    order: number;
  }[];
  questions: {
    text: string;
    order: number;
    answers: {
      text: string;
      isCorrect: boolean;
      detailedResponse: string;
    }[];
  }[];
}

// ========================================
// Formation Base Type
// ========================================

export interface BaseFormation {
  id: string;
  name: string;
  subtitle?: string;
  type: FormationType;
  modalities: FormationModality[];
  status: FormationStatus;
  description?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

// ========================================
// Admin Formation (extends base)
// ========================================

export interface AdminFormation extends BaseFormation {
  lastModified: string;
}

export interface AdminFormationStats {
  total: number;
  published: number;
  drafts: number;
  custom: number;
}

export interface AdminFormationDetail extends BaseFormation {
  objectives: string[];
  content: string[];
  workflow: (Course | Qcm | Evaluation)[]; // Union type for all workflow elements
}

export interface AdminFormationInput {
  name: string;
  subtitle?: string;
  type: FormationType;
  modalities: FormationModality[];
  status: FormationStatus;
  description?: string;
  image?: string;
  objectives?: string[];
  content?: string[];
}

// ========================================
// User-Facing Formation (extends base)
// ========================================

export interface Formation extends BaseFormation {
  title: string; // Alias for name for backward compatibility
  progress: number;
  userStatus: UserFormationStatus;
  lastViewed?: string;
  elementsCount?: number;
}

export interface FormationStep extends BaseWorkflowElement {
  status: ElementStatus;
}

export interface FormationDetail extends Formation {
  objectives: string[];
  content: string[];
  steps: FormationStep[];
}

// ========================================
// Workflow Element with User Progress
// ========================================

export interface WorkflowElementWithProgress {
  element: Course | Qcm | Evaluation;
  status: ElementStatus;
  userProgress?: {
    completed: boolean;
    score?: number;
    lastAttempt?: string;
  };
}
