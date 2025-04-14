import colors from "@utils/colors";
import { DatasetItemMeta } from "@/types";
import { Divider, InputLabel } from "@mui/material";
import { datasetMeta, datasets } from "@mock-data/datasets";
import PdfSelector from "@components/PdfSelector";
import PdfDatasetItem from "@components/PdfDatasetItem";
import { useData } from "@contexts/DataContext";
import { useMemo, useState } from "react";

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
        <PdfDatasetItem
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
      <PdfSelector
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
          <InputLabel
            className="mb-0 mx-3 pt-2"
            shrink
            sx={{
              "&.MuiInputLabel-shrink": {
                fontSize: "20px",
              },
            }}
          >
            Favorite datasets
          </InputLabel>
          {favorites.map((ds) => (
            <PdfDatasetItem
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
          <Divider className="my-3" color={colors["pdf-light"]} />
          <InputLabel
            className="mb-0 mx-3 pt-2"
            shrink
            sx={{
              "&.MuiInputLabel-shrink": {
                fontSize: "20px",
              },
            }}
          >
            More datasets
          </InputLabel>
          {notFavorites.map((ds) => (
            <PdfDatasetItem
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
      </PdfSelector>
    </div>
  );
};

export default DatasetSelector;
