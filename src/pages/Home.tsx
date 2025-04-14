import React from "react";
import YourInsight from "@modules/YourInsight";
import YourData from "@modules/YourData";

interface MyComponentProps {
  // Add your prop types here
}

const Home: React.FC<MyComponentProps> = () => {
  return (
    <div className="pdf-insight-builder__wrapper">
      <YourData />
      <YourInsight />
    </div>
  );
};

export default Home;
