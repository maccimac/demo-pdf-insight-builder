import { Semiconductor, DatasetItemMeta } from "@/types";
import { advan_featured } from "./advan_featured";
import { dataset_canada_2023 } from "./dataset_canada_2023";
import { system_composition_index } from "./system_composition_index";
import { fab_yield_report } from "./fab_yield_report";

export const datasets: Record<string, Semiconductor[]> = {
  advan_featured,
  dataset_canada_2023,
  system_composition_index,
  fab_yield_report,
};

export const datasetMeta: DatasetItemMeta[] = [
  {
    name: "Dataset Canada 2023",
    value: "dataset_canada_2023",
    description:
      "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Il trouve ses racines. ",
    count: dataset_canada_2023.length,
    publish_date: "2023-11-01",
    source: "Semiconductor Canada Board"
  },
  {
    name: "System Composition Index",
    value: "system_composition_index",
    description:
      "Contrairement à une opinion répandue, le Lorem Ipsum n'est pas simplement du texte aléatoire. Il trouve ses racines dans une oeuvre de la littérature la.",
    count: system_composition_index.length,
    publish_date: "2022-09-15",
    source: "Global Materials Consortium"
  },
  {
    name: "Advan Featured Systems",
    value: "advan_featured",
    description:
      "Dans une petite ville de l’Aveyron ou des Pyrénées, le moindre incident eût été rendu décisif par le feu du climat.  Il trouve ses racines dans une oeuvre de la littérature la. ",
    count: advan_featured.length,
    publish_date: "2024-01-22",
    source: "Advan Labs"
  },
  {
    name: "Yield Report",
    value: "fab_yield_report",
    description:
      "Sous nos cieux plus sombres, un jeune homme pauvre, et qui n’est qu’ambitieux parce que la délicatesse de son cœur lui fait un besoin de quelques-unes des jouissances que donne l’argent, ",
    count: advan_featured.length,
    publish_date: "2023-08-30",
    source: "International Fabrication Data Exchange"
  },
];

