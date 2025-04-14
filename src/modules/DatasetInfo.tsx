import React from "react";
import DatasetSelector from "./DatasetSelector";

interface DatasetInfoProps {
  // Add your prop types here
}

const DatasetInfo: React.FC<DatasetInfoProps> = () => {

  
  return (
    <div className="mt-5">
      <div className="section-title mb-3">
        Your data
      </div>
      <DatasetSelector/>
    </div>
  );
};

export default DatasetInfo;
