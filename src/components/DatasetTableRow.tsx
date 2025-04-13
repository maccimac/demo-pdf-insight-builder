import React from "react";
import { TableCell, TableRow } from "@mui/material";
import { semiconductorProps } from "../utils/semiconductorProps";
import { Semiconductor, SemiconductorProperty } from "@/types";

interface DatasetTableRowProps {
  row: Semiconductor;
}

const DatasetTableRow: React.FC<DatasetTableRowProps> = ({ row }) => {
  const formatDate = (rawDate: string) => {
    const date = new Date(rawDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <TableRow className="pdf-dataset-row">
      {Object.entries(semiconductorProps).map(
        ([key, semiCondProp]: [string, SemiconductorProperty]) => {
          if (key === "release_date") {
            return (
              <TableCell key={key}>{formatDate(row.release_date)}</TableCell>
            );
          } else if (key === "material") {
            return <TableCell key={key}>{row.material.join(", ")}</TableCell>;
          }
          return (
            <TableCell key={key}>
              {row[key as keyof Semiconductor]} {semiCondProp.unit}
            </TableCell>
          );
        }
      )}
    </TableRow>
  );
};

export default DatasetTableRow;
