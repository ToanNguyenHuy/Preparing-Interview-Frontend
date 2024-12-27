import { Button, Collapse } from "@mui/material";
import { CategoryKey, ProblemCategory } from "@/constants/category";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getProblemByFilter } from "@/reducers/problem/problemThunk";

function CategoryMember({
  cateKey,
  onChooseCategory,
  isChoosing,
  number,
  ...props
}) {
  const handleChooseCategory = function () {
    if (typeof onChooseCategory === "function") {
      onChooseCategory();
    } else {
      console.log("CategoryMember", "onChooseCategory is not a function");
    }
  };

  if (!cateKey) {
    console.log("cateKey is undefined");
    return;
  }

  return (
    <Button
      size={"small"}
      className={`h-8 px-2 py-1 text-slate-800 rounded-[10px] normal-case ${
        isChoosing ? "bg-sky-200 hover:bg-sky-100 text-custom-bold" : ""
      }`}
      onClick={handleChooseCategory}
      variant={"outlined"}
    >
      {ProblemCategory[cateKey]}
    </Button>
  );
}

export default function CategoryList({ filter, setFilter, ...props }) {
  const dispatch = useDispatch();

  const MAX_RENDER = 5;

  const [currentKey, setCurrentKey] = useState("");
  const [renderKey, setRenderKey] = useState(currentKey);
  const [isExpand, setExpand] = useState(false);

  const handleChangeCategory = (newCate) => {
    let storedCate = "$" + newCate;
    let updatedCurrentKey;
    if (currentKey.includes(storedCate)) {
      updatedCurrentKey = currentKey.replace(storedCate, "");
      setCurrentKey((currentKey) => {
        return updatedCurrentKey;
      });
    } else {
      updatedCurrentKey = currentKey + storedCate;
      setCurrentKey((currentKey) => {
        return updatedCurrentKey;
      });
    }
    const sub = updatedCurrentKey
      .split("$")
      .filter(Boolean)
      .slice(0, MAX_RENDER)
      .join("$");
    setRenderKey("$" + sub);

    const newCategories = updatedCurrentKey.split("$").filter(Boolean);

    setFilter((state) => {
      return {
        ...state,
        categories: newCategories,
      };
    });

    dispatch(
      getProblemByFilter({
        ...filter,
        categories: newCategories,
      })
    );
  };

  const handleExpandCategory = function () {
    setExpand((isExpand) => !isExpand);
  };

  return (
    <div className={"w-2/3 flex flex-col"}>
      <h3 className={"text-slate-800"}>Category</h3>
      <div className={"w-full flex flex-row justify-between px-3 mt-2"}>
        <div
          className={`flex flex-wrap gap-1 w-9/12 p-1 rounded-md overflow-hidden z-10 ${
            isExpand
              ? "h-60 bg-slate-50 border border-slate-200 overflow-y-auto"
              : "h-20"
          }`}
        >
          {currentKey === "" && !isExpand && (
            <div className={"font-medium text-slate-700"}>
              No catagories have been selected
            </div>
          )}
          {CategoryKey.map((cateKey, index) => {
            if (!isExpand) {
              return (
                renderKey.includes(`$${cateKey}`) && (
                  <CategoryMember
                    cateKey={cateKey}
                    key={"CateMember" + index}
                    isChoosing={currentKey.includes(`$${cateKey}`)}
                    onChooseCategory={() => handleChangeCategory(cateKey)}
                  />
                )
              );
            }

            return (
              <CategoryMember
                cateKey={cateKey}
                key={"CateMember" + index}
                isChoosing={currentKey.includes(`$${cateKey}`)}
                onChooseCategory={() => handleChangeCategory(cateKey)}
              />
            );
          })}
          {currentKey.split("$").length - 1 > MAX_RENDER && !isExpand && (
            <Button
              size={"small"}
              className={`h-8 px-2 py-1 text-slate-800 rounded-[10px] normal-case bg-sky-200 hover:bg-sky-100 text-custom-bold`}
              onClick={handleExpandCategory}
              variant={"outlined"}
            >
              ...
            </Button>
          )}
        </div>
        <div className={"flex items-start"}>
          <Button
            size="small"
            className={"w-36 bg-blue-500 font-semibold flex justify-around"}
            variant="contained"
            onClick={handleExpandCategory}
          >
            {isExpand ? "Collapse " : "Expand "}
            <span>{currentKey.split("$").length - 1}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
