import React from "react";
import InsightView from "./InsightView";
import InsightDesigner from "./InsightDesigner";

interface YourInsightProps {
  // Add your prop types here
}

const YourInsight: React.FC<YourInsightProps> = () => {
  return (
    <div className="pdf-your-insight">
      <div className="container-fluid">
        <div className="row px-4 mx-4">
          <div className="col col-md-8">
            {/* ViewSelector */}
            <InsightView></InsightView>
          </div>
          <div className="col col-md-4">
            <InsightDesigner />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourInsight;
