import InsightView from "./InsightView";
import { InsightViewMeta } from "@/types";
import InsightDesigner from "./InsightDesigner";
import PdfButton from "@components/PdfButton";
import { useData } from "@contexts/DataContext";

interface YourInsightProps {
  // Add your prop types here
}

const YourInsight: React.FC<YourInsightProps> = () => {
  const { viewList, set_viewList } = useData();
  const { chartType, set_chartType } = useData();
  const { yAxis, set_yAxis } = useData();
  const { xAxis, set_xAxis } = useData();


  // const localStorageUserId = localStorage.getItem("sq_user_id")
  // localStorage.setItem("sq_user_id", action.payload)

  const saveView = (newView: InsightViewMeta) => {
    set_viewList([...viewList, newView]);
  };

  const deleteView = (newView: InsightViewMeta) => {
    set_viewList(
      viewList.filter((v: InsightViewMeta) => v.name !== newView.name)
    );
  };

  const setCurrentView = (insightView: InsightViewMeta) =>{
    if(insightView.params){
      set_chartType(insightView.params.chartType);
      set_yAxis(insightView.params.xAxis);
      set_xAxis(insightView.params.xAxis)
    }
    

  }
  return (
    <div className="pdf-your-insight">
      <div className="container-fluid">
        <div className="row">
          <div className="col col-xl-8">
            <InsightView></InsightView>
          </div>
          <div className="col col-xl-4">
            {viewList?.map((vl:InsightViewMeta) => (
              <div>
                <PdfButton onClick={()=>{
                  setCurrentView(vl)
                }}
                  className="mb-2"
                  width="100%"
                >
                  {vl.name}
                </PdfButton>

              </div>
            ))}
            <InsightDesigner 
              saveView={saveView}
              deleteView={deleteView}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourInsight;
