// import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  TextField,
  MenuItem,
  Divider,
} from "@mui/material";
import { SemiconductorProperty } from "../types/index";
import { semiconductorProps } from "../utils/semiconductorProps";
import { useData } from "../contexts/DataContext";

interface InsightDesignerProps {
  //
}

const InsightDesigner: React.FC<InsightDesignerProps> = () => {
  const { chartType, set_chartType } = useData();
  const { yAxis, set_yAxis } = useData();
  const { xAxis, set_xAxis } = useData();

  const scParams: Record<string, SemiconductorProperty> = semiconductorProps;

  return (
    <div className="pdf-insight-designer p-4">
      <div className="select-a-chart">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select a chart</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={chartType}
            label="Select a chart"
            onChange={(e) => {
              set_chartType(e.target.value);
            }}
            className="w-100"
          >
            <MenuItem value="line">Line</MenuItem>
            <MenuItem value="bar">Bar</MenuItem>
            <MenuItem value="scatter">Scatter</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Divider className="my-4" />
      <div className="mt-4">
        <FormControl fullWidth>
          <InputLabel id="y-axis">Y-Axis</InputLabel>
          <Select
            labelId="y-axis-label"
            id="y-axis"
            label="Y-Axis"
            value={yAxis}
            onChange={(e) => {
              set_yAxis(e.target.value);
            }}
            className="w-100"
          >
            {Object.entries(scParams).map(
              ([key, semi]: [string, SemiconductorProperty]) => {
                if (
                  typeof semi.dataType === "string" &&
                  !["string", "array"].includes(semi.dataType)
                ) {
                  return (
                    <MenuItem key={key} value={key}>
                      {semi.name}
                    </MenuItem>
                  );
                } else {
                  return "";
                }
              }
            )}
          </Select>
        </FormControl>
      </div>

      <div className="mt-4">
        <FormControl fullWidth>
          <InputLabel id="x-axis">X-Axis</InputLabel>
          <Select
            labelId="x-axis-label"
            id="x-axis"
            label="x-Axis"
            value={xAxis}
            onChange={(e) => {
              set_xAxis(e.target.value);
            }}
            className="w-100"
          >
            {Object.entries(scParams).map(
              ([key, semi]: [string, SemiconductorProperty]) => (
                <MenuItem key={key} value={key}>
                  {semi.name}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      </div>

      {/* <TextField
        value={myPetName}
        onChange={(e) => {
          setMyPetName(e.target.value);
        }}
      /> */}

      {/* */}
    </div>
  );
};

export default InsightDesigner;
