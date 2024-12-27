import Difficulty from "./Difficulty";
import Title from "./Title";
import Status from "./Status";
import { HARD_LEVEL, PROBLEM_STATUS } from "@/constants/problemStatus";


function ProblemListHeader(props) {
  return (
    <div
      className={
        "w-full h-[40px] bg-blue-300 flex flex-row even:bg-[#F7F8FA] odd:bg-white"
      }
    >
      <Status status={PROBLEM_STATUS.HEADER} />
      <Title title={PROBLEM_STATUS.HEADER} />
      <Difficulty hardLevel={PROBLEM_STATUS.HEADER} />
    </div>
  );
}

function ProblemListSlot(props) {
  return (
    <div
      className={
        "w-full h-[40px] bg-blue-300 flex flex-row even:bg-[#F7F8FA] odd:bg-white"
      }
    >
      <Status status={PROBLEM_STATUS.UNSOLVED} />
      <Title title={"Some thing that matter, you need to check this"} />
      <Difficulty hardLevel={HARD_LEVEL.MEDIUM} />
    </div>
  );
}
export default function Index(props) {
  const a = [
    1, 2, 5, 3, 4, 1, 2, 5, 3, 4, 1, 2, 5, 3, 4, 1, 2, 5, 3, 4, 1, 2, 5, 3, 4,
    1, 2, 5, 3, 4, 1, 2, 5, 3, 4, 1, 2, 5, 3, 4,
  ];
  return (
    <div className={"w-full h-full"}>
      <ProblemListHeader />
      {a.map((e, i) => {
        return <ProblemListSlot key={"ProblemListSlot" + i} />;
      })}
    </div>
  );
}
