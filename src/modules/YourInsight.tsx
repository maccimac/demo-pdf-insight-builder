import colors from "@utils/colors";
import {
  Divider,
  MenuItem,
  IconButton,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import Icon from "@mdi/react";
import InsightView from "./InsightView";
import { InsightViewMeta } from "@/types";
import InsightDesigner from "./InsightDesigner";
import { mdiTrashCan } from "@mdi/js";
import PdfSelector from "@components/PdfSelector";
import PdfButton from "@components/PdfButton";
import { useData } from "@contexts/DataContext";
import { useEffect, useMemo, useState } from "react";

interface YourInsightProps {
  // Add your prop types here
}

const YourInsight: React.FC<YourInsightProps> = () => {
  const { viewsList, set_viewsList } = useData();
  const { set_chartType } = useData();
  const { set_yAxis } = useData();
  const { set_yColor } = useData();
  const { set_xAxis } = useData();
  const [selectedView, set_selectedView] = useState<string | null>(null);

  const saveView = (newView: InsightViewMeta) => {
    const updatedList = [...viewsList, newView];
    set_viewsList(updatedList);
    set_selectedView(newView.name);
    localStorage.setItem("pdf_views_list", JSON.stringify(updatedList));
  };

  const deleteView = (viewName: string) => {
    const updatedList = viewsList.filter(
      (v: InsightViewMeta) => v.name !== viewName
    );
    if (viewName == selectedView) {
      set_selectedView(null);
    }
    set_viewsList(updatedList);
    localStorage.setItem("pdf_views_list", JSON.stringify(updatedList));
  };

  const setCurrentView = (insightView: InsightViewMeta) => {
    if (insightView.params) {
      set_selectedView(insightView.name);
      set_chartType(insightView.params.chartType);
      set_yAxis(insightView.params.yAxis);
      set_xAxis(insightView.params.xAxis);
      set_yColor(insightView.params.yColor);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("pdf_views_list");
    const pdfViewsList: InsightViewMeta[] | null = stored
      ? JSON.parse(stored)
      : null;
    if (pdfViewsList?.length) {
      set_viewsList(pdfViewsList);
    }
  }, []);

  useEffect(() => {
    viewsList.map((vl: InsightViewMeta) => {
      if (vl.name === selectedView) {
        setCurrentView(vl);
      }
    });
  }, [selectedView]);

  return (
    <div className="pdf-your-insight p-4">
      <div className="container-fluid my-4">
        <div className="row">
          <div className="col-12 col-xl-8 order-2 order-xl-1">
            <InsightView></InsightView>
          </div>
          <div className="col-12 col-xl-4 order-1 order-xl-2">
            <div className="section-title mb-3">Your insights</div>
            <FormControl fullWidth>
              <InputLabel
                shrink={!!selectedView}
                sx={{
                  "&.MuiInputLabel-shrink": {
                    fontSize: "20px",
                  },
                }}
                id="select-view"
              >
                {selectedView ? "Select view" : null}
              </InputLabel>
              <Select
                id="select-view"
                label={selectedView ? "Select view" : undefined}
                value={selectedView}
                onChange={(e) => {
                  set_selectedView(e.target.value);
                }}
                sx={{
                  fontSize: selectedView && "24px",
                  color: selectedView
                    ? colors["pdf-blue-primary"]
                    : colors["pdf-med"],
                  fontWeight: selectedView && 1000,
                  "&.Mui-focused": {
                    color: colors["pdf-blue-primary"],
                  },
                  " .btn-delete-view": {
                    display: "none",
                  },
                }}
                displayEmpty
                renderValue={
                  selectedView
                    ? undefined
                    : () => {
                       return viewsList.length
                          ? "Select from saved view or create one below"
                          : "You have no saved views, create one below";
                      }
                }
              >
                {viewsList?.map((item: InsightViewMeta) => (
                  <MenuItem value={item.name}>
                    <div className="d-flex justify-content-between w-100">
                      <div> {item.name} </div>

                      <div className="btn-delete-view">
                        <IconButton
                          size="medium"
                          onClick={() => {
                            deleteView(item.name);
                          }}
                        >
                          <Icon
                            path={mdiTrashCan}
                            size="20px"
                            color="#DAA1A1"
                          />
                        </IconButton>
                      </div>
                    </div>
                  </MenuItem>
                ))}

                {!viewsList.length && (
                  <div className="text-color-pdf-med-light p-4">
                    Create a new insight view below
                  </div>
                )}
              </Select>
            </FormControl>

            <Divider color={colors["pdf-med-light"]} className="my-4" />

            <InsightDesigner saveView={saveView} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourInsight;
