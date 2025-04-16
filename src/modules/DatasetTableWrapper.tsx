import colors from "@utils/colors";
import { datasets } from "../mock-data/datasets";
import DatasetFilters from "./DatasetFilters";
import { FilterOptions, Semiconductor } from "@/types";
import {
  filterSemiconductors,
  sortSemiconstructors,
} from "@utils/sortAndFilter";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import Icon from "@mdi/react";
import { mdiChevronDown, mdiChevronUp, mdiMagnify } from "@mdi/js";
import DatasetTable from "./DatasetTable";
import { useEffect, useMemo, useState } from "react";
import { useData } from "@contexts/DataContext";
import { semiconductorProps } from "@utils/semiconductorProps";

interface DatasetTableWrapperProps {}

const DatasetTableWrapper: React.FC<DatasetTableWrapperProps> = () => {
  const { datasetName } = useData();
  const { filteredAndSortedData, set_filteredAndSortedData } = useData();
  const { darkMode } = useData();

  const [search, set_search] = useState<string>("");
  const [displayAll, set_displayAll] = useState<boolean>(false);

  // Filter logic
  const [filter, set_filter] = useState<FilterOptions>({
    type: semiconductorProps.type.filterOptions,
    material: semiconductorProps.material.filterOptions,
    processing_power: semiconductorProps.processing_power.filterOptions,
    cost_to_produce: semiconductorProps.cost_to_produce.filterOptions,
    life_span_years: semiconductorProps.life_span_years.filterOptions,
    release_date: semiconductorProps.release_date.filterOptions,
    volume_size_cm3: semiconductorProps.volume_size_cm3.filterOptions,
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
    if (search.length) {
      data = data.filter((d) => {
        console.log(d);
        const searchTerm = search.toLowerCase();
        if (
          d.model_name?.toLowerCase().includes(searchTerm) ||
          d.type?.toLowerCase().includes(searchTerm) ||
          d.material.join(" ").includes(searchTerm)
        ) {
          return true;
        } else {
          return false;
        }
      });
    }
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
  }, [datasetName, order, orderBy, filter, search]);

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
      <div className="table-heading gap-3 d-flex">
        <div className="mb-1">
          <DatasetFilters filter={filter} set_filter={set_filter} />
        </div>
        <div>
          <TextField
            variant="outlined"
            placeholder="Search"
            size="small"
            onChange={(e) => {
              set_search(e.currentTarget.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon
                    path={mdiMagnify}
                    size="16px"
                    color={colors["pdf-med"]}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              width: "100px",
              fontSize: "14px",
              transition: "all 0.3s ease",

              "& .MuiOutlinedInput-root": {
                fontSize: "14px",
                color: colors["pdf-med-dark"],
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "transparent",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: colors["pdf-light"], // Optional: subtle on hover
                },
                "&.Mui-focused": {
                  // width: "240px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: colors["pdf-blue-accent"],
                    borderWidth: "2px",
                  },
                },
              },
            }}
          />
        </div>
      </div>

      <DatasetTable
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
              color={darkMode ? colors["pdf-lightest"] : colors["pdf-med-dark"]}
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
