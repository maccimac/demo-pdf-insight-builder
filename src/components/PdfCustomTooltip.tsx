import React from "react";
import { TooltipProps } from "recharts";
import colors from "@utils/colors";
import { semiconductorProps } from "@utils/semiconductorProps";

interface PdfChartTooltipProps extends TooltipProps<number, string> {
  xAxis: string;
  yAxis: string;
}

const PdfChartTooltip: React.FC<PdfChartTooltipProps> = ({
  active,
  payload,
  xAxis,
  yAxis,
}) => {
  if (active && payload && payload.length) {
    const semiconductorItem = payload[0].payload;

    return (
      <div className="pdf-tooltip p-3 flex flex-col gap-2 rounded-sm  pdf-shadow text-sm">
        <div className="text-weight-700 text-color-pdf-lightest mb-2">
          {semiconductorItem.model_name}
        </div>

        {xAxis && (
          <div className="text-color-pdf-med">
            <span className="text-weight-700">
              {semiconductorProps?.[xAxis]?.name || xAxis}:
            </span>{" "}
            <span className="ml-2 ">{semiconductorItem[xAxis]}</span>
          </div>
        )}

        {yAxis && (
          <div className="text-color-pdf-med">
            <span className="text-weight-700">
              {semiconductorProps?.[yAxis]?.name || yAxis}:
            </span>{" "}
            <span className="ml-2 text-gray-700">
              {semiconductorItem[yAxis]}
            </span>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default PdfChartTooltip;
