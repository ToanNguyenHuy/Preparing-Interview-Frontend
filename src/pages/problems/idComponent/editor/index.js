
import {useState} from "react";

import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-c_cpp";

import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import AceEditor from "react-ace";


export const LanguageEnum = {
  GOLANG: "golang",
  CPP: "c_cpp",
  JAVA: "java",
};

export const LanguageTemplate = {
  javascript: `function helloWorld(something) {
  console.log("helloWorld: " + something);
}
`,
  java: `class Main {\n  public static void main(String[] something) {
    System.out.println("helloWorld: " + something);
  }
}\n
`,
  python: `def helloWorld(something):
  print("helloWorld: " + something)
`,
  ruby: `def helloWorld(something)
  puts "helloWorld: " + something
end
`,
  golang: `func helloWorld(something string) {
  fmt.Println("helloWorld: " + something)
}
`,
  csharp: `public static void helloWorld(string something) {
  Console.WriteLine("helloWorld: " + something);
}
`,
  c_cpp: `#include <iostream>
#include <string>

void helloWorld(std::string something) {
  std::cout << "helloWorld: " << something << std::endl;
}`,
};

function ConfigEditorBar({ handleChangeLanguage, ...props }) {
  const [selectedLanguage, setLanguage] = useState(LanguageEnum.CPP);

  const onChangeLanguageType = function (language) {
    if (typeof handleChangeLanguage === "function") {
      handleChangeLanguage(language);
      setLanguage((curLanguage) => language);
    } else {
      console.error("ConfigEditorBar: handleChangeLanguage is not a function");
    }
  };

  return (
    <div
      className={
        "w-full h-9 bg-white rounded-t border-b border-slate-300 flex flex-row items-center px-2 drop-shadow-lg"
      }
    >
      <select
        name="pets"
        id="pet-select"
        value={selectedLanguage}
        onChange={(event) => {
          onChangeLanguageType(event.target.value);
        }}
        className={"cursor-pointer"}
      >
        {Object.keys(LanguageEnum).map((key, index) => {
          return (
            <option key={"LANGUAGE_KEY_" + index} value={LanguageEnum[key]}>
              {key.toLowerCase()}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default function TextEditor({
  value,
  onChangeCode,
  onChangeLanguage,
  ...props
}) {
  const [selectedLanguage, setLanguage] = useState(LanguageEnum.CPP);
  const [code, setCode] = useState(
    value === "" ? LanguageTemplate[selectedLanguage] : value
  );

  const handleChangeLanguage = function (language) {
    setLanguage(language);
    setCode(LanguageTemplate[language]);
    onChangeLanguage(language);
    onChangeCode(LanguageTemplate[language]);
  };

  const onLoad = () => {};
  const onChange = (value) => {
    setCode(value);
    onChangeCode(value);
  };

  return (
    <div className={"w-full h-full rounded-md flex flex-col"}>
      <ConfigEditorBar handleChangeLanguage={handleChangeLanguage} />
      <div className={"flex-1 drop-shadow-lg"}>
        <AceEditor
          placeholder="Insert your code inside of this"
          mode={selectedLanguage}
          theme="textmate"
          name="blah2"
          onLoad={onLoad}
          onChange={onChange}
          fontSize={15}
          width={"100%"}
          height={"100%"}
          showGutter={true}
          highlightActiveLine={true}
          showPrintMargin={false}
          value={code}
          setOptions={{
            useWorker: false,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
          className={"text-slate-800"}
        />
      </div>
      <div
        className={
          "w-full h-[15px] bg-white border-t border-slate-300 rounded-b drop-shadow-lg"
        }
      ></div>
    </div>
  );
}
