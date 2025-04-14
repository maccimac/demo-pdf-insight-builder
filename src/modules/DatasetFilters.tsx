import PdfFilterButton from "@components/PdfFilterButton";
import PdfFilterRangeSlider from "@components/PdfFilterRangeSlider";
import { FilterOptions } from "@/types";
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
        {/* cost_to_prduce */}
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
            max={25}
          />
        </PdfFilterButton>

        {/* lifespan */}
        <PdfFilterButton
          filterKey="life_span_years"
          label={
            <div>
              <strong>Lifespan</strong> is between{" "}
              {filter.life_span_years[0]} to {filter.life_span_years[1]}
            </div>
          }
        >
          <PdfFilterRangeSlider
            filter={filter}
            setFilter={set_filter}
            filterKey="life_span_years"
            initValue={filter.life_span_years}
            max={15}
          />
        </PdfFilterButton>
      </div>
    </div>
  );
};

export default DatasetFilters;
