import { createContext, useContext, useState } from "react";
import { InsightViewMeta } from "@/types";

const DataContext = createContext<any>(null);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [chartType, set_chartType] = useState("line");
  const [yAxis, set_yAxis] = useState<string>("processing_power");
  const [xAxis, set_xAxis] = useState<string>("cost_to_produce");
  const [xIsNumber, set_xIsNumber] = useState<boolean>(true);
  
  const [datasetName, set_datasetName] = useState<string>(
    "dataset_canada_2023"
  );

  const [viewsList, set_viewsList] = useState<InsightViewMeta[]>([
    {
      name: "Processing power by production cost",
      params: {
        chartType: "line",
        xAxis: "processing_power",
        yAxis: "cost_to_produce", 
      },
    },
  ]);

  return (
    <DataContext.Provider
      value={{
        chartType, set_chartType,
        yAxis,set_yAxis,
        xAxis, set_xAxis,
        datasetName, set_datasetName,
        viewsList, set_viewsList,
        xIsNumber, set_xIsNumber
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context)
    throw new Error("useChartData must be used within a DataProvider");
  return context;
}
