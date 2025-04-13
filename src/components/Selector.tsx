import React, { ReactNode } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { SelectorItem } from "@/types";
import colors from "./../utils/colors";

interface SelectorProps<T = any> {
  id: string;
  value: T;
  setValue?: Function;
  label: string;
  items?: SelectorItem[];
  children?: ReactNode;
  renderSelected?: (value: T) => ReactNode;
}

const Selector: React.FC<SelectorProps> = ({
  id,
  value,
  setValue,
  label,
  items,
  children,
  renderSelected,
}) => {
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id={id}>{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={(e) => {
            setValue && setValue(e.target.value);
          }}
          className="w-100"
          renderValue={renderSelected ? () => renderSelected(value) : undefined}
          sx={{
            color: colors["pdf-med"],
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: colors["pdf-light"],
            },
            "& .MuiSelect-icon": {
              color: colors["pdf-med"],
            },
            "&:hover:": {
              color: colors["pdf-med-dark"],
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: colors["pdf-med-light"],
            },
            "&.Mui-focused": {
              color: colors["pdf-med-dark"],
            },
          }}
          MenuProps={{
            MenuListProps: {
              sx: {
                color: colors["pdf-med-dark"],
              },
            },
          }}
        >
          {items?.length
            ? items.map((item: SelectorItem) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.text}
                </MenuItem>
              ))
            : children}
        </Select>
      </FormControl>
    </div>
  );
};

export default Selector;
