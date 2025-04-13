import { Semiconductor, DatasetItemMeta } from "@/types";
import { advan_featured } from "./advan_featured";
import { dataset_canada_2023 } from "./dataset_canada_2023";
import { system_rec_global } from "./system_rec_global";

export const datasets: Record<string, Semiconductor[]> = {
  advan_featured,
  dataset_canada_2023,
  system_rec_global
};

export const datasetMeta: DatasetItemMeta[] = [
  {
    name: "Dataset Canada 2023",
    value: "dataset_canada_2023",
    description:
      "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.",
    count: dataset_canada_2023.length
  },
  {
    name: "Media recommendations (Global)",
    value: "system_rec_global",
    description:
      "Contrairement à une opinion répandue, le Lorem Ipsum n'est pas simplement du texte aléatoire. Il trouve ses racines dans une oeuvre de la littérature latine classique datant de 45 av. J.-C., le rendant vieux de 2000 ans. ",
    count: advan_featured.length
  },
  {
    name: "Advan Featured Semiconductors",
    value: "advan_featured",
    description:
      "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.",
    count: advan_featured.length
  },
];
