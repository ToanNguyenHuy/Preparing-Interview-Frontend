import { useEffect, useState } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ExecuteButton, {
  BUTTON_TYPE,
} from "@/pages/problems/idComponent/console/components/ExcuteButton";
import ConsoleBar from "@/pages/problems/idComponent/console/components/ConsoleBar";
import { useSelector } from "react-redux";
import {
  getIsWaitingForResultSelector,
  getRunningInfoSelector,
} from "@/reducers/problem/problemSelector";

export default function ProblemConsole({
  onRun,
  onSubmit,
  isExpanded,
  handleToggleConsole,
  ...props
}) {
  const runningInfo = useSelector(getRunningInfoSelector);
  const isWaitingForResult = useSelector(getIsWaitingForResultSelector);

  useEffect(() => {
    if (runningInfo.runInfo) {
      handleToggleConsole(true);
    }
  }, [runningInfo]);

  const handleConsoleClick = function () {
    handleToggleConsole(!isExpanded);
  };

  const renderConsoleBar = function () {
    return (
      <div className={"w-full"} style={{ height: 300 }}>
        <ConsoleBar />
      </div>
    );
  };

  return (
    <div className={"bg-white rounded mt-1 drop-shadow-lg"}>
      {isExpanded ? renderConsoleBar() : <></>}
      <div
        className={`w-full flex flex-row items-end justify-between border-t border-slate-300 bg-white p-2 ${
          isExpanded ? "rounded-b" : "rounded"
        }`}
      >
        <div
          className={"font-semibold text-slate-800 cursor-pointer pl-2"}
          onClick={handleConsoleClick}
        >
          {isWaitingForResult ? "Judging..." : "Console"}
          {isWaitingForResult ? (
            <></>
          ) : isExpanded ? (
            <ArrowDropDownIcon />
          ) : (
            <ArrowDropUpIcon />
          )}
        </div>
        <div className={"flex flex-row"}>
          <ExecuteButton
            className={"mr-3"}
            type={BUTTON_TYPE.RUN}
            handleRunClick={onRun}
          />
          <ExecuteButton type={BUTTON_TYPE.SUBMIT} handleRunClick={onSubmit} />
        </div>
      </div>
    </div>
  );
}
