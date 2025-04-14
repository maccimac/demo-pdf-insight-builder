import React from "react";
import DatasetTableWrapper from "./DatasetTableWrapper";
import DatasetInfo from "./DatasetInfo";

interface YourDataProps {}

const YourData: React.FC<YourDataProps> = () => {
  return (
    <div className="pdf-your-data p-4">
      <div className="container-fluid">
        <div className="row">
          <div className="col col-xl-4 ">
            <DatasetInfo />
          </div>
          <div className="col col-xl-8 mt-4 mt-xl-0">
            <DatasetTableWrapper />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourData;
