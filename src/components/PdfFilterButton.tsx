import React, { ReactNode } from "react";
import colors from "@utils/colors";
import Icon from "@mdi/react";
import { mdiFilter } from "@mdi/js";
import { Menu, Button } from "@mui/material";
import { FilterOptions } from "@/types";

interface PdfFilterButtonProps {
  filterKey: keyof FilterOptions;
  label?: ReactNode;
  // onSelect?: (value: string) => void;
  children: ReactNode;
}

const PdfFilterButton: React.FC<PdfFilterButtonProps> = ({
  label,
  // onSelect,
  children,
  filterKey,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value?: string) => {
    setAnchorEl(null);
    // if (value && onSelect) {
    //   // onSelect(value);
    // }
  };

  return (
    <div className="pdf-filter-item">
      <Button
        variant="contained"
        className="filter-button"
        disableElevation
        onClick={handleClick} 
        sx={{
          color: colors["pdf-blue-muted-medium"],
          fontSize: "12px",
          "&:hover": {
            backgroundColor: colors["pdf-light"], // or your preferred hover bg
          },
        }}
        startIcon={
          <Icon
            path={mdiFilter}
            size="16px"
            color={colors["pdf-blue-muted-medium"]}
          />
        }
      >
        <span></span>
        {label}
      </Button>
      <Menu
        id={`pdf-filter-menu-${filterKey}`}
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        MenuListProps={{
          "aria-labelledby": `pdf-filter-Pdfbutton-${filterKey}`,
        }}
      >
        
        <div
        className="p-2"
        >{children}</div>
      </Menu>
    </div>
  );
};

export default PdfFilterButton;
