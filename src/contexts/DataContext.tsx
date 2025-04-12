import { createContext, useContext, useState } from "react";

const DataContext = createContext<any>(null);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [chartType, set_chartType] = useState("line");
  const [yAxis, set_yAxis] = useState<string>("processing_power");
  const [xAxis, set_xAxis] = useState<string>("cost_to_produce");
  const [datasetName, set_datasetName] = useState<string>(
    "advan_featured"
  );

  return (
    <DataContext.Provider
      value={{
        chartType,
        set_chartType,

        yAxis,
        set_yAxis,

        xAxis,
        set_xAxis,

        datasetName,
        set_datasetName,
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
