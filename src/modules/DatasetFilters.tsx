import PdfFilterButton from "@components/PdfFilterButton";
import PdfFilterDateRange from "@components/PdfFilterDateRange";
import PdfFilterRangeSlider from "@components/PdfFilterRangeSlider";
import PdfFilterMultiCheckbox from "@components/PdfFilterMultiCheckbox";
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
      <div className="d-block d-lg-flex gap-2 m-2">
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
              <strong>Lifespan</strong> is between {filter.life_span_years[0]}{" "}
              to {filter.life_span_years[1]}
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

        <PdfFilterButton
          filterKey="life_span_years"
          label={
            <div>
              <strong>Type</strong> is
              {filter.type.join(", ")}
            </div>
          }
        >
          <PdfFilterMultiCheckbox
            filter={filter}
            setFilter={set_filter}
            filterKey="type"
            initValue={filter.type}
          />
        </PdfFilterButton>

        <PdfFilterButton
          filterKey="life_span_years"
          label={
            <div>
              <strong>Release date</strong> is between {" "}
              {filter.release_date[0]} and {filter.release_date[1]}
            </div>
          }
        >
          <PdfFilterDateRange
            filter={filter}
            setFilter={set_filter}
            filterKey="release_date"
            initValue={filter.release_date}
          />
        </PdfFilterButton>
      </div>
    </div>
  );
};

export default DatasetFilters;
