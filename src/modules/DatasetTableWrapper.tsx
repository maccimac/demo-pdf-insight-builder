import colors from "@utils/colors";
import { datasets } from "../mock-data/datasets";
import { IconButton } from "@mui/material";
import Icon from "@mdi/react";
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";
import PdfDatasetTable from "./DatasetTable";

import DatasetFilters from "./DatasetFilters";
import { FilterOptions, Semiconductor } from "@/types";
import {
  filterSemiconductors,
  sortSemiconstructors,
} from "@utils/sortAndFilter";

import { useEffect, useMemo, useState } from "react";
import { useData } from "@contexts/DataContext";

interface DatasetTableWrapperProps {}

const DatasetTableWrapper: React.FC<DatasetTableWrapperProps> = () => {
  const { datasetName } = useData();
  const { filteredAndSortedData, set_filteredAndSortedData } = useData();
  const [displayAll, set_displayAll] = useState<boolean>(false);

  // Filter logic
  const [filter, set_filter] = useState<FilterOptions>({
    type: ["asic", "ai-accelerator", "controller", "cpu", "fpga", "gpu", "sensor"],
    material: [
      "gaas",
      "gallium-arsenide",
      "gallium-nitride",
      "gan",
      "germanium",
      "indium-gallium-arsenide",
      "indium-phosphide",
      "inp",
      "sige",
      "silicon",
      "silicon-carbide",
      "silicon-germanium",
    ],
    cost_to_produce: [0, 25], // actual: [6.97, 22.0]
    life_span_years: [0, 15], // actual: [3, 10]
    volume_size_cm3: [0, 5], // actual: [1.57, 3.9]
    processing_power: [0, 7], // actual: [1.24, 5.2]
    release_date: ["2010-01-01", "2025-12-31"], // actual: 2011-01-20 to 2025-01-21
  });

  // Sorting logic
  const [order, set_order] = useState<"asc" | "desc">("asc");
  const [orderBy, set_orderBy] = useState<keyof Semiconductor>("model_name");

  const handleSortRequest = (property: keyof Semiconductor) => {
    const isAsc = orderBy === property && order === "asc";
    set_order(isAsc ? "desc" : "asc");
    set_orderBy(property);
  };

  const filterAndSort = () => {
    let data = datasets[datasetName] || [];
    data = filterSemiconductors(data, filter);
    data = sortSemiconstructors(
      data,
      order, // ex: asc / desc
      orderBy // ex: life_span_year
    );
    set_filteredAndSortedData(data);
  };

  // Fix: sortedData
  useEffect(() => {
    filterAndSort();
  }, [datasetName, order, orderBy, filter]);

  const displayData = useMemo<Semiconductor[]>(() => {
    return displayAll
      ? filteredAndSortedData
      : filteredAndSortedData.slice(0, 4);
  }, [filteredAndSortedData, displayAll]);

  return (
    <div
      className={
        displayAll
          ? "pdf-dataset-table pdf-table-expanded mb-4s"
          : "pdf-dataset-table pdf-table-collapsed"
      }
    >
      <DatasetFilters filter={filter} set_filter={set_filter} />

      <PdfDatasetTable
        displayData={displayData}
        orderBy={orderBy}
        order={order}
        handleSortRequest={handleSortRequest}
      />

      <div className="table-footer">
        <div>
          <IconButton
            className="btn--display-all"
            onClick={() => {
              set_displayAll(!displayAll);
            }}
          >
            <Icon
              path={displayAll ? mdiChevronUp : mdiChevronDown}
              size="20px"
              color={colors["pdf-med-dark"]}
            />
          </IconButton>
          <div className="text-we-are-analyzing">
            We are analyzing{" "}
            <span className="active-count">
              {filteredAndSortedData.length}{" "}
            </span>
            of{" "}
            <span className="total-count">{datasets[datasetName].length} </span>
            rows
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetTableWrapper;
