import { useEffect, useState } from "react";

export const BUTTON_TYPE = {
  RUN: "run",
  SUBMIT: "submit",
  CREATE: "create",
};

export default function ExecuteButton({
  type,
  handleRunClick,
  title,
  ...props
}) {
  const [buttonStyle, setButtonStyle] = useState("");

  useEffect(() => {
    if (type === BUTTON_TYPE.CREATE || type === BUTTON_TYPE.SUBMIT) {
      setButtonStyle("text-white bg-green-500 hover:bg-green-600");
    } else {
      setButtonStyle("text-slate-700 bg-slate-50 hover:bg-slate-100");
    }
  }, []);

  const onClick = function () {
    if (typeof handleRunClick === "function") {
      handleRunClick();
    } else {
      console.error("RunButton: handleRunClick is not a function");
    }
  };

  return (
    <button
      className={`${
        props.className ? props.className : ""
      } py-[6px] px-4 rounded-md ${buttonStyle} font-semibold drop-shadow`}
      onClick={onClick}
    >
      {type === BUTTON_TYPE.SUBMIT
        ? "Submit"
        : type === BUTTON_TYPE.RUN
        ? "Run"
        : title}
    </button>
  );
}
