import Link from "next/link";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useSelector } from "react-redux";
import {
  getListAllSubmissionsSelector,
  problemListSelector,
} from "@/reducers/problem/problemSelector";
import moment from "moment/moment";
import { useEffect } from "react";
import { useState } from "react";

function HistorySlot({ submissionDetail, ...props }) {
  console.log(submissionDetail);
  const [textColor, setTextColor] = useState("text-red-600");

  useEffect(() => {
    if (submissionDetail.status === "AC") {
      setTextColor("text-green-500");
    }
  }, [submissionDetail]);

  return (
    <div
      className={
        "w-full h-10 bg-slate-200 flex flex-row justify-between items-center rounded px-3 mb-2 overflow-hidden text-slate-800 hover:border hover:border-slate-300"
      }
    >
      <Link
        href={"/problems/" + submissionDetail.problemId}
        className={`font-medium hover:text-cyan-700 ${textColor}`}
      >
        {submissionDetail.problemName}
      </Link>
      <div className={"text-sm text-slate-700"}>
        {moment(submissionDetail.updatedAt).format("LT, LL")}
      </div>
    </div>
  );
}

export default function HistoryList(props) {
  const listAllSubmissions = useSelector(getListAllSubmissionsSelector);
  const listProblem = useSelector(problemListSelector);

  const listTopSubmissions = listAllSubmissions?.reduce((acc, submission) => {
    if (acc.length >= 5) {
      return acc;
    }

    const existingSubmission = acc.find(
      (item) => item.problemId === submission.problemId
    );
    if (!existingSubmission) {
      const problem = listProblem.find(
        (problem) => problem.id === submission.problemId
      );
      if (problem) {
        const sub = { ...submission, problemName: problem.problemName };
        acc.push(sub);
      }
    }

    return acc;
  }, []) || [];

  return (
    <div className={"w-full py-3"}>
      <div className={"flex justify-between px-4"}>
        <h3 className={"text-slate-800"}>List Submission</h3>
        <Link
          href={"/problems"}
          className={"text-sm text-slate-600 hover:text-slate-800 pt-2"}
        >
          View problems <KeyboardArrowRightIcon />
        </Link>
      </div>
      {listTopSubmissions.map((submission) => (
        <HistorySlot key={submission.id} submissionDetail={submission} />
      ))}
    </div>
  );
}
