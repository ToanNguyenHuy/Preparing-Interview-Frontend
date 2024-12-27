

import ExecuteButton, {
  BUTTON_TYPE,
} from "@/pages/problems/idComponent/console/components/ExcuteButton";
import ReactMarkdownRender from "@/shared/utilities/MarkdownRender";
import { useEffect, useState } from "react";


import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/ext-language_tools";

import AceEditor from "react-ace";

function MarkdownPreview({ mardownSource, ...props }) {
  return (
    <div className={"w-full h-full"}>
      <ReactMarkdownRender markdownSource={mardownSource} />
    </div>
  );
}

export default function MarkdownEditor({
  title,
  value,
  onChange,
  editorClass,
  ...props
}) {
  const [editorClasses, setEditorClasses] = useState("flex flex-row w-full");

  useEffect(() => {
    if (editorClass) {
      setEditorClasses((state) => state + " " + editorClass);
    } else {
      setEditorClasses((state) => state + " " + "h-32");
    }
  }, [editorClass]);

  const [isShowPreview, setShowPreview] = useState(false);

  const handleShowPreview = function () {
    setShowPreview((state) => !state);
  };

  const handleChangeDescription = function (value) {
    if (typeof onChange === "function") {
      onChange(value);
    } else {
      console.error("Admin/ProblemDescription: onChange is not a function");
    }
  };

  return (
    <div className={"w-full"}>
      <div
        className={
          "w-full h-10 bg-slate-200 rounded-tl-md rounded-tr-md flex flex-row justify-between items-center px-3 border border-slate-300"
        }
      >
        <div className={"font-semibold"}>{title}</div>
        <ExecuteButton
          title={"Preview"}
          type={BUTTON_TYPE.CREATE}
          handleRunClick={handleShowPreview}
          className={"bg-sky-500 hover:bg-sky-600"}
        />
      </div>
      <div className={editorClasses}>
        <AceEditor
          className={"flex-1 border border-slate-300 text-slate-700"}
          placeholder="Insert your description here"
          mode={"markdown"}
          theme="textmate"
          name="blah2"
          onChange={handleChangeDescription}
          fontSize={15}
          width={"100%"}
          height={"100%"}
          showGutter={true}
          highlightActiveLine={true}
          showPrintMargin={false}
          value={value}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
        {isShowPreview ? (
          <div className={"px-2 h-full flex-1 overflow-y-scroll border"}>
            <MarkdownPreview mardownSource={value} />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div />
      <div
        className={
          "w-full h-3 bg-slate-200 rounded-bl-md rounded-br-md border border-slate-300"
        }
      />
    </div>
  );
}
