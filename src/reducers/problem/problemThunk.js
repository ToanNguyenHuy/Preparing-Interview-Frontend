import AdminApi from "@/network/adminApi";
import AuthApi from "@/network/authApi";
import ProblemApi from "@/network/problemApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchProblems = createAsyncThunk("problem/fetchProblems", async () => {
  try {
    let response = await ProblemApi.getAllProblem();
    let responseStatus = await ProblemApi.getAllSubmissions();

    console.log(responseStatus.data.listSubmissions);


    if (responseStatus.data.listSubmissions) {
      response.data.problems.forEach((problem) => {
        const submissions = responseStatus.data.listSubmissions.filter(
          (submission) => submission.problemId === problem.id
        );
        if (submissions.length > 0) {
          const submissionAC = submissions.find(
            (submission) => submission.status === "AC"
          );
          problem.status = submissionAC
            ? submissionAC.status
            : submissions[0].status;
        } else {
          problem.status = "NONE";
        }
      });
    }

    return response.data;
  } catch (error) {
    console.log("🚀 ~ file: problemThunk.js:12 ~ error:", error.response);
  }
});

const getProblemByFilter = createAsyncThunk(
  "problem/getProblemByFilter",
  async (
    { hardLevel: hardLevel, status: status, categories: categories },
    thunkApi
  ) => {
    try {
      let response = await ProblemApi.getProblemByFilter(
        hardLevel,
        status,
        categories
      );
      let responseStatus = await ProblemApi.getAllSubmissions();

      if (responseStatus?.data?.listSubmissions) {
        response.data.problems.forEach((problem) => {
          const submissions = responseStatus.data.listSubmissions.filter(
            (submission) => submission.problemId === problem.id
          );
          if (submissions.length > 0) {
            const submissionAC = submissions.find(
              (submission) => submission.status === "AC"
            );
            problem.status = submissionAC
              ? submissionAC.status
              : submissions[0].status;
          } else {
            problem.status = "NONE";
          }
        });
      } else {
        response.data.problems.forEach((problem) => {
          problem.status = "NONE";
        });
      }

      if (status === "solved") {
        response.data.problems = response.data.problems.filter(
          (problem) => problem.status === "AC"
        );
      } else if (status === "none") {
        response.data.problems = response.data.problems.filter(
          (problem) => problem.status === "NONE"
        );
      } else if (status === "unsolved") {
        response.data.problems = response.data.problems.filter(
          (problem) => problem.status !== "AC" && problem.status !== "NONE"
        );
      }

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("🚀 ~ file: problemThunk.js:21 ~ error:", error);
    }
  }
);

const getProblemById = createAsyncThunk(
  "problem/getAProblem",
  async ({ problemId: problemId }, thunkApi) => {
    try {
      let response = await ProblemApi.getProblemById(problemId);
      let responseOwnerInfo = await AuthApi.getUserInfo({
        id: response.data.problem.ownerId,
      });

      response.data.problem.ownerName = responseOwnerInfo.data.username;
      return response.data;
    } catch (error) {
      console.error("🚀 ~ file: problemThunk.js:33 ~ error:", error);
    }
  }
);

const updateProblemById = createAsyncThunk(
  "problem/updateProblem",
  async (problemInfo, thunkApi) => {
    try {
      console.log(problemInfo);
      const response = await AdminApi.updateProblem(problemInfo);
      return response.data;
    } catch (error) {
      console.error("🚀 ~ file: problemThunk.js:45 ~ error:", error);
    }
  }
);

const runCodeWithoutSaving = createAsyncThunk(
  "problem/runCode",
  async (codeInfo, thunkApi) => {
    try {
      if (codeInfo.language.indexOf("cpp") !== -1) {
        codeInfo.language = "cpp";
      }
      const response = await ProblemApi.runWithoutSaving(codeInfo);
      return response.data;
    } catch (error) {
      console.error("🚀 ~ file: problemThunk.js:60 ~ error:", error);
    }
  }
);

const runCodeWithSaving = createAsyncThunk(
  "problem/runCodeAndSave",
  async (codeInfo, thunkApi) => {
    try {
      if (codeInfo.language.indexOf("cpp") !== -1) {
        codeInfo.language = "cpp";
      }
      const response = await ProblemApi.runWithSaving(codeInfo);
      return response.data;
    } catch (error) {
      console.error("🚀 ~ file: problemThunk.js:53 ~ error:", error);
    }
  }
);

const getSubmissionById = createAsyncThunk(
  "problem/getSubmissionById",
  async (problemInfo, thunkApi) => {
    try {
      const response = await ProblemApi.getSubmissionById(problemInfo);
      return response.data;
    } catch (error) {
      console.error("🚀 ~ file: problemThunk.js:53 ~ error:", error);
    }
  }
);

const getAllSubmissions = createAsyncThunk(
  "problem/getAllSubmissions",
  async (thunkApi) => {
    try {
      const response = await ProblemApi.getAllSubmissions();
      return response.data;
    } catch (error) {
      console.error("🚀 ~ file: problemThunk.js:53 ~ error:", error);
    }
  }
);

export {
  fetchProblems,
  getProblemByFilter,
  getProblemById,
  updateProblemById,
  runCodeWithoutSaving,
  runCodeWithSaving,
  getSubmissionById,
  getAllSubmissions,
};
