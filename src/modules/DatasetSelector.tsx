import { useMemo, useState } from "react";
import { datasetMeta, datasets } from "./../mock-data/datasets";
import Selector from "../components/Selector";
import DatasetItem from "../components/DatasetItem";
import { useData } from "../contexts/DataContext";
import { DatasetItemMeta } from "@/types";
import { Divider } from "@mui/material";
import colors from "./../utils/colors";

interface DatasetSelectorProps {}

interface RenderActiveDatasetItemProp extends DatasetItemMeta {
  isFavorite?: boolean;
  onClickFavorite?: (value: string) => void;
}

const RenderActiveDatasetItem: React.FC<RenderActiveDatasetItemProp> = ({
  value,
  name,
  description,
  isFavorite,
  onClickFavorite,
}) => {
  const { datasetName } = useData();
  const datasetSelected = useMemo<DatasetItemMeta | undefined>(() => {
    return datasetMeta.find((ds) => ds.value === datasetName);
  }, [datasetName]);

  return (
    <div className="dataset-selected">
      {datasetSelected && (
        <DatasetItem
          {...datasetSelected}
          isActive={true}
          isFavorite={isFavorite}
          onClickFavorite={(e) => {
            onClickFavorite?.(datasetName);
          }}
        />
      )}
    </div>
  );
};

const DatasetSelector: React.FC<DatasetSelectorProps> = () => {
  const { datasetName, set_datasetName } = useData();

  const [favoriteDatasets, set_favoriteDataSets] = useState<
    (keyof typeof datasets)[]
  >(["dataset_canada_2023"]);

  const isFavorite = (value: keyof typeof datasets) => {
    return favoriteDatasets.includes(value);
  };

  const favorites = useMemo(() => {
    return datasetMeta.filter((ds) => favoriteDatasets.includes(ds.value));
  }, [favoriteDatasets]);

  const notFavorites = useMemo(() => {
    return datasetMeta.filter((ds) => !favoriteDatasets.includes(ds.value));
  }, [favoriteDatasets]);

  const toggleFavorite = (value: keyof typeof datasets) => {
    if (favoriteDatasets.includes(value)) {
      set_favoriteDataSets(favoriteDatasets.filter((ds) => ds !== value));
    } else {
      set_favoriteDataSets([...favoriteDatasets, value]);
    }
  };

  return (
    <div>
      <Selector
        id="select-dataset"
        value={datasetName}
        label="Select from dataset"
        renderSelected={(val) => (
          <RenderActiveDatasetItem
            {...datasetMeta[datasetName]}
            onClickFavorite={toggleFavorite}
            isFavorite={isFavorite(datasetName)}
          />
        )}
      >
        <div>
          {favorites.map((ds) => (
            <DatasetItem
              {...ds}
              key={ds.value}
              isActive={datasetName === ds.value}
              isFavorite={isFavorite(ds.value)}
              onClick={(e) => {
                set_datasetName(ds.value);
              }}
              onClickFavorite={(e) => {
                toggleFavorite(ds.value);
              }}
            />
          ))}
          <Divider color={colors["pdf-med-dark"]} />
          {notFavorites.map((ds) => (
            <DatasetItem
              {...ds}
              key={ds.value}
              isActive={datasetName === ds.value}
              isFavorite={isFavorite(ds.value)}
              onClick={(e) => {
                set_datasetName(ds.value);
              }}
              onClickFavorite={(e) => {
                toggleFavorite(ds.value);
              }}
            />
          ))}
        </div>
      </Selector>
    </div>
  );
};

export default DatasetSelector;
