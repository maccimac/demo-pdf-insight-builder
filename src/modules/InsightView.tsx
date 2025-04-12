"use client";
import React from "react";
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
import { paramLabels } from "../utils/paramLabels";
import colors from "../utils/colors";
import { dataset_canada_2023 } from "../mock-data/dataset_canada_2023";

// interface InsightViewProps {
//   xKey: string;
//   yKey: string;
// }

// const InsightView: React.FC<InsightViewProps> = () => {
const InsightView: React.FC = () => {
  const xKey = "life_span_years";
  const yKey = "processing_power"; // try switching with "cost_to_produce"

  return (
    <div className="pdf-insight-view mt-4 pa-4 mx-4">
      <div className="d-flex align-center">
        <div className="insight-title mb-2">
          <strong>{paramLabels[xKey].name}</strong>{" "}
          {paramLabels[xKey].unit ? `(${paramLabels[xKey].unit})` : null} and{" "}
          <strong>{paramLabels[yKey].name}</strong>{" "}
          {paramLabels[xKey].unit ? `(${paramLabels[yKey].unit})` : null}
        </div>
      </div>
      <div className="insight-container d-flex py-5">
        <div className="xkey-label__holder ma-0 px-0">
          <div className="xkey-label">{paramLabels[xKey].name}</div>
        </div>

        <ResponsiveContainer width="100%" height={600}>
          <LineChart
            data={dataset_canada_2023}
            margin={{ top: 16, bottom: 24, left: 16, right: 16 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={xKey}
              axisLine={{ stroke: colors["pdf-lightest"] }}
              tickLine={{ stroke: colors["pdf-med-light"] }}
              tick={{ fill: colors["pdf-med"], fontSize: 9, fontWeight: 500 }}
            />
            <YAxis
              tick={{ fill: colors["pdf-med"], fontSize: 9, fontWeight: 500 }}
              axisLine={{ stroke: colors["pdf-lightest"] }}
              tickLine={{ stroke: colors["pdf-med-light"] }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{
                color: "#8D929C",
                fontSize: "8px",
              }}
              margin={{ top: 24 }}
            />
            <Line type="monotone" dataKey={yKey} stroke="#F6CB67" />
            {/* <Line
                type="monotone"
                dataKey="life_span_years"
                stroke="#82ca9d"
              /> */}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
  label,
}) => {
  console.log({ active, payload, label });
  if (active && payload && payload.length) {
    return (
      <div className="pdf-tooltip p-2 flex flex-col gap-2 rounded-sm">
        <div className="label">{label}</div>
        <div className="text-sm text-blue-400">
          <span className="label">{payload[0]?.name}:</span>{" "}
          <span className="value ml-2">${payload[0].value}</span>
        </div>
        {payload[1] ? (
          <p className="text-sm text-indigo-400">
            {payload[1]?.attributeName}:{" "}
            <span className="ml-2">${payload[1]?.value}</span>
          </p>
        ) : null}
      </div>
    );
  }

  return null;
};

export default InsightView;
