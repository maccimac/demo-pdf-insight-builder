import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableSortLabel,
  TableRow,
} from "@mui/material";
import { Semiconductor, SemiconductorProperty } from "@/types";
import PdfDatasetTableRow from "@components/PdfDatasetTableRow";
import { semiconductorProps } from "@utils/semiconductorProps";

interface DatasetTableProps {
  displayData: Semiconductor[];
  orderBy: string;
  order: "asc" | "desc";
  handleSortRequest: (property: keyof Semiconductor) => void;
}

const DatasetTable: React.FC<DatasetTableProps> = ({
  displayData,
  orderBy,
  order,
  handleSortRequest,
}) => {
  return (
    <div className="dataset-table">
      <TableContainer>
        <Table>
          <TableHead className="dataset-table-head">
            <TableRow>
              {Object.entries(semiconductorProps).map(
                ([key, semiCondProp]: [string, SemiconductorProperty]) => (
                  <TableCell key={key}>
                    <TableSortLabel
                      active={orderBy === key}
                      direction={orderBy === key ? order : "asc"}
                      onClick={() =>
                        handleSortRequest(key as keyof Semiconductor)
                      }
                    >
                      {semiCondProp.name}
                    </TableSortLabel>
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {displayData.map((row, index) => (
              <PdfDatasetTableRow key={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DatasetTable;
