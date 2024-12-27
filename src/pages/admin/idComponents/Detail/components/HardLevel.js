import { HARD_LEVEL } from "@/constants/problemStatus";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect } from "react";

export default function HardLevel({ value, onChange, ...props }) {
  if (value === undefined) {
    value = HARD_LEVEL.EASY;
  }

  const getColorByValue = function () {
    switch (value) {
      case HARD_LEVEL.EASY:
        return "#62e192";

      case HARD_LEVEL.MEDIUM:
        return "orange";

      case HARD_LEVEL.HARD:
        return "red";
    }
  };

  useEffect(() => {}, [value]);

  const handleChangeHardLevel = function (event) {
    if (typeof onChange === "function") {
      onChange(event.target.value);
    } else {
      console.error("Admin/HardLevel: onChange is not a function");
    }
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="hardLevel" className={"overflow-visible"}>
          Hard Level
        </InputLabel>
        <Select
          size={"medium"}
          labelId="hardLevel"
          id="hardLevelId"
          value={value}
          label="Hard Level"
          onChange={handleChangeHardLevel}
          style={{
            color: getColorByValue(),
          }}
        >
          <MenuItem value={HARD_LEVEL.EASY} className={"text-green-500"}>
            Easy
          </MenuItem>
          <MenuItem value={HARD_LEVEL.MEDIUM} className={"text-yellow-500"}>
            Medium
          </MenuItem>
          <MenuItem value={HARD_LEVEL.HARD} className={"text-red-500"}>
            Hard
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
