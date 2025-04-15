import { FilterOptions, Semiconductor } from "@/types";

export const filterSemiconductors = (
  data: Semiconductor[],
  filters: FilterOptions
) => {
  return data.filter((item) => {
    // type
    const matchesType = filters.type ? filters.type.includes(item.type) : true;

    // cost_to_produce
    const matchesCost = filters.cost_to_produce
      ? item.cost_to_produce >= filters.cost_to_produce[0] &&
        item.cost_to_produce <= filters.cost_to_produce[1]
      : true;

    // life_span_years
    const matchesLifespan = filters.life_span_years
      ? item.life_span_years >= filters.life_span_years[0] &&
        item.life_span_years <= filters.life_span_years[1]
      : true;

    // release_date
    const matchesReleaseDate = filters.release_date
      ? new Date(item.release_date) >= new Date(filters.release_date[0]) &&
        new Date(item.release_date) <= new Date(filters.release_date[1])
      : true;

    return matchesType && matchesCost && matchesLifespan && matchesReleaseDate;
  });
};

export const sortSemiconstructors = (
  data: Semiconductor[],
  order: "asc" | "desc",
  orderBy: keyof Semiconductor
) => {
  function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  }
  function getComparator(
    order: "asc" | "desc",
    orderBy: keyof Semiconductor
  ): (a: Semiconductor, b: Semiconductor) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  return data.sort(getComparator(order, orderBy));
};
