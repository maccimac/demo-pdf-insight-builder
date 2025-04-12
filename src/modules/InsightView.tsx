"use client";
import React from "react";
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
import { paramLabels } from "../utils/paramLabels";
import colors from "../utils/colors";
import { dataset_canada_2023 } from "../mock-data/dataset_canada_2023";

// interface InsightViewProps {
//   xKey: string;
//   yKey: string;
// }

// const InsightView: React.FC<InsightViewProps> = () => {
const InsightView: React.FC = () => {
  // const xKey = "cost_to_produce";
  // const yKey = "life_span_years";

  const yKey = "processing_power";
  const xKey = "cost_to_produce";

  // const yKey = "release_date";
  // const xKey = "volume_size_cm3";

  const sortedData = useMemo(() => {
    return [...dataset_canada_2023].sort((a, b) => a[xKey] - b[xKey]);
  }, [xKey]);

  return (
    <div className="pdf-insight-view mt-4 pa-4 mx-4">
      <div className="d-flex align-center">
        <div className="insight-title mb-2">
          <strong>{paramLabels[yKey].name}</strong>{" "}
          {paramLabels[yKey]?.unit ? `(${paramLabels[yKey].unit})` : null}
          {" "} and <strong>{paramLabels[xKey].name}</strong>{" "}
          {paramLabels[xKey]?.unit ? `(${paramLabels[xKey].unit})` : null}{" "}
         
        </div>
      </div>

      <div className="insight-container d-flex py-5 px-4">
        <div className="ykey-label__holder ">
          <div className="axis-label ykey-label">
            <div>
              <strong>{paramLabels[yKey].name} </strong>{" "}
              {/* {{paramLabels[yKey]?.unit && `(${paramLabels[yKey].unit})`} */}
            </div>
          </div>
        </div>
        <div className="w-100">
          <ResponsiveContainer width="100%" height={600}>
            <LineChart data={sortedData} margin={{ bottom: 32, right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <YAxis
                dataKey={yKey}
                tick={{ fill: colors["pdf-med"], fontSize: 9, fontWeight: 500 }}
                axisLine={{ stroke: colors["pdf-lightest"] }}
                tickLine={{ stroke: colors["pdf-med-light"] }}
              />
              <XAxis
                dataKey={xKey}
                axisLine={{ stroke: colors["pdf-lightest"] }}
                tickLine={{ stroke: colors["pdf-med-light"] }}
                tick={{ fill: colors["pdf-med"], fontSize: 9, fontWeight: 500 }}
              />

              <Line type="monotone" dataKey={yKey} stroke="#F6CB67" />
              <Tooltip content={<CustomTooltip xKey={xKey} yKey={yKey} />} />
              <Legend
                wrapperStyle={{
                  color: "#8D929C",
                  fontSize: "8px",
                  paddingTop: "32px",
                }}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="xkey-label__holder ma-0 px-0">
            <div className="axis-label xkey-label">
              {" "}
              <strong>{paramLabels[xKey].name} </strong>{" "}
              {paramLabels[xKey].unit ? `(${paramLabels[xKey].unit})` : null}{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CustomTooltipProps extends TooltipProps<number, string> {
  xKey: string;
  yKey: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  xKey,
  yKey,
}) => {
  console.log({ active, payload, label });
  if (active && payload && payload.length) {
    const semiconductorItem = payload[0]?.payload;
    return (
      <div className="pdf-tooltip p-2 flex flex-col gap-2 rounded-sm">
        <div className="label mb-2">
          {semiconductorItem.model_name} 
        </div>
        <div className="">
          <span className="label">
            {paramLabels[xKey as keyof typeof paramLabels].name} :
          </span>{" "}
          <span className="value ml-2">{semiconductorItem[xKey]}</span>
        </div>
        <div className="">
          <span className="label">
            {paramLabels[yKey as keyof typeof paramLabels].name} :
          </span>{" "}
          <span className="value ml-2">{semiconductorItem[yKey]}</span>
        </div>

        {payload[1] ? (
          <p className="text-sm text-indigo-400">
            {payload[1]?.attributeName}:{" "}
            <span className="ml-2">{payload[1]?.value}</span>
          </p>
        ) : null}
      </div>
    );
  }

  return null;
};

export default InsightView;
