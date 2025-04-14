import React from "react";
import colors from "@utils/colors";
import Icon from "@mdi/react";
import { mdiFilter } from "@mdi/js";
import { Menu, Button } from "@mui/material";

interface PdfFilterItemProps {
  key: string;
  label?: string;
  onSelect?: (value: string) => void;
}

const PdfFilterItem: React.FC<PdfFilterItemProps> = ({
  key,
  label,
  onSelect,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value?: string) => {
    setAnchorEl(null);
    if (value && onSelect) {
      onSelect(value);
    }
  };

  return (
    <div className="pdf-filter-item">
      <Button
        variant="contained"
        className="filter-button"
        disableElevation
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
        Type is any
      </Button>
      <Menu
        id={`pdf-filter-menu-${key}`}
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        MenuListProps={{
          "aria-labelledby": `pdf-filter-Pdfbutton-${key}`,
        }}
      >
        
      </Menu>
    </div>
  );
};

export default PdfFilterItem;
