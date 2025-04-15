import colors from "@utils/colors";
import {
  Divider,
  FormGroup,
  InputLabel,
  MenuItem,
  Switch,
  TextField,
} from "@mui/material";
import Icon from "@mdi/react";
import { InsightViewMeta, SemiconductorProperty, SelectorItem } from "@/types";
import { mdiContentSave } from "@mdi/js";
import { semiconductorProps } from "@utils/semiconductorProps";
import PdfButton from "@components/PdfButton";
import PdfColorPicker from "@components/PdfColorPicker";
import PdfSelector from "@components/PdfSelector";
import { useData } from "@contexts/DataContext";
import { useMemo, useState } from "react";

interface InsightDesignerProps {
  saveView: (value: InsightViewMeta) => void;
}
const InsightDesigner: React.FC<InsightDesignerProps> = ({ saveView }) => {
  const { viewsList } = useData();
  const { chartType, set_chartType } = useData();
  const { yAxis, set_yAxis } = useData();
  const { yColor, set_yColor } = useData();
  const { xAxis, set_xAxis } = useData();
  const { xIsNumber, set_xIsNumber } = useData();

  const chartTypes: SelectorItem[] = [
    { text: "Line", value: "line" },
    { text: "Bar", value: "bar" },
    { text: "Scatter plot", value: "scatter" },
  ];

  const scParams: Record<string, SemiconductorProperty> = semiconductorProps;

  const scParamsAxisX = useMemo(() => {
    const base: Record<string, string[]> = {
      bar: [
        "cost_to_produce",
        "processing_power",
        "life_span_years",
        "volume_size_cm3",
        "model_name",
      ],
      scatter: [
        "cost_to_produce",
        "processing_power",
        "life_span_years",
        "volume_size_cm3",
        "model_name",
        "release_date",
      ],
      line: [
        "cost_to_produce",
        "processing_power",
        "life_span_years",
        "volume_size_cm3",
        "release_date",
      ],
    };

    return Object.entries(semiconductorProps)
      .filter(([key]) => base[chartType]?.includes(key))
      .map(([key]) => key);
  }, [chartType]);

  const scParamsAxisY = useMemo(() => {
    return Object.entries(semiconductorProps)
      .filter(([key, prop]) => prop.dataType === "number")
      .map(([key]) => key);
  }, []);

  const [viewName, set_viewName] = useState<string>("");
  const [validationError, set_validationError] = useState<string>("");

  const saveNewInsight = () => {
    const insightView: InsightViewMeta = {
      name: viewName,
      params: {
        chartType,
        yAxis,
        xAxis,
        yColor,
      },
    };

    if (!viewName || !viewName.trim().length) {
      set_validationError("Name is required");
      return;
    }
    const isNotUnique = viewsList.some(
      (vl: InsightViewMeta) => vl.name === viewName
    );
    if (isNotUnique) {
      set_validationError(
        "An insight view with the same name has already been created"
      );
      return;
    } else {
      set_viewName("");
      saveView(insightView);
    }
  };

  return (
    <div className="pdf-insight-designer px-2 mb-2">
      <div className="section-title mb-3">Design your insight</div>
      <div className="select-a-chart mb-4 w-75">
        <PdfSelector
          id="chart-type"
          value={chartType}
          setValue={set_chartType}
          items={chartTypes}
          label="Chart type"
        />
      </div>
      <div className="mb-4 d-flex gap-4">
        <div className="w-50">
          <PdfSelector
            id="x-axis"
            value={xAxis}
            setValue={set_xAxis}
            label="X-axis"
          >
            {scParamsAxisX.map((key) => {
              const semi = semiconductorProps[key];
              return (
                <MenuItem key={key} value={key}>
                  {semi.name}
                </MenuItem>
              );
            })}
          </PdfSelector>
        </div>
        {chartType !== "bar" && (
          <FormGroup className="w-50">
            <InputLabel
              className="mb-0"
              shrink
              sx={{
                "&.MuiInputLabel-shrink": {
                  fontSize: "20px",
                },
              }}
            >
              How do you want to group your X-axis?
            </InputLabel>
            <div className="xisnumber-switch d-flex align-items-center">
              <small
                className={
                  xIsNumber
                    ? "text-color-pdf-med"
                    : "text-color-pdf-med-dark text-weight-500"
                }
              >
                Category
              </small>
              <Switch
                checked={xIsNumber}
                onChange={(e) => {
                  set_xIsNumber(e.target.checked);
                }}
              />

              <small
                className={
                  !xIsNumber
                    ? "text-color-pdf-med"
                    : "text-color-pdf-med-dark text-weight-500"
                }
              >
                Number
              </small>
            </div>
          </FormGroup>
        )}
      </div>

      <div className="mb-4 d-flex align-items-center gap-4">
        <div className="w-50">
          <PdfSelector
            id="y-axis"
            value={yAxis}
            setValue={set_yAxis}
            label="Y-axis"
          >
            {scParamsAxisY.map((key) => {
              const semi = semiconductorProps[key];

              if (
                typeof semi.dataType === "string" &&
                !["string", "array"].includes(semi.dataType)
              ) {
                return (
                  <MenuItem key={key} value={key}>
                    {semi.name}
                  </MenuItem>
                );
              }

              return null;
            })}
          </PdfSelector>
        </div>
        <div className="picker-holder">
          <PdfColorPicker setColor={set_yColor} />
        </div>
      </div>

      <Divider color={colors["pdf-med-light"]} className="mt-4 mb-3" />
      <div className="section-title mb-3">Save as new view</div>

      <div className="mb-3 d-flex gap-3">
        <TextField
          label="New insight name  "
          InputLabelProps={{ shrink: true }}
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
              color: colors["pdf-med-light"],
            },
            "& .MuiInputLabel-shrink": {
              color: colors["pdf-med"],
              fontSize: "20px",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              color: colors["pdf-blue-accent"],
              borderColor: colors["pdf-blue-accent"],
              borderWidth: "2px",
            },
            "&.MuiInputLabel-shrink": {
              fontSize: "20px",
            },
          }}
          onChange={(e) => {
            set_viewName(e.currentTarget.value);
            set_validationError("");
          }}
        />
        <PdfButton
          onClick={saveNewInsight}
          label="Save new"
          width="180px"
          sx={{ padding: "12px", lineHeight: "16px" }}
          icon={
            <Icon
              path={mdiContentSave}
              size="20px"
              color={colors["pdf-lightest"]}
            />
          }
        />
      </div>

      {/* <PdfButton
        onClick={saveNewInsight}
        width="25%"
        icon={
          <Icon
            path={mdiContentSave}
            size="20px"
            color={colors["pdf-lightest"]}
          />
        }
      /> */}
    </div>
  );
};

export default InsightDesigner;
