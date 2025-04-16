import { createContext, useContext, useState } from "react";
import { InsightViewMeta, Semiconductor } from "@/types";

const DataContext = createContext<any>(null);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [chartType, set_chartType] = useState("line");
  const [yAxis, set_yAxis] = useState<string>("processing_power");
  const [yColor, set_yColor] = useState<string>("#F6CB67");
  const [xAxis, set_xAxis] = useState<string>("cost_to_produce");
  const [xIsNumber, set_xIsNumber] = useState<boolean>(true);
  const [datasetName, set_datasetName] = useState<string>(
    "dataset_canada_2023"
  );
  const [filteredAndSortedData, set_filteredAndSortedData] = useState<
    Semiconductor[]
  >([]);

  const [viewsList, set_viewsList] = useState<InsightViewMeta[]>([]);

  const [darkMode, set_darkMode] = useState<boolean>(false);

  return (
    <DataContext.Provider
      value={{
        chartType,
        set_chartType,
        yAxis,
        set_yAxis,
        yColor,
        set_yColor,
        xAxis,
        set_xAxis,
        datasetName,
        set_datasetName,
        viewsList,
        set_viewsList,
        xIsNumber,
        set_xIsNumber,
        filteredAndSortedData,
        set_filteredAndSortedData,

        darkMode,
        set_darkMode,
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
