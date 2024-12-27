import Description from "@/pages/problems/idComponent/problem/components/description/Description";
import Submission from "@/pages/problems/idComponent/problem/components/submission/Submission";
import ButtonTab from "@/shared/buttonTab";

export const PROBLEM_DETAIL_TAB = {
  DESCRIPTION: "description",
  SUBMISSIONS: "submissions",
};

export default function ProblemDetail({
  problemInfo,
  listDemoTestcase,
  tabSelected,
  handleChangeTab,
  ...props
}) {
  const isTabDescription = function () {
    return tabSelected === PROBLEM_DETAIL_TAB.DESCRIPTION;
  };

  const isTabSubmission = function () {
    return tabSelected === PROBLEM_DETAIL_TAB.SUBMISSIONS;
  };

  const handleSelectTab = (newTab) => {
    if (typeof handleChangeTab === "function") {
      handleChangeTab(newTab);
    } else {
      console.error(
        "[file: index.js:25 ~ handleSelectTab] handleChangeTab is not a function"
      );
    }
  };

  return (
    <div
      className={"w-full h-full bg-white rounded flex flex-col drop-shadow-lg"}
    >
      <div
        className={"w-full h-10 border-b border-slate-300 flex flex-row px-2"}
      >
        <ButtonTab
          title={"Description"}
          isSelected={isTabDescription()}
          onClickCallback={() =>
            handleSelectTab(PROBLEM_DETAIL_TAB.DESCRIPTION)
          }
        />
        <ButtonTab
          title={"Submissions"}
          isSelected={isTabSubmission()}
          onClickCallback={() =>
            handleSelectTab(PROBLEM_DETAIL_TAB.SUBMISSIONS)
          }
        />
      </div>
      <div className={"w-full flex-1 p-2 overflow-y-auto bg-slate-50 rounded"}>
        {tabSelected === PROBLEM_DETAIL_TAB.DESCRIPTION ? (
          <Description
            problemInfo={problemInfo}
            listDemoTestCase={listDemoTestcase}
          />
        ) : (
          <Submission />
        )}
      </div>
    </div>
  );
}
