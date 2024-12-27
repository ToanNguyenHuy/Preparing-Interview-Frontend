import { TextField } from "@mui/material";

export default function ProblemName({ value, onChange, ...props }) {
  const handleChangeName = function (event) {
    if (typeof onChange === "function") {
      onChange(event.target.value);
    } else {
      console.error("Admin/ProblemName: onChange is not a function");
    }
  };

  return (
    <TextField
      size="medium"
      id="problemName"
      label="Tên đề bài"
      variant="standard"
      value={value}
      onChange={handleChangeName}
      className={"w-full input-field input-field-title"}
    />
  );
}
