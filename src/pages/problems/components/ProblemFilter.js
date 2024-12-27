import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { HARD_LEVEL, PROBLEM_STATUS } from "@/constants/problemStatus";
import {
  fetchProblems,
  getProblemByFilter,
} from "@/reducers/problem/problemThunk";

export default function ProblemFilter({ filter, setFilter, ...props }) {
  const dispatch = useDispatch();

  const [filterConfig, setFilterConfig] = useState({
    hardLevel: HARD_LEVEL.ALL,
    status: PROBLEM_STATUS.ALL,
    isShowTag: false,
  });

  const onChangeShowProblemTag = function () {
    setFilterConfig((state) => {
      return {
        ...state,
        isShowTag: !state.isShowTag,
      };
    });
  };

  const onChangeHardLevel = function (newHardLevel) {
    setFilterConfig((state) => {
      return {
        ...state,
        hardLevel: newHardLevel,
      };
    });

    setFilter((state) => {
      return {
        ...state,
        hardLevel: newHardLevel,
      };
    });

    if (newHardLevel === HARD_LEVEL.ALL) {
      dispatch(fetchProblems());
    } else {
      dispatch(
        getProblemByFilter({
          ...filter,
          hardLevel: newHardLevel,
        })
      );
    }
  };

  const onChangeStatus = function (newStatus) {
    setFilterConfig((state) => {
      return {
        ...state,
        status: newStatus,
      };
    });

    setFilter((state) => {
      return {
        ...state,
        status: newStatus,
      };
    });

    if (newStatus === PROBLEM_STATUS.ALL) {
      dispatch(fetchProblems());
    } else {
      dispatch(
        getProblemByFilter({
          ...filter,
          status: newStatus,
        })
      );
    }
  };

  return (
    <div className={"w-1/3 flex flex-col"}>
      <h3 className={"text-slate-800"}>Filter</h3>
      <div className={"flex px-3 mt-2"}>
        <FormControl className={"w-[150px]"}>
          <InputLabel id="hard-level-label">Level</InputLabel>
          <Select
            size={"small"}
            labelId="hard-level-label"
            id="hard-level"
            value={filterConfig.hardLevel}
            label="Hard level"
            onChange={(event) => {
              onChangeHardLevel(event.target.value);
            }}
          >
            <MenuItem value={HARD_LEVEL.EASY} className={"text-green-500"}>
              Easy
            </MenuItem>
            <MenuItem value={HARD_LEVEL.MEDIUM} className={"text-yellow-500"}>
              Medium
            </MenuItem>
            <MenuItem value={HARD_LEVEL.HARD} className={"text-red-500"}>
              Hard
            </MenuItem>
            <MenuItem value={HARD_LEVEL.ALL}>All</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={"w-[150px] ml-3"}>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            size={"small"}
            labelId="status-label"
            id="status"
            value={filterConfig.status}
            label="Status"
            onChange={(event) => {
              onChangeStatus(event.target.value);
            }}
          >
            <MenuItem
              value={PROBLEM_STATUS.UNSOLVED}
              className={"text-red-500"}
            >
              {" "}
              Unsolved{" "}
            </MenuItem>
            <MenuItem
              value={PROBLEM_STATUS.SOLVED}
              className={"text-green-500"}
            >
              {" "}
              Solved{" "}
            </MenuItem>
            <MenuItem value={PROBLEM_STATUS.NONE} className={"text-blue-500"}>
              {" "}
              None{" "}
            </MenuItem>
            <MenuItem value={PROBLEM_STATUS.ALL}> All </MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
