import React from "react";
import DatasetSelector from "./DatasetSelector";

interface DatasetInfoProps {
  // Add your prop types here
}

const DatasetInfo: React.FC<DatasetInfoProps> = () => {
  return (
    <div className="d-flex align-items-center h-100">
      <div>
        <div className="section-title mb-3">Your data</div>
        <DatasetSelector />
      </div>
    </div>
  );
};

export default DatasetInfo;
