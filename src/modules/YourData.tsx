import React from "react";
import DatasetTable from "./DatasetTable";

interface YourDataProps {}

const YourData: React.FC<YourDataProps> = () => {
  return (
    <div className="pdf-your-data">
      {/* Select and preview your data */}
      <div className="container-fluid">
        <div className="row">
          <div className="col col-md-4">Select data</div>
          <div className="col col-md-8">
            <DatasetTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourData;
