import React from "react";
import { MenuItem } from "@mui/material";
import { DatasetItemMeta } from "@/types";

interface DatasetItemProps extends DatasetItemMeta {
  onClick?: (value: string) => void;
}

const DatasetItem: React.FC<DatasetItemProps> = ({
  name,
  value,
  description,
  count,
  onClick,
}) => {
  return (
    <MenuItem value={value} onClick={()=>{
      onClick?.(value)
    }}>
      <h3>{name}</h3>
    </MenuItem>
  );
};

export default DatasetItem;
