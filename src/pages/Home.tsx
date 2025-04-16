import React from "react";
import { FormGroup, InputLabel, Switch } from "@mui/material";
import YourInsight from "@modules/YourInsight";
import YourData from "@modules/YourData";
import { useData } from "@contexts/DataContext";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const { darkMode, set_darkMode } = useData();
  return (
    <div
      className={
        darkMode
          ? "dark-mode pdf-insight-builder__wrapper"
          : "pdf-insight-builder__wrapper"
      }
    >
      <YourData />
      <YourInsight />
      <div className="dark-mode-controller">
        <FormGroup className="">
          <div className="d-flex align-items-center">
            <InputLabel
              className="mt-2"
              shrink
              sx={{
                "&.MuiInputLabel-shrink": {
                  fontSize: "20px",
                },
              }}
            >
              Dark mode
            </InputLabel>

            <small
              className={
                darkMode
                  ? "text-color-pdf-med"
                  : "text-color-pdf-med text-weight-500"
              }
            >
              Off
            </small>
            <Switch
              checked={darkMode}
              onChange={(e) => {
                set_darkMode(e.target.checked);
              }}
            />

            <small
              className={
                !darkMode
                  ? "text-color-pdf-med"
                  : "text-color-pdf-med text-weight-500"
              }
            >
              On
            </small>
          </div>
        </FormGroup>
      </div>
    </div>
  );
};

export default Home;
