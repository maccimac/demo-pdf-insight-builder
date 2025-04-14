import { semiconductorProps } from "@utils/semiconductorProps";
import { useEffect, useState } from "react";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { FilterOptions } from "@/types";

interface PdfFilterCheckboxesProps {
  filter: FilterOptions;
  setFilter: Function;
  filterKey: keyof FilterOptions;
  initValue: string[];
}

const PdfFilterCheckboxes: React.FC<PdfFilterCheckboxesProps> = ({
  filter,
  setFilter,
  filterKey,
  initValue,
}) => {
  const [value, setValue] = useState<(string | number)[]>([]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    opt: string
  ) => {
    if (event.target.checked) {
      setValue((prev) => [...prev, opt]);
    } else {
      setValue((prev) => prev.filter((v) => v !== opt));
    }
  };

  useEffect(() => {
    let val = initValue as string[];
    setValue(val);
  }, []);

  useEffect(() => {
    setFilter({
      ...filter,
      [filterKey]: value,
    });
  }, [value]);

  return (
    <div className="pdf-filter-checkboxes mx-3 mt-3">
      <FormGroup>
        {semiconductorProps[filterKey].filterOptions.map((opt: string) => (
          <FormControlLabel
            control={
              <Checkbox
                key={opt}
                checked={value.includes(opt)}
                onChange={(e) => {
                  handleChange(e, opt);
                }}
              />
            }
            label={opt}
          />
        ))}
      </FormGroup>
    </div>
  );
};

export default PdfFilterCheckboxes;
