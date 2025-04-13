import React from "react";
import { formatDate } from "@utils/utils";
import { semiconductorProps } from "@utils/semiconductorProps";
import { Semiconductor, SemiconductorProperty } from "@/types";
import { TableCell, TableRow } from "@mui/material";

interface DatasetTableRowProps {
  row: Semiconductor;
}

const PdfDatasetTableRow: React.FC<DatasetTableRowProps> = ({ row }) => {
  return (
    <TableRow className="pdf-dataset-row">
      {Object.entries(semiconductorProps).map(
        ([key, semiCondProp]: [string, SemiconductorProperty]) => {
          if (key === "release_date") {
            return (
              <TableCell className={key} key={key}>
                {formatDate(row.release_date)}
              </TableCell>
            );
          } else if (key === "material") {
            return (
              <TableCell className={key} key={key}>
                {row.material.join(", ")}
              </TableCell>
            );
          }
          return (
            <TableCell className={key} key={key}>
              {row[key as keyof Semiconductor]} {semiCondProp.unit}
            </TableCell>
          );
        }
      )}
    </TableRow>
  );
};

export default PdfDatasetTableRow;
