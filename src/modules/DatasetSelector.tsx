import { useMemo } from "react";
import { datasetMeta } from "./../mock-data/datasets";
import Selector from "../components/Selector";
import DatasetItem from "../components/DatasetItem";
import { useData } from "../contexts/DataContext";
import { DatasetItemMeta } from "@/types";

interface DatasetSelectorProps {}

const RenderChartType: React.FC<DatasetItemMeta> = ({
  value,
  name,
  description,
}) => {
  const { datasetName } = useData();
  const datasetSelected = useMemo<DatasetItemMeta | undefined>(() => {
    return datasetMeta.find((ds) => ds.value === datasetName);
  }, [datasetName]);

  return (
    <div>{datasetSelected && <DatasetItem {...datasetSelected} />}</div>
  
  );
};

const DatasetSelector: React.FC<DatasetSelectorProps> = () => {
  const { datasetName, set_datasetName } = useData();
  return (
    <div>
      <Selector
        id="select-dataset"
        value={datasetName}
        label="Select dataset"
        renderSelected={(val) => (
          <RenderChartType {...datasetMeta[datasetName]} />
        )}
      >
        {/* {datasetMeta.map((ds) => (
          <DatasetItem {...ds} onClick={set_datasetName} />
        ))} */}

        {datasetMeta.map((ds) => (
          <div
            
          >
            <DatasetItem key={ds.value} {...ds} onClick={(e) => {
              set_datasetName(ds.value);
            }}/>
          </div>
        ))}
      </Selector>
    </div>
  );
};

export default DatasetSelector;
