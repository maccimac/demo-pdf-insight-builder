import { useEffect, useMemo, useState } from "react";
import colors from "@utils/colors";
import { getMinAndMax } from "@utils/utils";

import { Box, Slider } from "@mui/material";
import { FilterOptions, Semiconductor } from "@/types";
interface PdfFilterRangeSliderProps {
  filter: FilterOptions;
  setFilter: Function;
  filterKey: keyof FilterOptions;
  data: Semiconductor[];
}

const PdfFilterRangeSlider: React.FC<PdfFilterRangeSliderProps> = ({
  filter,
  setFilter,
  filterKey,
  data,
}) => {
  const [value, setValue] = useState<number[]>([5, 4]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setValue(newValue);

      setFilter({
        ...filter,
        [filterKey]: value,
      });
    }
  };

  useEffect(() => {
    console.log({ value, filter, filterKey });
  }, [value, filterKey]);
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={() => `${value[0]} - ${value[1]}`}
        min={0}
        max={20}
      />
    </Box>
  );
};

export default PdfFilterRangeSlider;
