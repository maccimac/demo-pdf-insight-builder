import React, { useState } from "react";
import { Popover } from "@mui/material";
import { SketchPicker } from "react-color";
import Icon from "@mdi/react";
import { mdiPalette } from "@mdi/js";

interface PdfColorPickerProps {
  setColor?: Function;
}
const PdfColorPicker: React.FC<PdfColorPickerProps> = ({ setColor }) => {
  const [color, setColorInner] = useState<string>("#F6CB67");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const id = open ? "pdf-color-picker-popover" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="pdf-color-picker">
      <div
        className="btn-trigger "
        style={{
          borderColor: color,
          color,
        }}
        onClick={handleClick}
      >
        <Icon path={mdiPalette} size="20px" color={color} />
        <div
          className="color-label"
          style={{
            color,
          }}
        >
          {color}
        </div>
      </div>

      {/* Popover */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          style: { padding: 16 },
        }}
      >
        <SketchPicker
          color={color}
          onChangeComplete={(c) => {
            setColorInner(c.hex);
            setColor && setColor(c.hex);
            handleClose();
          }}
        />
      </Popover>
    </div>
  );
};

export default PdfColorPicker;
