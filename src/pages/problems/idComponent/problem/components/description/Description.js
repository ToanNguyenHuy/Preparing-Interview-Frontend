import ReactMarkdown from "react-markdown";
import ReactMarkdownRender from "@/shared/utilities/MarkdownRender";
import ASSET from "@/shared/assets";
import { Roboto_Mono } from "next/font/google";
import { HARD_LEVEL } from "@/constants/problemStatus";
import Skeleton from "react-loading-skeleton";

const roboto = Roboto_Mono({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

function Title({ title, ownerName, hardLevel, ...props }) {
  return (
    <div
      className={`font-bold text-xl text-slate-900 px-3 pt-2 pb-1 flex justify-between items-end border rounded
        ${hardLevel === HARD_LEVEL.EASY && "bg-green-200 border-green-300"}
        ${hardLevel === HARD_LEVEL.MEDIUM && "bg-yellow-200 border-yellow-300"}
        ${hardLevel === HARD_LEVEL.HARD && "bg-red-300 border-red-400"}`}
    >
      {title}
      <div className={"font-normal text-base text-sky-800"}>{ownerName}</div>
    </div>
  );
}

function ProblemDescription({ description, title, ...props }) {
  return (
    <div className={"mt-4 bg-white px-2 py-1 text-slate-800 text-sm rounded"}>
      <div className={"font-bold text-base text-slate-900"}>{title}</div>
      {description ? (
        <ReactMarkdownRender markdownSource={description} />
      ) : (
        description !== null ? <>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-16 mb-2 animate-pulse"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2 animate-pulse"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w- mb-2 animate-pulse"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2 animate-pulse"></div>
        </>
        : ""
      )}
    </div>
  );
}

function ProblemExample({
  title,
  description,
  img,
  input,
  output,
  explaination,
}) {
  return (
    <div
      className={
        "mt-4 bg-white rounded border border-slate-300 px-2 py-1 text-slate-800 text-sm"
      }
    >
      <div className={"font-bold text-base text-slate-900"}>{title}</div>

      <p>
        <strong>Input:</strong> {input}
      </p>
      <p>
        <strong>Output:</strong> {output}
      </p>
      <p>
        <strong>Explaination:</strong> {explaination}
      </p>
    </div>
  );
}

export default function Description({ problemInfo, listDemoTestCase, ...props }) {
  return (
    <div className={"w-full flex flex-col"}>
      <Title title={problemInfo ? problemInfo.problemName : ""} />
      <ProblemDescription description={problemInfo ? problemInfo.description : ""} />
      <ProblemDescription description={problemInfo ? problemInfo.statement : ""} />
      <ProblemDescription description={problemInfo ? problemInfo.input : ""} />
      <ProblemDescription description={problemInfo ? problemInfo.output : ""} />
      {
        listDemoTestCase ? listDemoTestCase.map((testCase, index) =>
          <ProblemExample
            key={"demoTestCase" + index}
            title={"Example " + (index + 1)}
            input={testCase.input}
            output={testCase.output}
            explaination={testCase.explaination}
          />
        ) : <></>
      }
      <ProblemDescription description={problemInfo ? problemInfo.constraint : ""} />
      <div className="h-12 w-full" />
    </div>
  )
}
