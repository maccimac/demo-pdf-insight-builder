import React, { ReactNode } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { SelectorItem } from "@/types";

interface SelectorProps<T = any> {
  id: string;
  value: T;
  setValue: Function;
  label: string;
  items: SelectorItem[];
  children?: ReactNode;
}

const Selector: React.FC<SelectorProps> = ({
  id,
  value,
  setValue,
  label,
  items,
  children,
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
            setValue(e.target.value);
          }}
          className="w-100"
        >
          {items.length &&
            items?.map((item: SelectorItem) => (
              <MenuItem key={item.value} value={item.value}>
                {item.text}
              </MenuItem>
            ))}

          {children}
        </Select>
      </FormControl>
    </div>
  );
};

export default Selector;
