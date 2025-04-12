import { SemiconductorProperty } from "@/types";

export const semiconductorProps: Record<string, SemiconductorProperty> = {
  model_name: {
    name: "Name",
    unit: "",
    dataType: "string",
  },
  type: {
    name: "Type",
    unit: "",
    dataType: "string",
  },
  material: {
    name: "Materials",
    unit: "",
    description: "",
    dataType: "array",
  },
  processing_power: {
    name: "Processing power",
    unit: "GHz",
    dataType: "number"
  },
  cost_to_produce: {
    name: "Cost of production",
    unit: "$",
    dataType: "number"
  },
  life_span_years: {
    name: "Lifespan",
    unit: "year/s",
    dataType: "number"
  },
  release_date: {
    name: "Release date",
    unit: "",
    dataType: "date",
  },
  volume_size_cm3: {
    name: "Volume size",
    unit: "cm³",
    dataType: "number"
  },
};
