export interface Semiconductor {
  value: string;
  label: string;
}

export interface SemiconductorProperty {
  name: string,
  unit?: string,
  hint?: string
  description?: string,
  dataType?: string

}

export interface InsightView {
  value: string;
  label: string;
}
