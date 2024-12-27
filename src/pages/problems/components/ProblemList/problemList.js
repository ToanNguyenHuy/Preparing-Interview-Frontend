import Difficulty from "@/pages/problems/components/ProblemList/Difficulty";
import Status from "@/pages/problems/components/ProblemList/Status";
import Title from "@/pages/problems/components/ProblemList/Title";
import { PROBLEM_STATUS } from "@/constants/problemStatus";
import { useSelector } from "react-redux";
import { problemListSelector } from "@/reducers/problem/problemSelector";

function ProblemListHeader(props) {
  return (
    <div
      className={
        "w-full h-[40px] bg-slate-200 rounded border border-slate-300 flex flex-row px-3 gap-2"
      }
    >
      <Status status={PROBLEM_STATUS.HEADER} />
      <Title problemName={PROBLEM_STATUS.HEADER} />
      <Difficulty hardLevel={PROBLEM_STATUS.HEADER} />
    </div>
  );
}

/**
 * @param {ProblemSlot} problemSlot
 * @returns {JSX.Element}
 * @constructor
 */
function ProblemListSlot({ problemSlotDetails }) {
  let status = "";

  if (problemSlotDetails.status === "NONE") {
    status = "";
  } else if (problemSlotDetails.status === "AC") {
    status = PROBLEM_STATUS.SOLVED;
  } else {
    status = PROBLEM_STATUS.UNSOLVED;
  }

  return (
    <div
      className={
        "w-full h-[40px] bg-slate-200 rounded flex flex-row px-3 gap-2 my-2 odd:bg-slate-50 even:bg-slate-100 hover:border hover:border-slate-200"
      }
    >
      <Status status={status} />
      {/* <Status status={PROBLEM_STATUS.SOLVED} /> */}
      <Title
        problemName={problemSlotDetails.problemName}
        problemId={problemSlotDetails.id}
      />
      <Difficulty hardLevel={problemSlotDetails.hardLevel} />
    </div>
  );
}
export default function ProblemList({ ...props }) {
  const listProblem = useSelector(problemListSelector);

  return (
    <div className={"w-full h-full px-14 mt-10 drop-shadow"}>
      <ProblemListHeader />
      {listProblem.map((e, i) => {
        return (
          <ProblemListSlot key={"ProblemListSlot" + i} problemSlotDetails={e} />
        );
      })}
      {!listProblem.length && (
        <div className={"font-medium text-slate-700 text-center mb-10 mt-5"}>
          There are no problem in records
        </div>
      )}
    </div>
  );
}
