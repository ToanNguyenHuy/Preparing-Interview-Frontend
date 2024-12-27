import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import ExecuteButton, {
  BUTTON_TYPE,
} from "@/pages/problems/idComponent/console/components/ExcuteButton";
import dynamic from "next/dynamic";
import AdminApi from "@/network/adminApi";
import Swal from "sweetalert2";

const MarkdownEditor = dynamic(
  () => import("@/pages/admin/idComponents/Detail/components/MarkdownEditor"),
  {
    ssr: false,
  }
);

export default function TestcaseEdit({
  setOverlay,
  setReload,
  testcase,
  create,
}) {
  const [testcaseState, setTestcaseState] = useState(testcase);

  const onChangeInput = (value) => {
    setTestcaseState((state) => ({
      ...state,
      input: value,
    }));
  };

  const onChangeOutput = (value) => {
    setTestcaseState((state) => ({
      ...state,
      output: value,
    }));
  };

  const onChangeExplaination = (value) => {
    setTestcaseState((state) => ({
      ...state,
      explaination: value,
    }));
  };

  const handleClose = () => {
    setOverlay(false);
  };

  const handleSubmit = () => {
    AdminApi.createTestcase(testcaseState);
    Swal.fire("Thông báo", "Successfully!", "success");

    setReload(true);
    setOverlay(false);
  };

  const handleSave = () => {
    AdminApi.updateTestcase(testcaseState);
    Swal.fire("Thông báo", "Successfully!", "success");

    setReload(true);
    setOverlay(false);
  };

  return (
    <div className={"w-full h-full px-10 pt-5 pb-10"}>
      <div className={"w-full h-full bg-white rounded overflow-auto relative"}>
        <div
          className={
            "w-full h-10 flex items-center justify-between px-5 sticky top-0 left-0 z-10 bg-slate-300"
          }
        >
          <div className={"font-bold text-lg text-slate-800"}>Test Case</div>
          <button
            className={"text-sky-700 hover:text-sky-800"}
            onClick={handleClose}
          >
            <CloseIcon />
          </button>
        </div>

        <div className={"py-3 px-2 flex flex-col gap-3"}>
          <MarkdownEditor
            editorClass={"h-48"}
            title={"Input"}
            value={testcaseState ? testcaseState.input : ""}
            onChange={onChangeInput}
          />

          <MarkdownEditor
            editorClass={"h-48"}
            title={"Output"}
            value={testcaseState ? testcaseState.output : ""}
            onChange={onChangeOutput}
          />

          <MarkdownEditor
            editorClass={"h-48"}
            title={"Explaination"}
            value={testcaseState ? testcaseState.explaination : ""}
            onChange={onChangeExplaination}
          />

          <div className={"flex justify-end"}>
            <ExecuteButton
              title="Cancel"
              type={BUTTON_TYPE.CREATE}
              handleRunClick={handleClose}
              className={"mr-3 w-24 h-[40px] bg-red-400 hover:bg-red-500"}
            />
            {create ? (
              <ExecuteButton
                title="Submit"
                type={BUTTON_TYPE.SUBMIT}
                handleRunClick={handleSubmit}
                className={"mr-3 w-24 h-[40px] bg-sky-400 hover:bg-sky-500"}
              />
            ) : (
              <ExecuteButton
                title="Save"
                type={BUTTON_TYPE.SUBMIT}
                handleRunClick={handleSave}
                className={"mr-3 w-24 h-[40px] bg-sky-400 hover:bg-sky-500"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
