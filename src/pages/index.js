import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getUsername , getUserId } from "@/reducers/authentication/authenticationSelector";
import HistoryList from "./components/HistoryList";
import UserAnalysis from "./components/UserAnalysis";
import { useEffect } from "react";
import {
  fetchProblems,
  getAllSubmissions,
} from "@/reducers/problem/problemThunk";
import { changeToHomePage } from "@/reducers/appRoutes/appRoutesReducer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const username = useSelector(getUsername);

  useEffect(() => {
    dispatch(changeToHomePage());
    dispatch(fetchProblems());
    dispatch(getAllSubmissions());
  }, []);

  return (
    <main className={"w-full flex flex-col justify-center"}>
      <div
        className={"w-full h-60 bg-slate-300 flex items-end px-10 shadow-inner"}
      >
        {username ? (
          <div className={"h-1/2 text-2xl font-semibold text-slate-800"}>
            Welcome back <br />
            <span className={"font-black text-5xl"}>{username}</span>
          </div>
        ) : (
          <div className={"h-1/2 text-2xl font-semibold text-slate-800"}>
            You are logged in as <br />
            <span className={"font-black text-5xl"}>Guest</span>
          </div>
        )}
      </div>
      <div className={"w-full px-20 flex flex-row drop-shadow-sm"}>
        <HistoryList />
      </div>
    </main>
  );
}
