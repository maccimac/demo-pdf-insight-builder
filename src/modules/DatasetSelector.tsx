import { useMemo, useState } from "react";
import { datasetMeta, datasets } from "./../mock-data/datasets";
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

  return <div
  className="dataset-selected"
  >{datasetSelected && <DatasetItem {...datasetSelected} />}</div>;
};

const DatasetSelector: React.FC<DatasetSelectorProps> = () => {
  const { datasetName, set_datasetName } = useData();

  const [favoriteDatasets, set_favoriteDataSets] = useState<
    (keyof typeof datasets)[]
  >(["dataset_canada_2023"]);

  return (
    <div>
      <Selector
        id="select-dataset"
        value={datasetName}
        label="Select from dataset"
        renderSelected={(val) => (
          <RenderChartType {...datasetMeta[datasetName]} />
        )}
      >
        {/* {datasetMeta.map((ds) => (
          <DatasetItem {...ds} onClick={set_datasetName} />
        ))} */}

        {datasetMeta.map((ds) => (
          <div>
            <DatasetItem
              key={ds.value}
              {...ds}
              onClick={(e) => {
                set_datasetName(ds.value);
              }}
            />
          </div>
        ))}
      </Selector>
    </div>
  );
};

export default DatasetSelector;
