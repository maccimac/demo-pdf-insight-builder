import colors from "@utils/colors";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { ReactNode } from "react";
import { SelectorItem } from "@/types";
import { useData } from "@contexts/DataContext";

interface PdfSelectorProps<T = any> {
  id: string;
  value: T;
  setValue?: Function;
  label: string;
  items?: SelectorItem[];
  children?: ReactNode;
  renderSelected?: (value: T) => ReactNode;
  sx?: object;
}

const PdfSelector: React.FC<PdfSelectorProps> = ({
  id,
  value,
  setValue,
  label,
  items,
  children,
  renderSelected,
  sx,
}) => {
  const { darkMode } = useData();

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel
          sx={{
            "&.MuiInputLabel-shrink": {
              fontSize: "20px",
              color: darkMode && colors["pdf-light"],
            },
          }}
          id={id}
        >
          {label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label + "__"}
          onChange={(e) => {
            setValue && setValue(e.target.value);
          }}
          className="w-100"
          renderValue={renderSelected ? () => renderSelected(value) : undefined}
          sx={{
            color: colors["pdf-med-dark"],
            fontWeight: 500,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: colors["pdf-light"],
            },
            "& .MuiSelect-icon": {
              color: colors["pdf-med"],
            },
            "&:hover:": {
              color: colors["pdf-med-dark"],
            },

            "&.Mui-focused": {
              color: darkMode ? colors["pdf-light"] : colors["pdf-med-dark"],
            },
            "&.MuiInputLabel-shrink": {
              fontSize: "20px",
            },
            //
            borderColor: colors["pdf-light"],

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: colors["pdf-light"],
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: colors["pdf-light"],
            },
            //
            ...sx,
          }}
          MenuProps={{
            MenuListProps: {
              sx: {
                // backgroundColor: !darkMode
                //   ? colors["pdf-light"]
                //   : colors["pdf-med-dark"],
                // color: darkMode ? colors["pdf-light"] : colors["pdf-med-dark"],
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

export default PdfSelector;
