import { Semiconductor } from "@/types";
import { mock_500 } from "./more/mock_500";
export const fab_yield_report: Semiconductor[] = [
  ...mock_500,
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
    model_name: "HelioCore Eon",
    type: "fpga",
    material: ["silicon", "germanium"],
    processing_power: 1.24,
    cost_to_produce: 6.97,
    life_span_years: 6,
    release_date: "2018-10-25",
    volume_size_cm3: 2.76,
  },

  {
    model_name: "TitanDrive X",
    type: "controller",
    material: ["gan", "germanium"],
    processing_power: 2.13,
    cost_to_produce: 15.48,
    life_span_years: 4,
    release_date: "2023-09-10",
    volume_size_cm3: 1.57,
  },
  {
    model_name: "ZenithDrive Eon",
    type: "cpu",
    material: ["silicon"],
    processing_power: 3.66,
    cost_to_produce: 15.1,
    life_span_years: 3,
    release_date: "2012-07-17",
    volume_size_cm3: 3.75,
  },
  {
    model_name: "SpectraLink Edge",
    type: "cpu",
    material: ["gaas", "sige"],
    processing_power: 4.38,
    cost_to_produce: 12.25,
    life_span_years: 10,
    release_date: "2011-01-20",
    volume_size_cm3: 2.69,
  },
  {
    model_name: "LumaFlux V2",
    type: "controller",
    material: ["gallium-nitride", "silicon"],
    processing_power: 2.89,
    cost_to_produce: 12.77,
    life_span_years: 7,
    release_date: "2025-01-21",
    volume_size_cm3: 1.82,
  },
  {
    model_name: "MetaPulse A1",
    type: "sensor",
    material: ["gallium-nitride", "silicon"],
    processing_power: 2.01,
    cost_to_produce: 9.45,
    life_span_years: 10,
    release_date: "2023-06-26",
    volume_size_cm3: 1.76,
  },
  {
    model_name: "QuantaNode Z",
    type: "sensor",
    material: ["inp", "gaas"],
    processing_power: 4.48,
    cost_to_produce: 17.33,
    life_span_years: 9,
    release_date: "2017-07-25",
    volume_size_cm3: 2.55,
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
];
