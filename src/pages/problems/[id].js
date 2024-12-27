import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProblemDetail, {
  PROBLEM_DETAIL_TAB,
} from "@/pages/problems/idComponent/problem";
import ProblemConsole from "@/pages/problems/idComponent/console";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { changeToListProblem } from "@/reducers/appRoutes/appRoutesReducer";
import {
  getListLanguage,
  getListTestCase,
  problemByIdSelector,
} from "@/reducers/problem/problemSelector";

import {
  getProblemById,
  getSubmissionById,
  runCodeWithSaving,
  runCodeWithoutSaving,
} from "@/reducers/problem/problemThunk";

import { LanguageEnum } from "./idComponent/problem/components/submission/Submission";
import {
  loadingOn,
  resetSelectedProblem,
} from "@/reducers/problem/problemReducer";
import DispalaySubmission from "./idComponent/result";

const TextEditor = dynamic(
  () => import("@/pages/problems/idComponent/editor"),
  {
    ssr: false,
  }
);

export default function DoingProblem({ ...props }) {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const problemDetail = useSelector(problemByIdSelector);
  const listDemoTestacse = useSelector(getListTestCase);
  const listLanguage = useSelector(getListLanguage)

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getProblemById({ problemId: id }));

      dispatch(getSubmissionById({ problemId: id }));
    }
    dispatch(changeToListProblem());
    dispatch(resetSelectedProblem());
  }, [id]);

  const [problemDetailWidth, setProblemDetailWidth] = useState(600);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState(LanguageEnum.CPP);
  const [detailTab, setDetaiTab] = useState(PROBLEM_DETAIL_TAB.DESCRIPTION);
  const [isOpenConsole, setOpenConsole] = useState(false);

  const handleToggleConsole = (isOpen) => {
    setOpenConsole(isOpen);
  };

  const handleChangeTab = (newTab) => {
    setDetaiTab(newTab);
    switch (newTab) {
      case PROBLEM_DETAIL_TAB.SUBMISSIONS:
        setProblemDetailWidth(300);
        setOpenConsole(false);
        break;
      case PROBLEM_DETAIL_TAB.DESCRIPTION:
        setProblemDetailWidth(600);
        setOpenConsole(false);
        break;
    }
  };

  const handleChangeCode = (newCode) => {
    setCode(newCode);
  };
  const handleChangeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const findLanguageConfig = (languageType) => {
    for (let language of listLanguage) {
      if (language.type === languageType) {
        return language;
      }
    }
  }

  const handleRun = () => {
    let languageConfig = findLanguageConfig(language);
    if (!languageConfig) {
      languageConfig = {
        type : language,
        timeLimited : 2,
        memoryLimited : 128
      }
    }

    let codeInfo = {
      code: code,
      language: language,
      problemId: id,
      timeLimited : languageConfig.timeLimited,
      memoryLimited : languageConfig.memoryLimited
    };
    dispatch(loadingOn());
    dispatch(runCodeWithoutSaving(codeInfo));
  };

  const handleSubmit = () => {
    let languageConfig = findLanguageConfig(language);
    if (!languageConfig) {
      languageConfig = {
        type : language,
        timeLimited : 2,
        memoryLimited : 128,
      }
    }

    let codeInfo = {
      code: code,
      language: language,
      problemId: id,
      timeLimited : languageConfig.timeLimited,
      memoryLimited : languageConfig.memoryLimited
    };
    dispatch(loadingOn());
    dispatch(runCodeWithSaving(codeInfo));
  };

  const renderDiplayArea = function () {
    switch (detailTab) {
      case PROBLEM_DETAIL_TAB.DESCRIPTION:
        return (
          <TextEditor
            code={code}
            onChangeCode={handleChangeCode}
            onChangeLanguage={handleChangeLanguage}
          />
        );

      case PROBLEM_DETAIL_TAB.SUBMISSIONS:
        return <DispalaySubmission />;
    }
  };

  return (
    <div
      className={
        "w-full min-h-[373px] h-[922px] max-h-screen flex flex-row bg-slate-200 overflow-hidden"
      }
    >
      <div
        className={`h-full bg-slate-200 p-1`}
        style={{
          width: problemDetailWidth,
        }}
      >
        <ProblemDetail
          tabSelected={detailTab}
          problemInfo={problemDetail}
          listDemoTestcase={listDemoTestacse}
          handleChangeTab={handleChangeTab}
        />
      </div>
      <div
        className={"w-1 h-full cursor-col-resize hover:bg-sky-400"}
        onDrag={(event) => {
          setProblemDetailWidth(event.clientX);
        }}
        onDragEnd={(event) => {
          setProblemDetailWidth(event.clientX);
        }}
        draggable
      ></div>
      <div className={"flex-1 h-full flex flex-col p-1"}>
        <div className={"w-full flex-1 bg-slate-200"}>{renderDiplayArea()}</div>
        {detailTab === PROBLEM_DETAIL_TAB.DESCRIPTION && (
          <ProblemConsole
            onRun={handleRun}
            onSubmit={handleSubmit}
            isExpanded={isOpenConsole}
            handleToggleConsole={handleToggleConsole}
          />
        )}
      </div>
    </div>
  );
}
