import PdfFilterButton from "@components/PdfFilterButton";
import PdfFilterRangeSlider from "@components/PdfFilterRangeSlider";
import { FilterOptions } from "@/types";
import { filterSemiconductors } from "@utils/sortAndFilter";
import { useEffect, useState } from "react";
import { useData } from "@contexts/DataContext";
interface DatasetFiltersProps {
  filter: FilterOptions;
  set_filter: Function;
}

const DatasetFilters: React.FC<DatasetFiltersProps> = ({
  filter,
  set_filter,
}) => {
  return (
    <div className="pdf-dataset-filters">
      <div className="d-flex gap-2 m-2">
        <PdfFilterButton
          filterKey="cost_to_produce"
          label={
            <div>
              <strong>Cost to produce</strong> is between{" "}
              {filter.cost_to_produce[0]} to {filter.cost_to_produce[1]}
            </div>
          }
        >
          <PdfFilterRangeSlider
            filter={filter}
            setFilter={set_filter}
            filterKey="cost_to_produce"
            initValue={filter.cost_to_produce}
            min={0}
            max={20}
          />
        </PdfFilterButton>
      </div>
    </div>
  );
};

export default DatasetFilters;
