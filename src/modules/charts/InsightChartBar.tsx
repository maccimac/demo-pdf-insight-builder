import colors from "@utils/colors";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import PdfChartTooltip from "@components/PdfCustomTooltip";
import { InsightViewParameter } from "@/types";

const InsightChartBar: React.FC<InsightViewParameter> = ({
  data,
  xAxis,
  yAxis,
  xIsNumber,
  yColor = "#F6CB67",
}) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ bottom: 32, right: 16 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={xAxis}
          name={xAxis}
          axisLine={{ stroke: colors["pdf-lightest"] }}
          tickLine={{ stroke: colors["pdf-med-light"] }}
          tick={{
            fill: colors["pdf-med"],
            fontSize: 11,
            fontWeight: 500,
          }}
        />
        <YAxis
          dataKey={yAxis}
          name={yAxis}
          tick={{
            fill: colors["pdf-med"],
            fontSize: 11,
            fontWeight: 500,
          }}
          axisLine={{ stroke: colors["pdf-lightest"] }}
          tickLine={{ stroke: colors["pdf-med-light"] }}
        />
        <Tooltip content={<PdfChartTooltip xAxis={xAxis} yAxis={yAxis} />} />
        <Legend
          wrapperStyle={{
            color: yColor,
            fontSize: "11px",
            paddingTop: "28px",
            marginBottom: "10px",
          }}
        />
        <Bar dataKey={yAxis} name="Bar Chart" fill={yColor} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default InsightChartBar;
