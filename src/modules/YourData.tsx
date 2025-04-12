import React from "react";

interface YourDataProps {
  
}

const YourData: React.FC<YourDataProps> = () => {
  return (
    <div className="pdf-your-data">
      {/* Select and preview your data */}
      <div className="container">
        <div className="row">
          <div className="col col-md-4">Select data</div>
          <div className="col col-md-8">View data</div>
        </div>
      </div>
    </div>
  );
};

export default YourData;
