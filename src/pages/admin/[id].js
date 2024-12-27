import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { changeToAdminPage } from "@/reducers/appRoutes/appRoutesReducer";
import FeatureBar from "@/pages/admin/components/FeatureBar";
import { useRouter } from "next/router";
import Testcase from "./idComponents/Testcase";
import Language from "./idComponents/Language";
import Detail from "./idComponents/Detail";

export const MANIPULATE_PROBLEM_FEATURE = {
  DETAIL: "detail",
  TEST_CASE: "testcase",
  LANGUAGE: "language",
  SETTING: "settings",
};

export default function ProblemDetailPage(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    dispatch(changeToAdminPage());
  }, []);

  const [currentFeature, setFeature] = useState(
    MANIPULATE_PROBLEM_FEATURE.DETAIL
  );

  const handleDetailClick = function () {
    setFeature((feature) => MANIPULATE_PROBLEM_FEATURE.DETAIL);
  };

  const handleTestCaseClick = function () {
    setFeature((feature) => MANIPULATE_PROBLEM_FEATURE.TEST_CASE);
  };

  const handleLanguageClick = function () {
    setFeature((feature) => MANIPULATE_PROBLEM_FEATURE.LANGUAGE);
  };

  const handleSettingClick = function () {
    setFeature((feature) => MANIPULATE_PROBLEM_FEATURE.SETTING);
  };

  const renderPart = function () {
    switch (currentFeature) {
      case MANIPULATE_PROBLEM_FEATURE.TEST_CASE:
        return <Testcase id={id} />;
      case MANIPULATE_PROBLEM_FEATURE.DETAIL:
        return <Detail id={id} />;
      case MANIPULATE_PROBLEM_FEATURE.LANGUAGE:
        return <Language />;
    }
  };

  const features = [
    {
      enum: MANIPULATE_PROBLEM_FEATURE.DETAIL,
      title: "Detail",
      onClick: handleDetailClick,
    },
    {
      enum: MANIPULATE_PROBLEM_FEATURE.TEST_CASE,
      title: "Test Case",
      onClick: handleTestCaseClick,
    },
    {
      enum: MANIPULATE_PROBLEM_FEATURE.LANGUAGE,
      title: "Language",
      onClick: handleLanguageClick,
    },
  ];

  return (
    <div className={"w-full h-screen flex"}>
      <FeatureBar listFeature={features} currentFeature={currentFeature} />
      <div className={"w-10/12 "}>{renderPart()}</div>
    </div>
  );
}
