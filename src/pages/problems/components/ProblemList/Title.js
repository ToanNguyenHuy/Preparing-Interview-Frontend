import { PROBLEM_STATUS } from "@/constants/problemStatus";
import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * @param {String | PROBLEM_STATUS.HEADER} title
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function Title({ problemName, problemId, ...props }) {
  const [displayContent, setDisplayContent] = useState("");

  useEffect(() => {
    setDisplayContent(getDisplayContent);
  }, []);

  function getDisplayContent() {
    switch (problemName) {
      case PROBLEM_STATUS.HEADER:
        return <div className={"font-semibold"}>Title</div>;

      default:
        return problemName;
    }
  }

  return (
    <div
      className={
        "flex-1 flex flex-row items-center justify-start pl-2 overflow-hidden"
      }
    >
      {problemName === PROBLEM_STATUS.HEADER ? (
        <div className={"font-semibold"}>Title</div>
      ) : (
        <Link
          href={"/problems/" + problemId}
          className={"hover:text-cyan-600 cursor-pointer text-slate-700"}
        >
          {problemName}
        </Link>
      )}
    </div>
  );
}
