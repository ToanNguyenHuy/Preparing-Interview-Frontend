import { memo, useState } from "react";
import { TestCaseButton } from "./TestCaseList";
// import Skeleton from "react-loading-skeleton";

export const EXECUTE_CODE_STATUS = {
  AC: "AC",
  TLE: "TLE",
  WA: "WA",
  RE: "RE",
  MLE: "MLE",
  CE: "CE",
  NONE: "NONE",
};

export const EXECUTE_CODE_TITLE = {
  AC: "Accepted",
  WA: "Wrong answer",
  RE: "Runtime Error",
  MLE: "Memory Limit Error",
  TLE: "Time Limit Execute",
  CE: "Complie Error",
  NONE: "",
};

/**
 * @param {} runningInfo
 * @returns
 */
export function CompileErrorDisplay({ runningInfo, ...props }) {
  const renderContent = function () {
    if (runningInfo.status === false) {
      return (
        <div className={"w-full bg-red-100 rounded px-2 py-1"}>
          {runningInfo.runInfo.split("\n").map((e, index) => (
            <p key={"pre" + index}>{e}</p>
          ))}
        </div>
      );
    } else {
      return (
        <h3 className={"w-full bg-slate-100 text-slate-600 rounded px-2 py-1"}>
          Write and run code to get result
        </h3>
      );
    }
  };

  return (
    <div className={`w-full flex flex-col text-red-600 mt-2`}>
      {runningInfo.status === false && (
        <h3 className={"text-red-600"}>
          {EXECUTE_CODE_TITLE[EXECUTE_CODE_STATUS.CE]}
        </h3>
      )}
      {renderContent()}
    </div>
  );
}

export function AcceptedCaseDisplay({
  status,
  input,
  output,
  expected,
  timeExecute,
  memoryUsage,
  ...props
}) {
  const renderTestCaseStatus = (status) => {
    let color;
    switch (status) {
      case EXECUTE_CODE_STATUS.AC:
        color = "text-green-500";
        break;
      default:
        color = "text-red-500";
        break;
    }

    const displayTime = (timeExecute) => {
      if (timeExecute === -1) {
        return 2000;
      }
      return timeExecute;
    };

    return (
      <div className="flex flex-row items-baseline pt-2">
        <h3 className={`mr-3 ${color}`}>
          {EXECUTE_CODE_TITLE[EXECUTE_CODE_STATUS[status]]}
        </h3>
        <h4
          className={
            "bg-slate-200 border border-slate-300 mx-1 px-3 rounded-xl text-sm drop-shadow font-semibold"
          }
        >
          {displayTime(timeExecute)} ms
        </h4>
        {memoryUsage && (
          <h4
            className={
              "bg-slate-200 border border-slate-300 mx-1 px-3 rounded-xl text-sm drop-shadow font-semibold"
            }
          >
            {memoryUsage} KB
          </h4>
        )}
      </div>
    );
  };

  return (
    <div className={`w-full`}>
      {renderTestCaseStatus(status)}
      {
        (status !== EXECUTE_CODE_STATUS.AC) ?
          <>
            <div className={"w-full bg-white rounded px-2 py-1 drop-shadow my-2"}>
              <h3 className={"text-slate-800 mb-0 text-sm"}>Input</h3>
              <div className={"text-sm"}>{input}</div>
            </div>

            <div className={"w-full bg-white rounded px-2 py-1 drop-shadow my-2"}>
              <h3 className={"text-slate-800 mb-0 text-sm"}>Output</h3>
              <div className={"text-sm"}>{output}</div>
            </div>

            <div className={"w-full bg-white rounded px-2 py-1 drop-shadow my-2"}>
              <h3 className={"text-slate-800 mb-0 text-sm"}>Expected</h3>
              <div className={"text-sm"}>{expected}</div>
            </div>
          </>
          : <></>

      }
    </div>
  );
}

export default function TestCaseResult({
  runningInfo,
  isWaitingForResult,
  ...props
}) {
  const renderError = function () {
    return <CompileErrorDisplay runningInfo={runningInfo} />;
  };

  const renderAccepted = function () {
    return <RunningTestCaseList runningInfo={runningInfo.runInfo} />;
  };

  const renderPart = function () {
    if (runningInfo) {
      switch (runningInfo.status) {
        case true:
          return renderAccepted();

        default:
          return renderError();
      }
    } else {
      return <></>
    }
  }

  const renderWaiting = function () {
    return (
      <div className="w-full h-full flex flex-row justify-center items-center">
        <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
      </div>
    );
  };

  return (
    <>
      {isWaitingForResult ? (
        renderWaiting()
      ) : (
        <div className={"w-full px-4"}>{renderPart()}</div>
      )}
    </>
  );
}

export function RunningTestCaseList({ runningInfo }) {
  const [selectedIndex, setIndex] = useState(0);
  const handleChangeTestCase = (index) => {
    setIndex((oldIndex) => index);
  };

  const renderTestCase = (runInfo, index) => {
    return (
      <AcceptedCaseDisplay
        input={runInfo.input}
        output={runInfo.stdout}
        expected={runInfo.output}
        status={runInfo.status}
        timeExecute={runInfo.timeExecute}
        memoryUsage={runInfo.totalUsageMemory}
        key={"testCaseDisplay" + index}
      />
    )
  }


  return (
    <div className="w-full h-full">
      <div className="flex flex-row my-2">
        {
          runningInfo ? runningInfo.map((runInfo, index) => {
            return <TestCaseButton
              status={runInfo.status}
              key={"testCaseButton" + index}
              title={"Case " + (index + 1)}
              isSelected={index === selectedIndex}
              onClick={() => handleChangeTestCase(index)}
            />
          }) : <></>
        }
      </div>
      {
        runningInfo ? runningInfo.map((runInfo, index) => {
          if (index === selectedIndex) {
            return renderTestCase(runInfo, index);
          }
        }) : <></>
      }
    </div>
  );
}
