import InsightChartScatter from "./charts/InsightChartScatter";
import { semiconductorProps } from "../utils/semiconductorProps";
import { Semiconductor, SemiconductorProperty } from "@/types";
import { useState, useEffect } from "react";
import { useMemo } from "react";
import { useData } from "@contexts/DataContext";
import InsightChartBar from "./charts/InsightChartBar";

import InsightChartLine from "./charts/InsightChartLine";

const InsightView: React.FC = () => {
  const { datasetName } = useData();
  const { chartType } = useData();
  const { yAxis } = useData();
  const { yColor } = useData();
  const { xAxis } = useData();
  const { xIsNumber } = useData();
  const { filteredAndSortedData } = useData();

  const sortedData = useMemo(() => {
    const data: Semiconductor[] = filteredAndSortedData;
    if (xAxis === "model_name") {
      return data.sort(
        (a, b) =>
          Number(a[yAxis as keyof typeof a]) -
          Number(b[yAxis as keyof typeof b])
      );
    }
    if (xAxis === "release_date") {
      return data?.sort((a, b) => {
        const aVal =
          xAxis === "release_date"
            ? new Date(a.release_date).getTime()
            : Number(a[xAxis as keyof typeof a]);
        const bVal =
          xAxis === "release_date"
            ? new Date(b.release_date).getTime()
            : Number(b[xAxis as keyof typeof b]);
        return aVal - bVal;
      });
    }
    return data?.sort(
      (a, b) =>
        Number(a[xAxis as keyof typeof a]) - Number(b[xAxis as keyof typeof b])
    );
  }, [xAxis, datasetName, filteredAndSortedData]);

  const [yAxisLabel, set_yAxisLabel] = useState<SemiconductorProperty>({
    name: "",
    unit: "",
  });
  const [xAxisLabel, set_xAxisLabel] = useState<SemiconductorProperty>({
    name: "",
    unit: "",
  });

  const height = 460;
  useEffect(() => {
    const y_fromMeta = semiconductorProps[yAxis];
    set_yAxisLabel(y_fromMeta ? y_fromMeta : { name: "", unit: "" });

    const x_fromMeta = semiconductorProps[xAxis];
    set_xAxisLabel(x_fromMeta ? x_fromMeta : { name: "", unit: "" });
  }, [yAxis, xAxis]);

  return (
    <div className="pdf-insight-view">
      <div className="insight-container">
        <div className="d-flex align-center">
          {yAxis && xAxis && (
            <div className="insight-title mb-2">
              <strong>{xAxisLabel?.name}</strong>{" "}
              {xAxisLabel.unit && ` (${xAxisLabel.unit})`}
              &nbsp; and &nbsp; <strong>{yAxisLabel?.name}</strong>{" "}
              {yAxisLabel.unit && ` (${yAxisLabel.unit})`}
            </div>
          )}
        </div>

        <div className="d-flex mb-5">
          <div className="yAxis-label__holder ">
            <div className="axis-label yAxis-label">
              <div>
                <strong>{yAxisLabel?.name} </strong>{" "}
                {yAxisLabel?.unit && `(${yAxisLabel.unit})`}
              </div>
            </div>
          </div>
          <div className="w-100">
            {chartType === "scatter" && (
              <InsightChartScatter
                data={sortedData}
                xAxis={xAxis}
                yAxis={yAxis}
                yColor={yColor}
                xIsNumber={xIsNumber}
                height={height}
              />
            )}

            {chartType === "bar" && (
              <InsightChartBar
                data={sortedData}
                xAxis={xAxis}
                yAxis={yAxis}
                yColor={yColor}
                height={height}
              />
            )}

            {chartType === "line" && (
              <InsightChartLine
                data={sortedData}
                xAxis={xAxis}
                yAxis={yAxis}
                yColor={yColor}
                xIsNumber={xIsNumber}
                height={height}
              />
            )}

            <div className="xAxis-label__holder ma-0 px-0">
              <div className="axis-label xAxis-label">
                {" "}
                <strong>{xAxisLabel?.name} </strong>{" "}
                {xAxisLabel.unit && ` (${xAxisLabel.unit})`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightView;
