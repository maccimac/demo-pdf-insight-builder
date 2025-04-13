import colors from "@utils/colors";
import { MenuItem, Divider, TextField } from "@mui/material";
import Icon from "@mdi/react";

import { InsightViewMeta, SemiconductorProperty, SelectorItem } from "@/types";
import { mdiContentSave } from "@mdi/js";
import { semiconductorProps } from "@utils/semiconductorProps";
import PdfButton from "@components/PdfButton";
import PdfSelector from "@components/PdfSelector";
import { useData } from "@contexts/DataContext";
import { useState } from "react";

interface InsightDesignerProps {
  saveView: (value: InsightViewMeta) => void;
  deleteView: (value: InsightViewMeta) => void;
}
const InsightDesigner: React.FC<InsightDesignerProps> = ({
  saveView,
  deleteView,
}) => {
  const { viewsList, set_viewsList } = useData();
  const { chartType, set_chartType } = useData();
  const { yAxis, set_yAxis } = useData();
  const { xAxis, set_xAxis } = useData();

  const chartTypes: SelectorItem[] = [
    { text: "Line", value: "line" },
    { text: "Bar", value: "bar" },
    { text: "Scatter plot", value: "scatter" },
  ];

  const scParams: Record<string, SemiconductorProperty> = semiconductorProps;

  const [viewName, set_viewName] = useState<string>("");
  const [validationError, set_validationError] = useState<string>("");

  const saveNewInsight = () => {
    // check if same name on insight
    const insightView: InsightViewMeta = {
      name: viewName,
      params: {
        chartType,
        yAxis,
        xAxis,
      },
    };

    const isNotUnique = viewsList.some(
      (vl: InsightViewMeta) => vl.name === viewName
    );
    if (isNotUnique) {
      set_validationError("An insight view with the same name has already been created");
      return;
    }else{
      set_viewName("");
      saveView(insightView);
    }

  };

  return (
    <div className="pdf-insight-designer p-2 mb-5">
      <div className="select-a-chart">
        <PdfSelector
          id="chart-type"
          value={chartType}
          setValue={set_chartType}
          items={chartTypes}
          label="Chart type"
        />
      </div>

      <Divider color={colors["pdf-med-light"]} className="my-4" />
      <div className="mb-4">
        <PdfSelector
          id="x-axis"
          value={xAxis}
          setValue={set_xAxis}
          label="X-Axis"
        >
          {Object.entries(scParams).map(
            ([key, semi]: [string, SemiconductorProperty]) => {
              if (
                typeof semi.dataType === "string" &&
                !["string", "array"].includes(semi.dataType)
              ) {
                return (
                  <MenuItem key={key} value={key}>
                    {semi.name}
                  </MenuItem>
                );
              } else {
                return "";
              }
            }
          )}
        </PdfSelector>
      </div>

      <div className="mb-4">
        <PdfSelector
          id="y-axis"
          value={yAxis}
          setValue={set_yAxis}
          label="Y-Axis"
        >
          {Object.entries(scParams).map(
            ([key, semi]: [string, SemiconductorProperty]) => {
              if (
                typeof semi.dataType === "string" &&
                !["string", "array"].includes(semi.dataType)
              ) {
                return (
                  <MenuItem key={key} value={key}>
                    {semi.name}
                  </MenuItem>
                );
              } else {
                return "";
              }
            }
          )}
        </PdfSelector>
      </div>

      <Divider color={colors["pdf-med-light"]} className="my-4" />

      {viewName}
      <br />
      <div className="d-flex gap-2">
        <TextField
          label="New insight name"
          variant="outlined"
          value={viewName}
          placeholder="Lifespan x Volume size"
          fullWidth
          error={!!validationError}
          helperText={validationError}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: colors["pdf-med-dark"],
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: colors["pdf-light"],
              },
            },
            "& .MuiInputLabel-root": {
              color: colors["pdf-med-light"], // label color when inactive
            },
            "& .MuiInputLabel-shrink": {
              color: colors["pdf-blue-accent"], // label color when active (shrunken/focused)
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              color: colors["pdf-blue-accent"],
              borderColor: colors["pdf-blue-accent"],
              borderWidth: "2px",
            },
          }}
          onChange={(e) => {
            set_viewName(e.currentTarget.value);
          }}
        />

        <PdfButton
          onClick={saveNewInsight}
          icon={
            <Icon
              path={mdiContentSave}
              size="20px"
              color={colors["pdf-lightest"]}
            />
          }
        />
      </div>
    </div>
  );
};

export default InsightDesigner;
