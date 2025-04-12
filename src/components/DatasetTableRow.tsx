import React from "react";
import { TableCell, TableRow } from "@mui/material";

import { Semiconductor } from "@/types";

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
      <TableCell>
        <strong className="">{row.model_name}</strong>
      </TableCell>
      <TableCell>{row.type}</TableCell>
      <TableCell className="mr-4">
        {row.volume_size_cm3} cm³ &nbsp; &nbsp; &nbsp; &nbsp;
      </TableCell>
      <TableCell>{row.material.join(", ")}</TableCell>
      <TableCell>
        {row.processing_power} GHz &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
      </TableCell>
      <TableCell>${row.cost_to_produce} &nbsp; &nbsp; &nbsp; &nbsp;</TableCell>
      <TableCell>{row.life_span_years} years</TableCell>
      <TableCell>{formatDate(row.release_date)}</TableCell>
    </TableRow>
  );
};

export default DatasetTableRow;
