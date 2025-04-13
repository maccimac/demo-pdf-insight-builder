import React from "react";
import { MenuItem } from "@mui/material";
import { DatasetItemMeta } from "@/types";

interface DatasetItemProps extends DatasetItemMeta {
  onClick?: (value: string) => void;
  isFavorite?: boolean;
}

const DatasetItem: React.FC<DatasetItemProps> = ({
  name,
  value,
  description,
  count,
  onClick,
}) => {
  return (
    <MenuItem
      className="pdf-dataset-item"
      value={value}
      onClick={() => {
        onClick?.(value);
      }}
      disableRipple
      sx={{
        "&:hover": {
          backgroundColor: "transparent", 
        },
        whiteSpace: "normal",       
        alignItems: "flex-start",  
        paddingY: 1.5,    
      }}
    >
      <div className="meta-holder">
        <div className="dataset-title">{name}</div>
        <i className="fa-solid fa-regular fa-xmark fa-md m-1 text-color-sq-green-black" />
        <div className="dataset-meta">{count} datasets</div>
        <p className="dataset-description">{description}</p>
      </div>
    </MenuItem>
  );
};

export default DatasetItem;
