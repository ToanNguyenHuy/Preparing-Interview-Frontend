import { useEffect, useState } from "react";
import ButtonTab from "@/shared/buttonTab";
import TestCaseList from "./TestCaseList";
import TestCaseResult from "./TestCaseResult";
import { useSelector } from "react-redux";
import {
  getIsWaitingForResultSelector,
  getListTestCase,
  getRunningInfoSelector,
} from "@/reducers/problem/problemSelector";

const ConsoleBarAreaEnum = {
  TEST_CASE: "testcase",
  RESULT: "result",
};
export default function ConsoleBar(props) {
  const listDemoTestacse = useSelector(getListTestCase);
  const runningInfo = useSelector(getRunningInfoSelector);
  const isWaitingForResult = useSelector(getIsWaitingForResultSelector);

  useEffect(() => {
    if (runningInfo.runInfo) {
      setArea(ConsoleBarAreaEnum.RESULT);
    }
  }, [runningInfo]);

  const [area, setArea] = useState(ConsoleBarAreaEnum.TEST_CASE);

  const handleChangeArea = function (newArea) {
    setArea(newArea);
  };

  const isTestcaseArea = () => area === ConsoleBarAreaEnum.TEST_CASE;
  const isResultArea = () => area === ConsoleBarAreaEnum.RESULT;

  const handleRenderTestCase = () => {
    return <TestCaseList listDemoTestCase={listDemoTestacse} />;
  };

  const handleRenderResult = () => {
    return (
      <TestCaseResult
        runningInfo={runningInfo}
        isWaitingForResult={isWaitingForResult}
      />
    );
  };

  const handleRenderPart = () => {
    switch (area) {
      case ConsoleBarAreaEnum.RESULT:
        return handleRenderResult();

      case ConsoleBarAreaEnum.TEST_CASE:
        return handleRenderTestCase();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div
        className={
          "w-full bg-white rounded-t px-2 pt-1 border-b border-slate-300"
        }
      >
        <ButtonTab
          title={"Test case"}
          isSelected={isTestcaseArea()}
          onClickCallback={() => handleChangeArea(ConsoleBarAreaEnum.TEST_CASE)}
        />
        <ButtonTab
          title={"Result"}
          isSelected={isResultArea()}
          onClickCallback={() => handleChangeArea(ConsoleBarAreaEnum.RESULT)}
        />
      </div>
      <div className="overflow-y-auto flex-1 bg-slate-50">
        {handleRenderPart()}
      </div>
    </div>
  );
}
