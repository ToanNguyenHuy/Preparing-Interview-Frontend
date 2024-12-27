import HardLevel from "@/pages/admin/idComponents/Detail/components/HardLevel";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import ProblemName from "@/pages/admin/idComponents/Detail/components/ProblemName";
import dynamic from "next/dynamic";

import { useDispatch, useSelector } from "react-redux";
import {
  getProblemById,
  updateProblemById,
} from "@/reducers/problem/problemThunk";
import { problemByIdSelector } from "@/reducers/problem/problemSelector";
import {
  resetSelectedProblem,
  updateSelectedProblem,
} from "@/reducers/problem/problemReducer";
import { useRouter } from "next/router";
import Category from "./components/Category";
import { Button } from "@mui/material";
import AdminApi from "@/network/adminApi";
import { HARD_LEVEL } from "@/constants/problemStatus";

const MarkdownEditor = dynamic(
  () => import("@/pages/admin/idComponents/Detail/components/MarkdownEditor"),
  {
    ssr: false,
  }
);

export default function Detail({ id, props }) {
  const router = useRouter();
  const problemInfo = useSelector(problemByIdSelector);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(resetSelectedProblem());
    if (id) {
      dispatch(getProblemById({ problemId: id }));
      setLoading(false);
    }

    return () => {
      dispatch(resetSelectedProblem());
    };
  }, [id]);

  const handleChange = (field, value) => {
    dispatch(updateSelectedProblem({ field: field, value: value }));
  };

  const handleUpdateProblem = () => {
    Swal.fire({
      title: "Xác nhận",
      text: "Bạn có chắc chắn muốn sửa không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        // Xử lý khi người dùng xác nhận
        dispatch(updateProblemById(problemInfo));
        Swal.fire("Thông báo", "Lưu thành công", "success");        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Thông báo", "Có chuyện gì đó xảy ra trong quá trình lưu", "error");        
        // Xử lý khi người dùng hủy
      }
    });
  };

  const handleDeleteProblem = () => {
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
            AdminApi.deleteAProblem(id).then(router.push("/admin"));
            Swal.fire("Thông báo", "Deleted Successfully!", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Xử lý khi người dùng hủy
      }
    });
    

  };

  const handleRenderDetail = function () {
    if (loading) {
      return <div />;
    } else {
      return (
        <div
          className={
            "h-screen px-5 pt-10 pb-14 overflow-y-scroll flex flex-col gap-5"
          }
        >
          <ProblemName
            value={problemInfo.problemName ? problemInfo.problemName : ""}
            onChange={handleChange.bind(null, "problemName")}
          />
          <div className={"mt-5 flex justify-between items-end"}>
            <div className={"w-2/3"}>
              <HardLevel
                value={problemInfo.hardLevel ?? HARD_LEVEL.EASY}
                onChange={handleChange.bind(null, "hardLevel")}
              />
              <Category
                value={problemInfo.categories ?? ""}
                onChange={handleChange.bind(null, "categories")}
              />
            </div>
            <div className={"w-3/12 h-14 flex justify-end gap-3"}>
              <Button
                size="small"
                variant="contained"
                onClick={handleDeleteProblem}
                className={
                  "w-1/2 bg-red-400 hover:bg-red-500 font-bold text-xl text-center"
                }
              >
                Delete
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={handleUpdateProblem}
                className={
                  "w-1/2 bg-sky-500 hover:bg-sky-600 font-bold text-xl text-center"
                }
              >
                Save
              </Button>
            </div>
          </div>
          <MarkdownEditor
            title="Description"
            value={problemInfo.description ?? ""}
            onChange={handleChange.bind(null, "description")}
          />
          <MarkdownEditor
            editorClass="h-48"
            title="Problem Statement"
            value={problemInfo.statement ?? ""}
            onChange={handleChange.bind(null, "statement")}
          />
          <MarkdownEditor
            editorClass="h-48"
            title="Input format"
            value={problemInfo.input ?? ""}
            onChange={handleChange.bind(null, "input")}
          />
          <MarkdownEditor
            editorClass="h-48"
            title="Output format"
            value={problemInfo.output ?? ""}
            onChange={handleChange.bind(null, "output")}
          />
          <MarkdownEditor
            editorClass="h-48"
            title="Constraint"
            value={problemInfo.constraint ?? ""}
            onChange={handleChange.bind(null, "constraint")}
          />
        </div>
      );
    }
  };

  return <>{handleRenderDetail()}</>;
}
