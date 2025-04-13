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
}

const PdfButton: React.FC<PdfButtonProps> = ({
  label = "Save",
  icon,
  endIcon,
  color = colors["pdf-lightest"],
  size = "large",
  height = 56,
  width = 120,
  fontSize = 16,
  backgroundColor = colors["pdf-blue-accent"],
  children,
  ...props
}) => {
  return (
    <Button
      variant="contained"
      className="pdf-button"
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
      }}
      {...props}
    >
      {children ? children : label}
    </Button>
  );
};

export default PdfButton;
