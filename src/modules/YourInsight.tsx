import colors from "@utils/colors";
import { Divider } from "@mui/material";
import InsightView from "./InsightView";
import { InsightViewMeta } from "@/types";
import InsightDesigner from "./InsightDesigner";
import { useData } from "@contexts/DataContext";
import { useEffect, useMemo, useState } from "react";
import PdfSelector from "@components/PdfSelector";

interface YourInsightProps {
  // Add your prop types here
}

const YourInsight: React.FC<YourInsightProps> = () => {
  const { viewsList, set_viewsList } = useData();
  const { set_chartType } = useData();
  const { set_yAxis } = useData();
  const { set_xAxis } = useData();
  const [selectedView, set_selectedView] = useState<string>(
    "Processing power by production cost"
  );

  const selectViewListOptions = useMemo(() => {
    return viewsList.map((vl: InsightViewMeta) => {
      return { text: vl.name, value: vl.name };
    });
  }, [viewsList]);

  const saveView = (newView: InsightViewMeta) => {
    const updatedList = [...viewsList, newView];
    set_viewsList(updatedList);
    set_selectedView(newView.name);
    localStorage.setItem("pdf_views_list", JSON.stringify(updatedList));
  };

  const deleteView = (newView: InsightViewMeta) => {
    const updatedList = viewsList.filter(
      (v: InsightViewMeta) => v.name !== newView.name
    );
    set_viewsList(updatedList);
    localStorage.setItem("pdf_views_list", JSON.stringify(updatedList));
  };

  const setCurrentView = (insightView: InsightViewMeta) => {
    if (insightView.params) {
      set_selectedView(insightView.name);
      set_chartType(insightView.params.chartType);
      set_yAxis(insightView.params.yAxis);
      set_xAxis(insightView.params.xAxis);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("pdf_views_list");
    console.log(stored);
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
    <div className="pdf-your-insight mt-4">
      <div className="container-fluid">
        <div className="row">
          <div className="col col-xl-8">
            <InsightView></InsightView>
          </div>
          <div className="col col-xl-4">
            <PdfSelector
              id="select-view"
              label="Select view"
              value={selectedView}
              setValue={set_selectedView}
              items={selectViewListOptions}
            ></PdfSelector>

            <Divider color={colors["pdf-med-light"]} className="my-4" />
            
            <InsightDesigner saveView={saveView} deleteView={deleteView} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourInsight;
