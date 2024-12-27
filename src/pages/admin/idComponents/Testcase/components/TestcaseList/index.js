import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import { useEffect, useState } from "react";
import TestcaseEdit from "../TestcaseEdit";
import AdminApi from "@/network/adminApi";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

function TestcaseSlot({
  testcaseId,
  input,
  output,
  explaination,
  setReload,
  props,
}) {
  const [testcaseEditOverlayState, setTestcaseEditOverlayState] =
    useState(false);

  const testcase = {
    testcaseId: testcaseId,
    input: input,
    output: output,
    explaination: explaination,
  };

  const handleEditTestcase = () => {
    setTestcaseEditOverlayState(true);
  };

  const handleDeleteTestcase = () => { 
    Swal.fire({
      title: "Xác nhận",
      text: "Bạn có chắc chắn muốn xóa không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        // Xử lý khi người dùng xác nhận
        AdminApi.deleteTestcase(testcaseId).then(setReload(true));
        Swal.fire("Thông báo", "Deleted Successfully!", "success");

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Xử lý khi người dùng hủy
      }
    });
    
  };

  return (
    <div>
      <div
        className={
          "w-full h-[40px] bg-slate-200 rounded flex flex-row items-center px-3 gap-2 mb-2 odd:bg-slate-50 even:bg-slate-100 hover:border hover:border-slate-200"
        }
      >
        <div
          className={
            "text-slate-700 flex-1 flex flex-row items-center justify-center pl-2 overflow-hidden"
          }
        >
          {input}
        </div>
        <div
          className={
            "text-slate-700 flex-1 flex flex-row items-center justify-center pl-2 overflow-hidden"
          }
        >
          {output}
        </div>
        <div
          className={
            "text-slate-700 flex-1 flex flex-row items-center justify-center pl-2 overflow-hidden truncate"
          }
        >
          {explaination}
        </div>
        <div
          className={
            "flex-1 flex flex-row items-center justify-center pl-2 overflow-hidden"
          }
        >
          <button
            className={"mr-3 text-sky-500 hover:text-sky-600"}
            onClick={handleEditTestcase}
          >
            <EditIcon />
          </button>
          <button
            className={"text-sky-500 hover:text-sky-600"}
            onClick={handleDeleteTestcase}
          >
            <DeleteIcon />
          </button>
        </div>
      </div>

      {testcaseEditOverlayState && (
        <div className={"overlay"}>
          <TestcaseEdit
            setReload={setReload}
            setOverlay={setTestcaseEditOverlayState}
            testcase={testcase}
          />
        </div>
      )}
    </div>
  );
}

export default function TestcaseList({ id, reload, setReload, props }) {
  const [testcaseList, setTestcaseList] = useState([]);

  useEffect(() => {
    AdminApi.getAllTestcases(id).then((res) => {
      setTestcaseList(res.data.testcases);
    });
    setReload(false);
  }, [reload]);

  return (
    <div className={"w-full px-5 mt-5"}>
      <div
        className={
          "w-full h-[40px] bg-slate-200 rounded border border-slate-300 mb-2 flex flex-row px-3 gap-2 justify-around items-center font-semibold text-slate-800"
        }
      >
        <div className={"font-bold"}>{"Input"}</div>
        <div className={"font-bold pl-7"}>{"Output"}</div>
        <div className={"font-bold"}>{"Explaination"}</div>
        <div className={"font-bold pr-3"}>
          <SettingsIcon />
        </div>
      </div>
      {testcaseList.map((testcase) => (
        <TestcaseSlot
          testcaseId={testcase.id}
          input={testcase.input}
          output={testcase.output}
          explaination={testcase.explaination}
          setReload={setReload}
          key={testcase.id}
        />
      ))}
      {!testcaseList.length && (
        <div className={"font-medium text-slate-700 text-center mb-10 mt-5"}>
          There are no test case in records
        </div>
      )}
    </div>
  );
}
