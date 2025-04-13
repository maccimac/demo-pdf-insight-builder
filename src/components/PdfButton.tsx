import { Button } from "@mui/material";
import colors from "@utils/colors";
import Icon from "@mdi/react";
import { mdiArrowRight } from "@mdi/js";

interface PdfButtonProps {
  //
}

const PdfButton: React.FC<PdfButtonProps> = () => {
  return (
    <Button
      className="pdf-button"
      variant="contained"
      endIcon={
        <Icon
          path={mdiArrowRight}
          size="20px"
          color={colors["pdf-blue-primary"]}
        />
      }
    >
      Send
    </Button>
  );
};

export default PdfButton;
