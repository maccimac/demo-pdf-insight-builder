import colors from "../utils/colors";
import { DatasetItemMeta } from "@/types";
import { formatDate } from "@utils/utils";
import Icon from "@mdi/react";
import { mdiStar, mdiStarOutline } from "@mdi/js";
import { MenuItem } from "@mui/material";
import { useData } from "@contexts/DataContext";

interface DatasetItemProps extends DatasetItemMeta {
  onClick?: (value: string) => void;
  onClickFavorite?: (value: string) => void;
  isFavorite?: boolean;
  isActive?: boolean;
}

const PdfDatasetItem: React.FC<DatasetItemProps> = ({
  name,
  value,
  description,
  count,
  publish_date,
  source,
  isFavorite,
  isActive,
  onClick,
  onClickFavorite,
}) => {
  const { darkMode } = useData();
  return (
    <MenuItem
      className={
        isActive ? "pdf-dataset-item dataset-item--active" : "pdf-dataset-item"
      }
      value={value}
      onClick={() => {
        onClick?.(value);
      }}
      disableRipple
      sx={{
        "&:hover": {
          backgroundColor: "transparent",
        },
        whiteSpace: "normal",
        alignItems: "flex-start",
        paddingY: 1.5,
      }}
    >
      <div className="meta-holder">
        <div className="title-favorite-holder">
          <div className="dataset-title">{name}</div>
          <div
            className="dataset-favorite"
            onClick={(e) => {
              e.preventDefault();
              onClickFavorite?.(value);
            }}
          >
            <div>
              <Icon
                path={isFavorite ? mdiStar : mdiStarOutline}
                size="20px"
                color={
                  darkMode
                    ? colors["pdf-blue-muted-medium"]
                    : isActive
                    ? colors["pdf-blue-primary"]
                    : colors["pdf-blue-muted-medium"]
                }
              />
            </div>
          </div>
        </div>
        <div className="">
          <div className="dataset-meta response">
            <span className="response-active"> {count} rows </span>|{" "}
            {publish_date && formatDate(publish_date)} | {source}
          </div>
          <div className="dataset-description">{description}</div>
        </div>
      </div>
    </MenuItem>
  );
};

export default PdfDatasetItem;
