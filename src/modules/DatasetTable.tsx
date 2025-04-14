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
import { semiconductorProps } from "../utils/semiconductorProps";
import { Semiconductor, SemiconductorProperty } from "@/types";
import { useMemo, useState } from "react";
import { useData } from "@contexts/DataContext";

interface DatasetTableProps {}

const DatasetTable: React.FC<DatasetTableProps> = () => {
  const { datasetName } = useData();
  const [displayAll, set_displayAll] = useState<boolean>(false);

  // Sorting logic
  const [order, set_order] = useState<"asc" | "desc">("asc");
  const [orderBy, set_orderBy] = useState<keyof Semiconductor>("model_name");

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  }

  // Fix: pass `orderBy` as keyof Semiconductor
  function getComparator(
    order: "asc" | "desc",
    orderBy: keyof Semiconductor
  ): (a: Semiconductor, b: Semiconductor) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  // Fix: strongly type `property`
  const handleSortRequest = (property: keyof Semiconductor) => {
    const isAsc = orderBy === property && order === "asc";
    set_order(isAsc ? "desc" : "asc");
    set_orderBy(property);
  };

  // Fix: sortedData
  const sortedData = useMemo<Semiconductor[]>(() => {
    let data = datasets[datasetName] || [];
    data = data.sort(getComparator(order, orderBy));

    return displayAll ? data : data.slice(0, 4);
  }, [datasetName, displayAll, order, orderBy]);

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
            {sortedData.map((row, index) => (
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
              {datasets[datasetName].length}{" "}
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
