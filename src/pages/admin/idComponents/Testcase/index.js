import ExecuteButton, {
  BUTTON_TYPE,
} from "@/pages/problems/idComponent/console/components/ExcuteButton";
import TestcaseList from "./components/TestcaseList";
import TestcaseEdit from "./components/TestcaseEdit";
import { useState } from "react";
import { getUserId } from "@/reducers/authentication/authenticationSelector";
import { useSelector } from "react-redux";

export default function Testcase({ id, props }) {
  const userid = useSelector(getUserId);
  const [testcaseEditOverlayState, setTestcaseEditOverlayState] =
    useState(false);

  const [reload, setReload] = useState(false);

  const handleAddTestcase = () => {
    setTestcaseEditOverlayState(true);
  };

  return (
    <div className={"w-full h-screen flex flex-col drop-shadow"}>
      <TestcaseList id={id} reload={reload} setReload={setReload} />
      <div className={"w-full px-5"}>
        <ExecuteButton
          title={"Add Test Case"}
          type={BUTTON_TYPE.CREATE}
          handleRunClick={handleAddTestcase}
          className={"w-full h-[40px] bg-sky-400 hover:bg-sky-500"}
        />
      </div>

      {testcaseEditOverlayState && (
        <div className={"overlay"}>
          <TestcaseEdit
            setOverlay={setTestcaseEditOverlayState}
            setReload={setReload}
            testcase={{
              input: "Default input",
              output: "Default output",
              explaination: "Defalut explaination",
              problemId: id,
              ownerId: userid
            }}
            create
          />
        </div>
      )}
    </div>
  );
}
