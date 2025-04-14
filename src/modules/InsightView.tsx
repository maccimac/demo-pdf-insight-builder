import { datasets } from "@mock-data/datasets";
// import { TooltipProps } from "recharts";
import InsightChartScatter from "./charts/InsightChartScatter";
import { semiconductorProps } from "../utils/semiconductorProps";
import { SemiconductorProperty } from "@/types";
import { useState, useEffect } from "react";
import { useMemo } from "react";
import { useData } from "@contexts/DataContext";
import InsightChartBar from "./charts/InsightChartBar";

import InsightChartLine from "./charts/InsightChartLine";

const InsightView: React.FC = () => {
  const { datasetName } = useData();
  const { chartType } = useData();
  const { yAxis } = useData();
  const { xAxis } = useData();
  const { xIsNumber } = useData();

  const sortedData = useMemo(() => {
    if (xAxis === "model_name") {
      return datasets[datasetName].sort(
        (a, b) =>
          Number(a[yAxis as keyof typeof a]) -
          Number(b[yAxis as keyof typeof b])
      );
    }
    if (xAxis === "release_date") {
      return datasets[datasetName]?.sort((a, b) => {
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
    return datasets[datasetName]?.sort(
      (a, b) =>
        Number(a[xAxis as keyof typeof a]) - Number(b[xAxis as keyof typeof b])
    );
  }, [xAxis, datasetName]);

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
                xIsNumber={xIsNumber}
              />
            )}

            {chartType === "bar" && (
              <InsightChartBar data={sortedData} xAxis={xAxis} yAxis={yAxis} />
            )}

            {chartType === "line" && (
              <InsightChartLine
                data={sortedData}
                xAxis={xAxis}
                yAxis={yAxis}
                xIsNumber={xIsNumber}
              />
              // <ResponsiveContainer width="100%" height={600}>
              //   <LineChart data={sortedData} margin={{ bottom: 32, right: 16 }}>
              //     <CartesianGrid strokeDasharray="3 3" />
              //     <YAxis
              //       dataKey={yAxis}
              //       tick={{
              //         fill: colors["pdf-med"],
              //         fontSize: 11,
              //         fontWeight: 500,
              //       }}
              //       axisLine={{ stroke: colors["pdf-lightest"] }}
              //       tickLine={{ stroke: colors["pdf-med-light"] }}
              //     />
              //     <XAxis
              //       dataKey={xAxis}
              //       axisLine={{ stroke: colors["pdf-lightest"] }}
              //       tickLine={{ stroke: colors["pdf-med-light"] }}
              //       tickFormatter={(tick) =>
              //         xAxis === "release_date" ? formatDate(tick) : tick
              //       }
              //       tick={{
              //         fill: colors["pdf-med"],
              //         fontSize: 11,
              //         fontWeight: 500,
              //       }}
              //       type={xIsNumber ? "number" : "category"}
              //     />

              //     <Line type="monotone" dataKey={yAxis} stroke="#F6CB67" />
              //     <Tooltip
              //       content={<CustomTooltip xAxis={xAxis} yAxis={yAxis} />}
              //     />
              //     <Legend
              //       wrapperStyle={{
              //         color: "#8D929C",
              //         fontSize: "11px",
              //         paddingTop: "28px",
              //         marginBottom: "10px",
              //       }}
              //     />
              //   </LineChart>
              // </ResponsiveContainer>
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

// interface CustomTooltipProps extends TooltipProps<number, string> {
//   xAxis: string;
//   yAxis: string;
// }

// const CustomTooltip: React.FC<CustomTooltipProps> = ({
//   active,
//   payload,
//   label,
//   xAxis,
//   yAxis,
// }) => {
//   if (active && payload && payload.length) {
//     const semiconductorItem = payload[0]?.payload;
//     return (
//       <div className="pdf-tooltip p-2 flex flex-col gap-2 rounded-sm">
//         <div className="label mb-2">{semiconductorItem.model_name}</div>

//         {xAxis?.length && (
//           <div className="">
//             <span className="label">
//               {
//                 semiconductorProps[xAxis as keyof typeof semiconductorProps]
//                   ?.name
//               }{" "}
//               :
//             </span>{" "}
//             <span className="value ml-2">{semiconductorItem[xAxis]}</span>
//           </div>
//         )}

//         {yAxis?.length && (
//           <div className="">
//             <span className="label">
//               {
//                 semiconductorProps[yAxis as keyof typeof semiconductorProps]
//                   ?.name
//               }{" "}
//               :
//             </span>{" "}
//             <span className="value ml-2">{semiconductorItem[yAxis]}</span>
//           </div>
//         )}
//       </div>
//     );
//   }

//   return null;
// };

export default InsightView;
