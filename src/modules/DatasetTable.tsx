import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableSortLabel,
} from "@mui/material";
import { Semiconductor, SemiconductorProperty } from "@/types";
import PdfDatasetTableRow from "@components/PdfDatasetTableRow";
import { semiconductorProps } from "@utils/semiconductorProps";

interface PdfDatasetTableProps {
  displayData: Semiconductor[];
  orderBy: string;
  order: "asc" | "desc";
  handleSortRequest: (property: keyof Semiconductor) => void;
}

const PdfDatasetTable: React.FC<PdfDatasetTableProps> = ({
  displayData,
  orderBy,
  order,
  handleSortRequest,
}) => {
  return (
    <TableContainer>
      <Table>
        <TableHead className="no-border-head">
          {Object.entries(semiconductorProps).map(
            ([key, semiCondProp]: [string, SemiconductorProperty]) => (
              <TableCell key={key}>
                <TableSortLabel
                  active={orderBy === key}
                  direction={orderBy === key ? order : "asc"}
                  onClick={() => handleSortRequest(key as keyof Semiconductor)}
                >
                  {semiCondProp.name}
                </TableSortLabel>
              </TableCell>
            )
          )}
        </TableHead>
        <TableBody>
          {displayData.map((row, index) => (
            <PdfDatasetTableRow key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PdfDatasetTable;
