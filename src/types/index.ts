export interface Semiconductor {
  model_name: string;
  type: string;
  material: string[];
  processing_power: number;
  cost_to_produce: number;
  extra?: number;
  life_span_years: number;
  release_date: string;
  volume_size_cm3: number;
}

export interface SemiconductorProperty {
  name: string;
  unit?: string;
  hint?: string;
  description?: string;
  dataType?: string;
}

export interface InsightView {
  value: string;
  label: string;
}
