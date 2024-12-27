import EditIcon from "@mui/icons-material/Edit";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { useEffect, useState } from "react";

function LanguageSlot({ language, timelimit, memorylimit, active, props }) {
  const [editState, setEditState] = useState(false);

  const [activeState, setActiveState] = useState(active);
  const [timelimitState, setTimelimitState] = useState(timelimit);
  const [memorylimitState, setMemorylimitState] = useState(memorylimit);

  const handleSaveLanguage = () => {
    //call api to save language and reset state
  };

  const handleCloseLanguage = () => {
    setTimelimitState(timelimit);
    setMemorylimitState(memorylimit);
    setEditState(false);
  };

  const handleActiveChange = (e) => {
    setActiveState(!activeState);
  };

  const handleTimelimitChange = (e) => {
    setTimelimitState(e.target.value);
  };

  const handleMemorylimitChange = (e) => {
    setMemorylimitState(e.target.value);
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
            "text-slate-700 flex-1 flex flex-row items-center justify-start pl-2 overflow-hidden text-left"
          }
        >
          <input
            type="checkbox"
            className={"ml-14 mr-2"}
            defaultChecked={active}
            onChange={handleActiveChange}
          />
          {language}
        </div>
        <div
          className={
            "text-slate-700 flex-1 flex flex-row items-center justify-center pr-8 overflow-hidden"
          }
        >
          {timelimitState}
        </div>
        <div
          className={
            "text-slate-700 flex-1 flex flex-row items-center justify-center pl-2 overflow-hidden"
          }
        >
          {memorylimitState}
        </div>
        {editState ? (
          <div
            className={
              "text-slate-700 flex-1 flex flex-row items-center justify-center pl-2 overflow-hidden"
            }
          >
            <button onClick={handleSaveLanguage} className={"mr-2"}>
              <CheckCircleOutlineOutlinedIcon
                className={"text-sky-500 hover:text-sky-600"}
              />
            </button>
            <button onClick={handleCloseLanguage}>
              <CancelOutlinedIcon
                className={"text-red-400 hover:text-red-500"}
              />
            </button>
          </div>
        ) : (
          <div
            className={
              "text-slate-700 flex-1 flex flex-row items-center justify-center pl-2 overflow-hidden"
            }
          >
            <button
              onClick={() => {
                setEditState(true);
              }}
            >
              <EditIcon className={"text-sky-500 hover:text-sky-600"} />
            </button>
          </div>
        )}
      </div>
      <div
        className={`w-full bg-slate-200 rounded flex flex-row items-center px-3 gap-2 odd:bg-slate-50 even:bg-slate-100 hover:border hover:border-slate-200 overflow-hidden
          ${editState ? " h-10 mb-2" : " h-0"}`}
      >
        <div className={"flex-1"}></div>
        <div className={"flex-1 ml-8"}>
          <div className={"flex justify-between relative radio-list w-11/12"}>
            <input
              type="radio"
              value="1"
              id={"timelimit-1" + language}
              onChange={handleTimelimitChange}
              checked={timelimitState === "1"}
            />
            <input
              type="radio"
              value="2"
              id={"timelimit-2" + language}
              onChange={handleTimelimitChange}
              checked={timelimitState === "2"}
            />
            <input
              type="radio"
              value="3"
              id={"timelimit-3" + language}
              onChange={handleTimelimitChange}
              checked={timelimitState === "3"}
            />
            <input
              type="radio"
              value="4"
              id={"timelimit-4" + language}
              onChange={handleTimelimitChange}
              checked={timelimitState === "4"}
            />
            <input
              type="radio"
              value="5"
              id={"timelimit-5" + language}
              onChange={handleTimelimitChange}
              checked={timelimitState === "5"}
            />
          </div>
          <div
            className={
              "flex justify-between w-11/12 text-center text-sm font-medium text-cyan-800"
            }
          >
            <label
              htmlFor={"timelimit-1" + language}
              className={`${
                timelimitState === "1" && "text-cyan-500 font-bold"
              }`}
            >
              1
            </label>
            <label
              htmlFor={"timelimit-2" + language}
              className={`${
                timelimitState === "2" && "text-cyan-500 font-bold"
              }`}
            >
              2
            </label>
            <label
              htmlFor={"timelimit-3" + language}
              className={`${
                timelimitState === "3" && "text-cyan-500 font-bold"
              }`}
            >
              3
            </label>
            <label
              htmlFor={"timelimit-4" + language}
              className={`${
                timelimitState === "4" && "text-cyan-500 font-bold"
              }`}
            >
              4
            </label>
            <label
              htmlFor={"timelimit-5" + language}
              className={`${
                timelimitState === "5" && "text-cyan-400 font-bold"
              }`}
            >
              5
            </label>
          </div>
        </div>
        <div className={"flex-1 ml-8"}>
          <div className={"flex justify-between relative radio-list w-11/12"}>
            <input
              type="radio"
              value="128"
              id={"memorylimit-1" + language}
              onChange={handleMemorylimitChange}
              checked={memorylimitState === "128"}
            />
            <input
              type="radio"
              value="256"
              id={"memorylimit-2" + language}
              onChange={handleMemorylimitChange}
              checked={memorylimitState === "256"}
            />
            <input
              type="radio"
              value="512"
              id={"memorylimit-3" + language}
              onChange={handleMemorylimitChange}
              checked={memorylimitState === "512"}
            />
            <input
              type="radio"
              value="1024"
              id={"memorylimit-4" + language}
              onChange={handleMemorylimitChange}
              checked={memorylimitState === "1024"}
            />
            <input
              type="radio"
              value="2048"
              id={"memorylimit-5" + language}
              onChange={handleMemorylimitChange}
              checked={memorylimitState === "2048"}
            />
          </div>
          <div
            className={
              "flex justify-between w-11/12 text-center text-sm font-medium text-cyan-800"
            }
          >
            <label
              htmlFor={"memorylimit-1" + language}
              className={`${
                memorylimitState === "128" && "text-cyan-500 font-bold"
              }`}
            >
              128
            </label>
            <label
              htmlFor={"memorylimit-2" + language}
              className={`${
                memorylimitState === "256" && "text-cyan-500 font-bold"
              }`}
            >
              256
            </label>
            <label
              htmlFor={"memorylimit-3" + language}
              className={`${
                memorylimitState === "512" && "text-cyan-500 font-bold"
              }`}
            >
              512
            </label>
            <label
              htmlFor={"memorylimit-4" + language}
              className={`${
                memorylimitState === "1024" && "text-cyan-500 font-bold"
              }`}
            >
              1024
            </label>
            <label
              htmlFor={"memorylimit-5" + language}
              className={`${
                memorylimitState === "2048" && "text-cyan-500 font-bold"
              }`}
            >
              2048
            </label>
          </div>
        </div>
        <div className={"flex-1"}></div>
      </div>
    </div>
  );
}

export default function LanguageList({ props }) {
  //call api get data for LanguageSlot

  return (
    <div className={"w-full px-5 mt-5"}>
      <div
        className={
          "w-full h-[40px] bg-slate-200 rounded border border-slate-300 mb-2 flex flex-row px-3 gap-2 justify-around items-center font-semibold text-slate-800"
        }
      >
        <div className={"font-bold"}>{"Language"}</div>
        <div className={"font-bold pl-5"}>{"Time Limit (seconds)"}</div>
        <div className={"font-bold pr-3"}>{"Memory Limit (MB)"}</div>
        <div className={"font-bold pr-10"}>
          <SettingsIcon />
        </div>
      </div>
      <LanguageSlot
        language={"C++"}
        timelimit={"1"}
        memorylimit={"128"}
        active
      />
      <LanguageSlot
        language={"Golang"}
        timelimit={"1"}
        memorylimit={"128"}
        active
      />
    </div>
  );
}
