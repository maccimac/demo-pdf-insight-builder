import colors from "@utils/colors";
import { MenuItem, Divider } from "@mui/material";
import { SemiconductorProperty, SelectorItem } from "./../types/index";
import { semiconductorProps } from "@utils/semiconductorProps";
import PdfSelector from "@components/PdfSelector";
import InsightTitleInput from "./InsightTitleInput";
import { useData } from "@contexts/DataContext";

const InsightDesigner = () => {
  const { chartType, set_chartType } = useData();
  const { yAxis, set_yAxis } = useData();
  const { xAxis, set_xAxis } = useData();

  const chartTypes: SelectorItem[] = [
    { text: "Line", value: "line" },
    { text: "Bar", value: "bar" },
    { text: "Scatter plot", value: "scatter" },
  ];

  const scParams: Record<string, SemiconductorProperty> = semiconductorProps;

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
        <PdfSelector id="y-axis" value={yAxis} setValue={set_yAxis} label="Y-Axis">
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
        <PdfSelector id="x-axis" value={xAxis} setValue={set_xAxis} label="X-Axis">
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

      <InsightTitleInput />
    </div>
  );
};

export default InsightDesigner;
