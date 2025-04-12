import { SemiconductorProperty } from "@/types";

export const semiconductorProps: Record<string, SemiconductorProperty> = {
  model_name: {
    name: "Name",
    unit: "",
  },
  type: {
    name: "Type",
    unit: "",
  },
  material: {
    name: "Materials",
    unit: "",
    description: "",
  },
  processing_power: {
    name: "Processing power",
    unit: "GHz",
  },
  cost_to_produce: {
    name: "Cost to produce",
    unit: "$",
  },
  life_span_years: {
    name: "Lifespan",
    unit: "year/s",
  },
  release_date: {
    name: "Release date",
    unit: "",
  },
  volume_size_cm3: {
    name: "Volume size",
    // unit: "CM3",
    unit: "cm³",
  },
};
