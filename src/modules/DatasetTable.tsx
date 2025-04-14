import colors from "@utils/colors";
import { datasets } from "../mock-data/datasets";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableSortLabel,
} from "@mui/material";
import Icon from "@mdi/react";
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";
import PdfDatasetTableRow from "../components/PdfDatasetTableRow";
import PdfFilterItem from "@components/PdfFilterItem";
import { FilterOptions, Semiconductor, SemiconductorProperty } from "@/types";
import {
  filterSemiconductors,
  sortSemiconstructors,
} from "@utils/sortAndFilter";

import { semiconductorProps } from "../utils/semiconductorProps";
import { useEffect, useMemo, useState } from "react";
import { useData } from "@contexts/DataContext";

interface DatasetTableProps {}

const DatasetTable: React.FC<DatasetTableProps> = () => {
  const { datasetName } = useData();
  const { filteredAndSortedData, set_filteredAndSortedData } = useData();
  const [displayAll, set_displayAll] = useState<boolean>(false);

  // Filter logic
  const [filter, set_filter] = useState<FilterOptions>({
    type: undefined,
    cost_to_produce: [0, 10],
  });

  // Sorting logic
  const [order, set_order] = useState<"asc" | "desc">("asc");
  const [orderBy, set_orderBy] = useState<keyof Semiconductor>("model_name");

  const handleSortRequest = (property: keyof Semiconductor) => {
    const isAsc = orderBy === property && order === "asc";
    set_order(isAsc ? "desc" : "asc");
    set_orderBy(property);
  };

  // Fix: sortedData
  useEffect(() => {
    let data = datasets[datasetName] || [];
    data = filterSemiconductors(data, filter);
    data = sortSemiconstructors(
      data,
      order, // ex: asc / desc
      orderBy // ex: life_span_year
    );
    set_filteredAndSortedData(data);
  }, [datasetName, displayAll, order, orderBy]);

  // const sortedData = useMemo<Semiconductor[]>(() => {
  //   let data = datasets[datasetName] || [];
  //   data = filterSemiconductors(data, filter);
  //   data = sortSemiconstructors(
  //     data,
  //     order, // ex: asc / desc
  //     orderBy // ex: life_span_year
  //   );
  //   return data;
  // }, [datasetName, displayAll, order, orderBy]);

  const displayData = useMemo<Semiconductor[]>(() => {
    return displayAll
      ? filteredAndSortedData
      : filteredAndSortedData.slice(0, 4);
  }, [filteredAndSortedData]);

  return (
    <div
      className={
        displayAll
          ? "pdf-dataset-table pdf-table-expanded mb-4s"
          : "pdf-dataset-table pdf-table-collapsed"
      }
    >
      <div className="d-flex gap-2 m-2">
        <PdfFilterItem key="materials" label="Filter by any" />
        <PdfFilterItem key="materials" label="Filter by any" />
        <PdfFilterItem key="materials" label="Filter by any" />
        <PdfFilterItem key="materials" label="Filter by any" />
      </div>
      <TableContainer>
        <Table>
          <TableHead className="no-border-head">
            {Object.entries(semiconductorProps).map(
              ([key, semiCondProp]: [string, SemiconductorProperty]) => (
                <TableCell key={key}>
                  <TableSortLabel
                    active={orderBy === key}
                    direction={
                      orderBy === key ? (order as "asc" | "desc") : "asc"
                    }
                    onClick={() =>
                      handleSortRequest(key as keyof Semiconductor)
                    }
                  >
                    {semiCondProp.name}
                  </TableSortLabel>
                </TableCell>
              )
            )}
          </TableHead>
          <TableBody className="">
            {displayData.map((row, index) => (
              <PdfDatasetTableRow row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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

export default DatasetTable;
