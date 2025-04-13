import { datasets } from "./../mock-data/datasets";
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

export interface InsightViewParameterCore {
  xAxis: string;
  yAxis: string;
  yColor?: string;
  xIsNumber?: boolean;
}

export interface InsightViewParameter extends InsightViewParameterCore {
  chartType?: string;

  yAxis2?: string;
  yColor2?: string;

  datasetName?: string;
  data?: Semiconductor[];
}

export interface InsightViewMeta {
  name: string;
  params?: InsightViewParameter;
}

export interface SelectorItem<T = any> {
  text: string;
  value: T;
}

export interface DatasetItemMeta {
  name: string;
  value: keyof typeof datasets;
  description?: string;
  count?: number;
  publish_date?: string;
  source?: string;
}
