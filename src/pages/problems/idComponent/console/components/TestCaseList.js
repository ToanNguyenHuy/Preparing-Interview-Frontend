import { useState } from "react";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import { EXECUTE_CODE_STATUS } from "./TestCaseResult";
import { list } from "postcss";

export function TestCaseButton({
  title,
  status,
  isSelected,
  onClick,
  ...props
}) {
  let color = "warning";
  if (status === EXECUTE_CODE_STATUS.AC) {
    color = "success";
  }

  return (
    <button
      className={
        "flex flex-row items-end gap-1 rounded px-2 py-1 ml-2 drop-shadow " +
        (isSelected
          ? "bg-sky-200 font-semibold border border-sky-300 hover:border-sky-400"
          : "bg-slate-100 hover:border hover:border-slate-200")
      }
      onClick={onClick}
    >
      {status !== undefined && (
        <FiberManualRecordRoundedIcon color={color} fontSize="small" />
      )}
      <div>{title}</div>
    </button>
  );
}

export function TestCaseDisplay({ input, output }) {
  const [inputState, setInputState] = useState(input);
  const [outputState, setOutputState] = useState(output);

  return (
    <div className={"w-full bg-blue -300"}>
      <div className={"w-full bg-white rounded px-2 py-1 drop-shadow my-2"}>
        <h3 className={"text-slate-800 mb-0 text-sm"}>Input</h3>
        <div className={"text-sm"}>{inputState}</div>
      </div>
      <div className={"w-full bg-white rounded px-2 py-1 drop-shadow my-2"}>
        <h3 className={"text-slate-800 mb-0 text-sm"}>Output</h3>
        <div className={"text-sm"}>{outputState}</div>
      </div>
    </div>
  );
}

export default function TestCaseList({ listDemoTestCase }) {
  const [selectedIndex, setIndex] = useState(0);
  const handleChangeTestCase = (index) => {
    setIndex((oldIndex) => index);
  };

  const renderTestCase = (testCase, index) => {
    return (
      <TestCaseDisplay
        input={testCase.input}
        output={testCase.output}
        key={"testCaseDisplay" + index}
      />
    );
  };

  return (
    <div className="w-full h-full px-4">
      <div className="flex flex-row my-2">
        {
          listDemoTestCase ?  listDemoTestCase.map((testCase, index) => {
            return <TestCaseButton 
              key={"testCaseButton" + index}
              title={"Case " + (index + 1)}
              isSelected={index === selectedIndex}
              onClick={() => handleChangeTestCase(index)}
            />
          }) : <></>
        }
      </div>
      {
        listDemoTestCase ? listDemoTestCase.map((testCase, index) => {
          if (index === selectedIndex) {
            return renderTestCase(testCase, index);
          }
        }) : <></>
      }
    </div>
  );
}
