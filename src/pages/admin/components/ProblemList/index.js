import AdminApi from "@/network/adminApi";
import Link from "next/link";
import { useState, useEffect } from "react";

function ProblemSlot({ title, problemId, owner, props }) {
  const href = "admin/" + problemId;
  return (
    <div
      className={
        "w-full h-[40px] bg-slate-200 rounded flex flex-row items-center px-3 gap-2 mb-2 odd:bg-slate-50 even:bg-slate-100 hover:border hover:border-slate-200"
      }
    >
      <Link
        href={href}
        className={
          "text-slate-700 flex-1 flex flex-row items-center justify-center pl-2 overflow-hidden hover:text-cyan-600 cursor-pointer"
        }
      >
        {title}
      </Link>
    </div>
  );
}

export default function ProblemList({ reload, setReload, props }) {
  const [problemList, setProblemList] = useState([]);

  useEffect(() => {
    AdminApi.getAllProblems().then((res) => {
      setProblemList(res.data.problems);
    }).catch((error) => console.log("problemList : useEffect : 35 " + error));
    setReload(false);
  }, [reload, setReload]);

  return (
    <div className={"w-full px-5 mt-5"}>
      <div
        className={
          "w-full h-[40px] bg-slate-200 rounded border border-slate-300 mb-2 flex flex-row px-3 gap-2 justify-around items-center font-semibold"
        }
      >
        <div>{"Tên đề bài"}</div>
      </div>
      {
        !problemList.length ? (
          <div className={"font-medium text-slate-700 text-center mb-10 mt-5"}>
            Chưa có đề bài nào được ghi nhận
          </div>
        )
          :
          problemList.map((problem) => (
            <ProblemSlot
              title={problem.problemName}
              problemId={problem.id}
              owner={problem.ownerId}
              key={problem.id}
            />
          ))
      }
    </div>
  );
}
