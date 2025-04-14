import { semiconductorProps } from "@utils/semiconductorProps";
import { useEffect, useState } from "react";
import { Box, Slider } from "@mui/material";
import { FilterOptions } from "@/types";

interface PdfFilterRangeSliderProps {
  filter: FilterOptions;
  setFilter: Function;
  filterKey: keyof FilterOptions;
  initValue: number | number[];
  max: number
}

const PdfFilterRangeSlider: React.FC<PdfFilterRangeSliderProps> = ({
  filter,
  setFilter,
  filterKey,
  initValue,
  max
}) => {

  const [value, setValue] = useState<number[]>([0, max]);

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
    let val = initValue as number[];
    setValue(val);
  }, []);

  return (
    <div className="pdf-filter-ranger-slider mx-3 mt-3">
      <Box sx={{ width: 300 }}>
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={() => `${value[0]} - ${value[1]}`}
          min={0}
          max={max}
        />
      </Box>
    </div>
  );
};

export default PdfFilterRangeSlider;
