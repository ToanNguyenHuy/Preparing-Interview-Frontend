import { useEffect, useState } from "react";

export default function ButtonTab({
  title,
  isSelected,
  onClickCallback,
  props,
}) {
  const [buttonStyle, setButtonStyle] = useState("mx-2");

  const handleClick = function () {
    if (typeof onClickCallback === "function") {
      onClickCallback();
    } else {
      console.error("ButtonTab: onClickCallback is not a function");
    }
  };

  useEffect(() => {
    if (isSelected) {
      setButtonStyle(
        (state) =>
          "mx-2 py-1 text-slate-900 font-semibold border-b-2 border-slate-900"
      );
    } else {
      setButtonStyle(
        (state) => "mx-2 py-1 text-slate-800 font-normal hover:text-sky-600"
      );
    }
  });

  return (
    <button className={buttonStyle} onClick={handleClick}>
      {title}
    </button>
  );
}
