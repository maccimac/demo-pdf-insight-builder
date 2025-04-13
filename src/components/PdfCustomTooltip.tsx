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
      <div className="pdf-tooltip p-2 flex flex-col gap-2 rounded-sm bg-white shadow-md border border-gray-200 text-sm">
        <div className="font-semibold text-base text-gray-800">
          {semiconductorItem.model_name}
        </div>

        {xAxis && (
          <div>
            <span className="text-gray-500">
              {semiconductorProps?.[xAxis]?.name || xAxis}:
            </span>{" "}
            <span className="ml-2 text-gray-700">
              {semiconductorItem[xAxis]}
            </span>
          </div>
        )}

        {yAxis && (
          <div>
            <span className="text-gray-500">
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
