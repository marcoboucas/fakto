export type FormationType = "Catalogue" | "Sur-mesure";
export type FormationModality = "E-learning" | "Présentiel" | "Distanciel";
export type FormationStatus = "Publié" | "Brouillon";

export interface AdminFormation {
  id: string;
  name: string;
  subtitle?: string;
  type: FormationType;
  modalities: FormationModality[];
  status: FormationStatus;
  lastModified: string;
}

export interface AdminFormationStats {
  total: number;
  published: number;
  drafts: number;
  custom: number;
}
