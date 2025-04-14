import { Semiconductor } from "@/types";

export const formatDate = (rawDate: string) => {
  const date = new Date(rawDate);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getMinAndMax = (
  key: keyof Semiconductor,
  data: Semiconductor[]
): [number, number] => {
  // let min = 0,
  // let max = 0,
  // const values = data
  //   .map((item) => item[key])
  //   .filter((value) => typeof value === "number") as number[];

  // const min = Math.min(...values);
  // const max = Math.max(...values);
  // console.log({ min, max });
  const min = 0;
  const max = 20;
  return [min, max];
};
