import { TextField } from "@mui/material";
import PdfButton from "./../components/PdfButton";
interface InsightTitleInputProps {
  //
}

const InsightTitleInput: React.FC<InsightTitleInputProps> = () => {
  return (
    <div className="pdf-insight-title-input">
      <TextField label="Helper text" defaultValue="Default Value" />
      <PdfButton/>
    </div>
  );
};

export default InsightTitleInput;
