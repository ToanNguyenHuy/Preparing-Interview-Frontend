import {
  getListSubmissionSelector,
  getSelectedSubmissionIndex,
} from "@/reducers/problem/problemSelector";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EXECUTE_CODE_STATUS,
  EXECUTE_CODE_TITLE,
} from "../../../console/components/TestCaseResult";
import { changeSelectedSubmission } from "@/reducers/problem/problemReducer";

export const LanguageEnum = {
  "All Languages": "All Languages",
  Golang: "golang",
  CPP: "c_cpp",
  JAVA: "java",
};

export const LanguageTitle = {
  cpp: "C++",
  java: "Java",
  golang: "Golang",
};

export const StatusesEnum = {
  " All Statuses": "All Statuses",
  Accepted: "Accepted",
  "Wrong Answer": "Wrong Answer",
  "Memory Limit Exceeded": "Memory Limit Exceeded",
  "Output Limit Exceeded": "Output Limit Exceeded",
  "Time Limit Exceeded": "Time Limit Exceeded",
  "Running Error": "Running Error",
  "Internal Error": "Internal Error",
  "Compile Error": "Compile Error",
};

function StatusesBar({ handleChangeStatus, ...props }) {
  const [selectStatus, setSelectStatus] = useState(StatusesEnum[""]);
  const onChangeStatusType = function (status) {
    if (typeof handleChangeStatus === "function") {
      handleChangeStatus(status);
      setSelectStatus((curStatus) => status);
    } else {
      console.error("ConfigEditorBar: handleChangeStatus is not a function");
    }
  };
  return (
    <div
      className={
        "w-full h-9 bg-white rounded-t-md  flex flex-row items-center px-2 "
      }
    >
      <select
        className={"pets bg-gray-200 w-full pt-2 pb-2 rounded-lg pl-5"}
        id="pet-select"
        value={selectStatus}
        onChange={(event) => {
          onChangeStatusType(event.target.value);
        }}
      >
        {Object.keys(StatusesEnum).map((key, index) => {
          return (
            <option key={"STATUSES_KEY_" + index} value={StatusesEnum[key]}>
              {key}
            </option>
          );
        })}
      </select>
    </div>
  );
}

function LanguagesBar({ handleChangeLanguage, ...props }) {
  const [selectedLanguage, setLanguage] = useState(LanguageEnum[""]);
  const onChangeLanguageType = function (language) {
    if (typeof handleChangeLanguage === "function") {
      handleChangeLanguage(language);
      setLanguage((curLanguage) => language);
    } else {
      console.error("ConfigEditorBar: handleChangeLanguage is not a function");
    }
  };
  return (
    <div
      className={
        "w-full h-9 bg-white rounded-t-md flex flex-row items-center px-2 float-right "
      }
    >
      <select
        className={"pets bg-gray-200 w-full pt-2 pb-2 rounded-lg pl-5"}
        id="pet-select"
        value={selectedLanguage}
        onChange={(event) => {
          onChangeLanguageType(event.target.value);
        }}
      >
        {Object.keys(LanguageEnum).map((key, index) => {
          return (
            <option key={"LANGUAGE_KEY_" + index} value={LanguageEnum[key]}>
              {key}
            </option>
          );
        })}
      </select>
    </div>
  );
}

function TypeStatuses({
  submission,
  isSelected,
  handleChangeSubmission,
  ...props
}) {
  const [checkStatus, setCheckStatus] = useState(true);
  const [mainClass, setMainClass] = useState(
    "flex h-full max-w-full shrink-0 items-center gap-3 bg-slate-100 p-3 rounded-md hover:bg-sky-300"
  );

  useEffect(() => {
    if (isSelected) {
      setMainClass(
        "flex h-full max-w-full flex-shrink-0 items-center gap-3 border border-sky-300 bg-sky-200 p-3 rounded-md hover:border-sky-400"
      );
    } else {
      setMainClass(
        "flex h-full max-w-full flex-shrink-0 items-center gap-3 bg-slate-100 p-3 rounded-md hover:border hover:border-slate-200"
      );
    }
  }, [isSelected]);

  const getTimeAgo = (date) => {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  };

  const renderStatus = () => {
    switch (submission.status) {
      case EXECUTE_CODE_STATUS.AC:
        return <span className={"text-green-500 font-bold"}>Accepted</span>;

      default:
        return (
          <span className={"text-red-500 font-bold"}>
            {EXECUTE_CODE_TITLE[submission.status]}
          </span>
        );
    }
  };

  return (
    <div
      className={mainClass + " cursor-pointer"}
      onClick={handleChangeSubmission}
    >
      <div className={"flex w-2/3 flex-col items-start justify-between   pl-2"}>
        <div className={""}>{renderStatus()}</div>
        <span
          className={
            "text-xs text-label-3 dark:text-dark-label-3 text-slate-500"
          }
        >
          {getTimeAgo(Date.parse(submission.updatedAt))}
        </span>
      </div>
      <div className={"w-1/3 flex items-center justify-center drop-shadow"}>
        <span
          className={
            "inline-flex items-center text-xs px-3 py-1 font-bold bg-slate-50 text-sky-500 border border-sky-300 rounded-[25px]"
          }
        >
          {LanguageTitle[submission.language]}
        </span>
      </div>
    </div>
  );
}

export default function Submission(props) {
  const listSubmission = useSelector(getListSubmissionSelector);
  const selectedIndex = useSelector(getSelectedSubmissionIndex);

  const dispatch = useDispatch();

  const handleChangeSubmission = function (index) {
    dispatch(changeSelectedSubmission(index));
  };

  return (
    <div className={"w-full h-full drop-shadow"}>
      <div className={"flex flex-col gap-3"}>
        {listSubmission?.length !== 0 ? (
          listSubmission?.map((submission, index) => {
            return (
              <TypeStatuses
                key={"typeStatuses" + index}
                submission={submission}
                isSelected={index === selectedIndex}
                handleChangeSubmission={() => handleChangeSubmission(index)}
              />
            );
          })
        ) : (
          <h3>No Submission</h3>
        )}
      </div>
    </div>
  );
}
