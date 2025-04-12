import React, { useMemo, useState } from "react";
import { datasets } from "../mock-data/datasets";
import { useData } from "../contexts/DataContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  // TableRow,
  // Paper,
  TableSortLabel,
  Button,
} from "@mui/material";
import DatasetTableRow from "./../components/DatasetTableRow";

interface DatasetTableProps {}

const DatasetTable: React.FC<DatasetTableProps> = () => {
  const { datasetName } = useData();

  const [displayAll, set_displayAll] = useState<boolean>(false);
  // Sorting logic
  // function descendingComparator(a, b, orderBy) {
  //   if (b[orderBy] < a[orderBy]) return -1;
  //   if (b[orderBy] > a[orderBy]) return 1;
  //   return 0;
  // }

  // function getComparator(order, orderBy) {
  //   return order === "desc"
  //     ? (a, b) => descendingComparator(a, b, orderBy)
  //     : (a, b) => -descendingComparator(a, b, orderBy);
  // }

  const sortedData = useMemo(() => {
    const data = datasets[datasetName] || [];
    return displayAll ? data : data.slice(0, 4);
  }, [datasetName, displayAll]);

  return (
    <div className="pdf-dataset-table">
      <TableContainer>
        <Table>
          <TableBody className="">
            {sortedData.map((row, index) => (
              <DatasetTableRow row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        onClick={() => {
          set_displayAll(!displayAll);
        }}
      >
        {displayAll ? "Collapse" : "Display all"}
      </Button>
    </div>
  );
};

export default DatasetTable;
