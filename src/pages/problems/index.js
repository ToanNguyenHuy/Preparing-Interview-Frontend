import CategoryList from "@/pages/problems/components/CategoryList";
import ProblemFilter from "@/pages/problems/components/ProblemFilter";
import ProblemList from "@/pages/problems/components/ProblemList/problemList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { changeToListProblem } from "@/reducers/appRoutes/appRoutesReducer";
import { fetchProblems } from "@/reducers/problem/problemThunk";
import { problemListSelector } from "@/reducers/problem/problemSelector";
import { HARD_LEVEL, PROBLEM_STATUS } from "@/constants/problemStatus";

export default function ProblemScreen(props) {
  const dispatch = useDispatch();
  const listProblem = useSelector(problemListSelector);

  const [filter, setFilter] = useState({
    hardLevel: HARD_LEVEL.ALL,
    status: PROBLEM_STATUS.ALL,
    categories: ["all"],
  });

  useEffect(() => {
    dispatch(changeToListProblem());
    dispatch(fetchProblems());
  }, [1]);

  return (
    <main className={"w-full flex flex-col justify-center px-5 py-5"}>
      <div className={"w-full h-24 flex justify-between px-5"}>
        <ProblemFilter filter={filter} setFilter={setFilter} />
        <CategoryList filter={filter} setFilter={setFilter} />
      </div>

      <div className={"h-full"}>
        <ProblemList />
      </div>
    </main>
  );
}
