import {
  getListSubmissionSelector,
  getSelectedSubmissionIndex,
} from "@/reducers/problem/problemSelector";
import ReactMarkdownRender from "@/shared/utilities/MarkdownRender";
import { useSelector } from "react-redux";
import { EXECUTE_CODE_TITLE, TestCaseResult } from "../console/components/TestCaseResult";

export default function DispalaySubmission({ submissionInfo }) {
  const listSubmission = useSelector(getListSubmissionSelector);
  const selectedIndex = useSelector(getSelectedSubmissionIndex);

  const preprocessSourceCode = (submissionInfo) => {
    let language = submissionInfo.language;
    if (language === "golang") {
      language = "go";
    }
    return "```" + language + "\n" + submissionInfo.source;
  };

  const renderDisplayCode = (submissionInfo) => {
    return (
      <>
        {submissionInfo ? (
          <div className="w-full h-full pt-3 px-3">
            <h3 className={"text-slate-800"}>Source code</h3>
            <ReactMarkdownRender
              markdownSource={preprocessSourceCode(submissionInfo)}
            />
            {renderDisplayError(submissionInfo)}
          </div>
        ) : (
          <></>
        )}
      </>
    );
  };

  const renderDisplayError = (submissionInfo) => {
    return (
      <>
        {submissionInfo.error ? (
          <div className={`w-full flex flex-col text-red-600 mt-2`}>
            <h3 className={"text-red-600"}>
              {EXECUTE_CODE_TITLE[submissionInfo.status]}
            </h3>
            <div
              className={
                "w-full max-w-full bg-red-100 rounded py-1 px-2 text-sm box-border"
              }
            >
              {submissionInfo.error &&
                submissionInfo.error
                  .split("\n")
                  .map((e, index) => <pre key={"pre" + index}>{e}</pre>)}
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <div className="w-full h-full bg-white rounded overflow-y-auto drop-shadow">
      {listSubmission && listSubmission.length > 0 && selectedIndex >= 0 ? 
        renderDisplayCode(listSubmission[selectedIndex])
        : <div className="p-4">No submission selected</div>
      }
    </div>
  );
}
