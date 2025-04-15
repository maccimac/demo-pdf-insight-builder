import colors from "@utils/colors";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import PdfChartTooltip from "@components/PdfCustomTooltip";
import { formatDate } from "@utils/utils";
import { InsightViewParameter } from "@/types";

interface InsightChartLineProps extends InsightViewParameter {
  height?: number;
}

const InsightChartLine: React.FC<InsightChartLineProps> = ({
  data,
  xAxis,
  yAxis,
  xIsNumber,
  yColor = "#F6CB67",
  height = 560,
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ bottom: 32, right: 16 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis
          dataKey={yAxis}
          tick={{
            fill: colors["pdf-med"],
            fontSize: 11,
            fontWeight: 500,
          }}
          axisLine={{ stroke: colors["pdf-lightest"] }}
          tickLine={{ stroke: colors["pdf-med-light"] }}
        />
        <XAxis
          dataKey={xAxis}
          axisLine={{ stroke: colors["pdf-lightest"] }}
          tickLine={{ stroke: colors["pdf-med-light"] }}
          tickFormatter={(tick) =>
            xAxis === "release_date" ? formatDate(tick) : tick
          }
          tick={{
            fill: colors["pdf-med"],
            fontSize: 11,
            fontWeight: 500,
          }}
          type={xIsNumber ? "number" : "category"}
        />

        <Line type="monotone" dataKey={yAxis} stroke={yColor} />
        <Tooltip content={<PdfChartTooltip xAxis={xAxis} yAxis={yAxis} />} />
        <Legend
          wrapperStyle={{
            color: "#8D929C",
            fontSize: "11px",
            paddingTop: "28px",
            marginBottom: "10px",
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default InsightChartLine;
