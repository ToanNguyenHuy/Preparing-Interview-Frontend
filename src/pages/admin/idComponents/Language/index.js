import ExecuteButton from "@/pages/problems/idComponent/console/components/ExcuteButton";
import { BUTTON_TYPE } from "@/pages/problems/idComponent/console/components/ExcuteButton";
import LanguageList from "./components/LanguageList";

export default function Language(props) {
  const handleSelectAllLanguages = () => {};

  return (
    <div className={"w-full h-screen flex flex-col drop-shadow"}>
      <LanguageList />
    </div>
  );
}
