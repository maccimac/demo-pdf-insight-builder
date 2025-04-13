import { MenuItem, Divider } from "@mui/material";
import { SemiconductorProperty } from "../types/index";
import { semiconductorProps } from "../utils/semiconductorProps";
import Selector from "../components/Selector";
import { useData } from "../contexts/DataContext";
import { SelectorItem } from "../types/index";

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
    <div className="pdf-insight-designer p-2 mt-5">
      <div className="select-a-chart">
        <Selector
          id="chart-type"
          value={chartType}
          setValue={set_chartType}
          items={chartTypes}
          label="Chart type"
        />
      </div>

      <Divider className="my-4" />

      <div className="mt-4">
        <Selector id="y-axis" value={yAxis} setValue={set_yAxis} label="Y-Axis">
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
        </Selector>
      </div>

      <div className="mt-4">
        <Selector id="x-axis" value={xAxis} setValue={set_xAxis} label="X-Axis">
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
        </Selector>
      </div>

      {/* <TextField
        value={myPetName}
        onChange={(e) => {
          setMyPetName(e.target.value);
        }}
      /> */}

      {/* */}
    </div>
  );
};

export default InsightDesigner;
