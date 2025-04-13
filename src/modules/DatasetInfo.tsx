import React from "react";
import DatasetSelector from "./DatasetSelector";

interface DatasetInfoProps {
  // Add your prop types here
}

const DatasetInfo: React.FC<DatasetInfoProps> = () => {

  
  return (
    <div className="mt-5">
      <DatasetSelector/>
    </div>
  );
};

export default DatasetInfo;
