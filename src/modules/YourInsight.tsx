import InsightView from "./InsightView";
import { InsightViewMeta } from "@/types";
import InsightDesigner from "./InsightDesigner";
import PdfButton from "@components/PdfButton";
import { useData } from "@contexts/DataContext";
import { useEffect } from "react";

interface YourInsightProps {
  // Add your prop types here
}

const YourInsight: React.FC<YourInsightProps> = () => {
  const { viewsList, set_viewsList } = useData();
  const { set_chartType } = useData();
  const { set_yAxis } = useData();
  const { set_xAxis } = useData();

  // const localStorageUserId = localStorage.getItem("sq_user_id")
  // localStorage.setItem("sq_user_id", action.payload)

  const saveView = (newView: InsightViewMeta) => {
    const updatedList = [...viewsList, newView];
    set_viewsList(updatedList);
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
      set_chartType(insightView.params.chartType);
      set_yAxis(insightView.params.xAxis);
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

  return (
    <div className="pdf-your-insight">
      <div className="container-fluid">
        <div className="row">
          <div className="col col-xl-8">
            <InsightView></InsightView>
          </div>
          <div className="col col-xl-4">
            {viewsList?.map((vl: InsightViewMeta) => (
              <div>
                <PdfButton
                  onClick={() => {
                    setCurrentView(vl);
                  }}
                  className="mb-2"
                  width="100%"
                >
                  {vl.name}
                </PdfButton>
              </div>
            ))}
            <InsightDesigner saveView={saveView} deleteView={deleteView} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourInsight;
