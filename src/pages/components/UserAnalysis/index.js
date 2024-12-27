import { HARD_LEVEL } from "@/constants/problemStatus";

const color = {
  easy: ["bg-emerald-200", "Easy", "hover:border-emerald-300"],
  medium: ["bg-yellow-200", "Medium", "hover:border-yellow-300"],
  hard: ["bg-red-200", "Hard", "hover:border-red-300"],
};

const COLOR = 0;
const TITLE = 1;
const HOVER = 2;

function AnalysisSlot({ title, value, props }) {
  return (
    <div
      className={`w-full h-10 ${color[title][COLOR]} flex flex-row justify-between items-center rounded px-3 mb-2 overflow-hidden text-slate-800 hover:border ${color[title][HOVER]}`}
    >
      <h5 className={"font-medium"}>{color[title][TITLE]}</h5>
      <div className={"text-sm text-slate-700"}>{value}</div>
    </div>
  );
}

export default function UserAnalysis(props) {
  return (
    <div className={"w-1/3 py-3 px-3"}>
      <div className={"flex justify-between px-4"}>
        <h3 className={"text-slate-800"}>Analysis</h3>
      </div>
      <AnalysisSlot title={HARD_LEVEL.EASY} value={"10/100"} />
      <AnalysisSlot title={HARD_LEVEL.MEDIUM} value={"2/4"} />
      <AnalysisSlot title={HARD_LEVEL.HARD} value={"2/4"} />
    </div>
  );
}
