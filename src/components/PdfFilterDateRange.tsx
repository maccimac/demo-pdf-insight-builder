import { FilterOptions } from "@/types";
import { useEffect, useState } from "react";
import { TextField, InputLabel } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface PdfFilterDateRangeProps {
  filter: FilterOptions;
  setFilter: Function;
  filterKey: keyof FilterOptions;
  initValue: string[];
}

const isValidDate = (d: any): d is Date => {
  return d instanceof Date && !isNaN(d.getTime());
};

const parseDateSafe = (dateString: string): Date | null => {
  const date = new Date(dateString);
  return isValidDate(date) ? date : null;
};

const PdfFilterDateRange: React.FC<PdfFilterDateRangeProps> = ({
  filter,
  setFilter,
  filterKey,
  initValue,
}) => {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const [start, end] = value;

  useEffect(() => {
    if (initValue?.length === 2) {
      const val: [Date | null, Date | null] = [
        parseDateSafe(initValue[0]),
        parseDateSafe(initValue[1]),
      ];
      setValue(val);
    }
  }, [initValue]);

  useEffect(() => {
    if (!isValidDate(start) || !isValidDate(end)) return;

    const formattedRange: [string, string] = [
      start.toISOString().split("T")[0],
      end.toISOString().split("T")[0],
    ];

    const currentValue = filter[filterKey] as [string, string];

    if (
      !currentValue ||
      currentValue[0] !== formattedRange[0] ||
      currentValue[1] !== formattedRange[1]
    ) {
      setFilter({
        ...filter,
        [filterKey]: formattedRange,
      });
    }
  }, [start, end]);

  return (
    <div className="pdf-filter-checkboxes mx-3 mt-3">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="d-block">
          <DatePicker
            label="Start date"
            value={start}
            onChange={(newStart) => setValue([newStart, end])}
            slots={{ textField: TextField }}
            slotProps={{ textField: { size: "small" } }}
          />
          <InputLabel
            className="mb-0 mx-3 pt-2 text-center"
            shrink
            sx={{
              "&.MuiInputLabel-shrink": {
                fontSize: "20px",
              },
            }}
          >
            up to
          </InputLabel>
          <DatePicker
            label="End date"
            value={end}
            onChange={(newEnd) => setValue([start, newEnd])}
            slots={{ textField: TextField }}
            slotProps={{ textField: { size: "small" } }}
          />
        </div>
      </LocalizationProvider>
    </div>
  );
};

export default PdfFilterDateRange;
