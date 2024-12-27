import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentNeutralOutlinedIcon from "@mui/icons-material/SentimentNeutralOutlined";
import { PROBLEM_STATUS } from "@/constants/problemStatus";
import { useEffect, useState } from "react";
/**
 * @param {PROBLEM_STATUS} content
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function Status({ status, ...props }) {
  const [displayContent, setDisplayContent] = useState("");

  useEffect(() => {
    setDisplayContent(getDisplayContent());
  }, []);

  function getDisplayContent() {
    switch (status) {
      case PROBLEM_STATUS.NONE:
        return "";

      case PROBLEM_STATUS.HEADER:
        return <div className={"font-semibold"}>Status</div>;

      case PROBLEM_STATUS.SOLVED:
        return <SentimentSatisfiedAltOutlinedIcon color="success" />;

      case PROBLEM_STATUS.UNSOLVED:
        return <SentimentDissatisfiedOutlinedIcon className={"text-red-500"} />;

      default:
        return <SentimentNeutralOutlinedIcon color="primary" />;
    }
  }

  return (
    <div
      className={
        "pl-2 w-16 text-center flex flex-row items-center justify-center"
      }
    >
      {status === PROBLEM_STATUS.HEADER && (
        <div className={"font-semibold"}>Status</div>
      )}
      {status === PROBLEM_STATUS.SOLVED && (
        <SentimentSatisfiedAltOutlinedIcon color="success" />
      )}
      {status === PROBLEM_STATUS.UNSOLVED && (
        <SentimentDissatisfiedOutlinedIcon className={"text-red-500"} />
      )}
      {status === "" && <SentimentNeutralOutlinedIcon color="primary" />}
    </div>
  );
}
