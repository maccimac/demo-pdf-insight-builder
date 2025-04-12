"use client";
import React, { useState, useEffect } from "react";
import { useMemo } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  TooltipProps,
  Legend,
  ResponsiveContainer,
} from "recharts";

import colors from "../utils/colors";
import { dataset_canada_2023 } from "../mock-data/dataset_canada_2023";
import { useData } from "../contexts/DataContext";
import { semiconductorProps } from "../utils/semiconductorProps";
import { SemiconductorProperty } from "@/types";
// interface InsightViewProps {
//   xAxis: string;
//   yAxis: string;
// }

// const InsightView: React.FC<InsightViewProps> = () => {
const InsightView: React.FC = () => {
  // const { chartType, set_chartType } = useData();
  const { yAxis } = useData();
  const { xAxis } = useData();

  // const sortedData = useMemo(() => {
  //   return [...dataset_canada_2023].sort(
  //     (a, b) => Number(a[xAxis as keyof typeof a]) - Number(b[xAxis as keyof typeof b])
  //   );
  // }, [xAxis]);

  const [yAxisLabel, set_yAxisLabel] = useState<SemiconductorProperty>({
    name: "",
    unit: "",
  });
  const [xAxisLabel, set_xAxisLabel] = useState<SemiconductorProperty>({
    name: "",
    unit: "",
  });

  useEffect(() => {
    const y_fromMeta = semiconductorProps[yAxis];
    set_yAxisLabel(y_fromMeta ? y_fromMeta : { name: "", unit: "" });

    const x_fromMeta = semiconductorProps[xAxis];
    set_xAxisLabel(x_fromMeta ? x_fromMeta : { name: "", unit: "" });
  }, [yAxis, xAxis]);

  return (
    <div className="pdf-insight-view mt-4 pa-4 mx-4">
      <div className="d-flex align-center">
        {yAxis && xAxis && (
          <div className="insight-title mb-2">
            <strong>{semiconductorProps[yAxis]?.name}</strong>{" "}
            {semiconductorProps[yAxis]?.unit
              ? `(${semiconductorProps[yAxis].unit})`
              : null}{" "}
            and <strong>{xAxisLabel?.name}</strong>{" "}
            {xAxisLabel.unit && ` (${xAxisLabel.unit})`}
          </div>
        )}
      </div>
      <div className="insight-container pdf-shadow d-flex py-5 px-4">
        <div className="yAxis-label__holder ">
          <div className="axis-label yAxis-label">
            <div>
              <strong>{yAxisLabel?.name} </strong>{" "}
              {yAxisLabel?.unit &&
                `(${yAxisLabel.unit})`}
            </div>
          </div>
        </div>
        <div className="w-100">
          <ResponsiveContainer width="100%" height={600}>
            <LineChart
              data={dataset_canada_2023}
              margin={{ bottom: 32, right: 16 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <YAxis
                dataKey={yAxis}
                tick={{ fill: colors["pdf-med"], fontSize: 9, fontWeight: 500 }}
                axisLine={{ stroke: colors["pdf-lightest"] }}
                tickLine={{ stroke: colors["pdf-med-light"] }}
              />
              <XAxis
                dataKey={xAxis}
                axisLine={{ stroke: colors["pdf-lightest"] }}
                tickLine={{ stroke: colors["pdf-med-light"] }}
                tick={{ fill: colors["pdf-med"], fontSize: 9, fontWeight: 500 }}
              />

              <Line type="monotone" dataKey={yAxis} stroke="#F6CB67" />
              <Tooltip
                content={<CustomTooltip xAxis={xAxis} yAxis={yAxis} />}
              />
              <Legend
                wrapperStyle={{
                  color: "#8D929C",
                  fontSize: "8px",
                  paddingTop: "32px",
                }}
              />
            </LineChart>
          </ResponsiveContainer>

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
  );
};

interface CustomTooltipProps extends TooltipProps<number, string> {
  xAxis: string;
  yAxis: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  xAxis,
  yAxis,
}) => {
  console.log({ active, payload, label });
  if (active && payload && payload.length) {
    const semiconductorItem = payload[0]?.payload;
    return (
      <div className="pdf-tooltip p-2 flex flex-col gap-2 rounded-sm">
        <div className="label mb-2">{semiconductorItem.model_name}</div>

        {yAxis?.length && (
          <div className="">
            <span className="label">
              {
                semiconductorProps[yAxis as keyof typeof semiconductorProps]
                  ?.name
              }{" "}
              :
            </span>{" "}
            <span className="value ml-2">{semiconductorItem[yAxis]}</span>
          </div>
        )}

        {xAxis?.length && (
          <div className="">
            <span className="label">
              {
                semiconductorProps[xAxis as keyof typeof semiconductorProps]
                  ?.name
              }{" "}
              :
            </span>{" "}
            <span className="value ml-2">{semiconductorItem[xAxis]}</span>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default InsightView;
