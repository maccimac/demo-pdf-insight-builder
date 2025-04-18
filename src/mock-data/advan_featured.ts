import { Semiconductor } from "@/types";
import { mock_50 } from "./more/mock_50";
import { mock_100 } from "./more/mock_100";

export const advan_featured: Semiconductor[] = [
  ...mock_50,
  ...mock_100,
  
  {
    model_name: "HelioDrive X1",
    type: "cpu",
    material: ["silicon-germanium", "gallium-nitride"],
    processing_power: 3.6,
    cost_to_produce: 14.85,
    extra: 1,
    life_span_years: 6,
    release_date: "2021-08-12",
    volume_size_cm3: 2.7,
  },
  {
    model_name: "QuantumFlux R9",
    type: "gpu",
    material: ["gallium-arsenide", "indium-phosphide"],
    processing_power: 4.5,
    cost_to_produce: 19.25,
    extra: 3,
    life_span_years: 7,
    release_date: "2022-11-04",
    volume_size_cm3: 3.3,
  },
  {
    model_name: "NeuroCore L2",
    type: "ai-accelerator",
    material: ["silicon-carbide", "gallium-nitride"],
    processing_power: 5.2,
    cost_to_produce: 22.0,
    extra: 5,
    life_span_years: 9,
    release_date: "2023-03-30",
    volume_size_cm3: 3.9,
  },
  {
    model_name: "PhotonEdge Z5",
    type: "sensor",
    material: ["indium-gallium-arsenide", "silicon"],
    processing_power: 2.7,
    cost_to_produce: 11.3,
    extra: 2,
    life_span_years: 5,
    release_date: "2020-06-21",
    volume_size_cm3: 2.2,
  },
  {
    model_name: "CryoChip M8",
    type: "fpga",
    material: ["silicon", "gallium-oxide"],
    processing_power: 3.9,
    cost_to_produce: 16.4,
    extra: 4,
    life_span_years: 7,
    release_date: "2024-01-10",
    volume_size_cm3: 3.0,
  },
];
