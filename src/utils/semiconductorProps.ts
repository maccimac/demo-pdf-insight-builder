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
    filterOptions: [
      "ai-accelerator",
      "controller",
      "cpu",
      "fpga",
      "gpu",
      "sensor",
    ],
  },
  material: {
    name: "Materials",
    unit: "",
    description: "",
    dataType: "array",
    filterOptions: [
      "gaas",
      "gallium-arsenide",
      "gallium-nitride",
      "gan",
      "germanium",
      "indium-gallium-arsenide",
      "indium-phosphide",
      "inp",
      "sige",
      "silicon",
      "silicon-carbide",
      "silicon-germanium",
    ],
  },
  processing_power: {
    name: "Processing power",
    unit: "GHz",
    dataType: "number",
    filterOptions: [0, 7],
  },
  cost_to_produce: {
    name: "Cost of production",
    unit: "$",
    dataType: "number",
    filterOptions: [0, 25]
  },
  life_span_years: {
    name: "Lifespan",
    unit: "year/s",
    dataType: "number",
    filterOptions: [0, 15]
  },
  release_date: {
    name: "Release date",
    unit: "",
    dataType: "date",
    filterOptions: ["2010-01-01", "2025-12-31"]
  },
  volume_size_cm3: {
    name: "Volume size",
    unit: "cm³",
    dataType: "number",
    filterOptions: [0, 5],
  },
};
