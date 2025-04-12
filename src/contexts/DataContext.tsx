import { createContext, useContext, useState } from "react";

const DataContext = createContext<any>(null);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState("initial");
  const [myPetName, setMyPetName] = useState("Pumpkin");

  return (
    <DataContext.Provider value={{ data, setData, myPetName, setMyPetName }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
}
