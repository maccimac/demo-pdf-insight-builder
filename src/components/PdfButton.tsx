import React, { ReactNode } from "react";
import { Button, ButtonProps } from "@mui/material";
import Icon from "@mdi/react";
import { mdiArrowRight } from "@mdi/js";
import colors from "@utils/colors";

interface PdfButtonProps extends ButtonProps {
  label?: string;
  icon?: React.ReactNode;
  height?: number;
  width?: number | string | null;
  fontSize?: number;
  backgroundColor?: string;
  children?: ReactNode;
  sx?: object,
}

const PdfButton: React.FC<PdfButtonProps> = ({
  label = "Save",
  icon,
  endIcon,
  color = colors["pdf-lightest"],
  size = "large",
  height = 56,
  width = null,
  fontSize = 16,
  backgroundColor = colors["pdf-blue-accent"],
  sx,
  children,
  ...props
}) => {
  return (
    <Button
      variant="contained"
      className="pdf-button"
      disableElevation
      size={size}
      endIcon={
        endIcon ??
        icon ?? (
          <Icon
            path={mdiArrowRight}
            size="20px"
            color={colors["pdf-lightest"]}
          />
        )
      }
      sx={{
        height,
        width,
        fontSize, // text size (e.g., 14px)
        color: colors["pdf-lightest"], // text color
        textTransform: "none", // optional: disables UPPERCASE
        px: 4, // optional: horizontal padding
        backgroundColor,
        ...sx,
      }}
      {...props}
    >
      <div className="d-block">
      {children ? children : label}
      </div>
    </Button>
  );
};

export default PdfButton;
