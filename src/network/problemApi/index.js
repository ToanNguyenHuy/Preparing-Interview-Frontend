import { api_code_executing, api_pb } from "..";

const ProblemApi = {};

ProblemApi.getAllProblem = function () {
  return api_pb().get("/api/problem/getAllProblems");
};

ProblemApi.getProblemByFilter = function (hardLevel, status, categories) {
  let ct = categories.length ? "&ct[]=" + categories.join("&ct[]=") : "";
  if (categories.includes("all")) {
    ct = "";
  }
  return api_pb().get(
    "/api/problem/getProblem?hl=" + hardLevel + "&st=" + status + ct
  );
};

ProblemApi.getProblemById = function (id) {
  return api_pb().get("/api/problem/getAProblem/" + id);
};

ProblemApi.updateProblem = ({
  id,
  hardLevel,
  problemName,
  description,
  statement,
  input,
  output,
  constraint,
  categories
}) => {
  return api_pb().post("/api/problem/edit", {
    problemId: id,
    hardLevel: hardLevel,
    problemName: problemName,
    description: description,
    statement: statement,
    input: input,
    output: output,
    constraint: constraint,
    categories: categories
  });
};

ProblemApi.runWithoutSaving = ({ code, problemId, language, timeLimited, memoryLimited }) => {
  console.log({
    source: code,
    problemId: problemId,
    language: language,
    timeLimited : timeLimited,
    memoryLimited : memoryLimited
  })
  return api_code_executing().post("/runWithoutSaving", {
    source: code,
    problemId: problemId,
    language: language,
    timeLimited : timeLimited,
    memoryLimited : memoryLimited
  });
};

ProblemApi.runWithSaving = ({ code, problemId, language, timeLimited, memoryLimited }) => {
  return api_code_executing().post("/runWithSaving", {
    source: code,
    problemId: problemId,
    language: language,
    timeLimited : timeLimited,
    memoryLimited : memoryLimited
  });
};

ProblemApi.getSubmissionById = ({ problemId }) => {
  return api_code_executing().post("/getSubmissionById", {
    problemId: problemId,
  });
};

ProblemApi.getAllSubmissions = () => {
  return api_code_executing().get("/getAllSubmissions");
};

export default ProblemApi;
