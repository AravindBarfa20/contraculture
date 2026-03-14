export interface Project {
  id: string;
  user_id: string;
  name: string;
  description: string;
  source_locale: string;
  target_locales: string[];
  status: "draft" | "analyzed" | "adapted" | "simulated";
  created_at: string;
  updated_at: string;
  copy_strings?: CopyString[];
  simulation_results?: SimulationResult[];
}

export interface CopyString {
  id: string;
  project_id: string;
  string_key: string;
  content: string;
  string_type: string;
  persuasion_category: string | null;
  persuasion_scores: Record<string, number>;
  sort_order: number;
  created_at: string;
  translations?: Translation[];
  adaptations?: Adaptation[];
}

export interface Translation {
  id: string;
  copy_string_id: string;
  locale: string;
  content: string;
  created_at: string;
}

export interface Adaptation {
  id: string;
  copy_string_id: string;
  locale: string;
  variant_label: string;
  content: string;
  cultural_reasoning: string;
  hofstede_alignment: Record<string, number>;
  created_at: string;
}

export interface SimulationResult {
  id: string;
  project_id: string;
  locale: string;
  variant_label: string;
  simulated_visitors: number;
  simulated_conversions: number;
  conversion_rate: number;
  confidence_level: number;
  is_winner: boolean;
  insight: string;
  created_at: string;
}

export interface CopyStringInput {
  string_key: string;
  content: string;
  string_type: string;
  sort_order: number;
}
