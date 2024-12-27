import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProblems,
  getProblemByFilter,
  getProblemById,
  getSubmissionById,
  getAllSubmissions,
  runCodeWithSaving,
  runCodeWithoutSaving,
  updateProblemById,
} from "./problemThunk";
import { actionAsyncStorage } from "next/dist/client/components/action-async-storage";

const problemSlice = createSlice({
  name: "problem",
  initialState: {
    listCategory: [],
    listProblem: [], // Khởi tạo mảng rỗng
    isLoading: false,
    error: null,

    // Use for doing page
    selectedProblem: {},
    demoTestCase: [],
    listLanguage: [],

    // Use for load submission
    listSubmission: [],
    selectedSubmission: 0,
    // Use for running result
    runningResult: {},
    isLoading: {},

    listAllSubmissions: [],
    selectedAllSubmissions: 0,
  },
  reducers: {
    resetSelectedProblem: (state) => {
      state.selectedProblem = {};
      state.demoTestCase = [];
      state.listLanguage = [];
      state.runningResult = {};
      state.isLoading = false;
      state.listSubmission = [];
      state.selectedSubmission = 0;
    },
    updateSelectedProblem: (state, action) => {
      let updatedField = action.payload.field;
      let updatedValue = action.payload.value;
      state.selectedProblem[updatedField] = updatedValue;
    },
    loadingOn: (state, action) => {
      state.isLoading = true;
    },
    changeSelectedSubmission: (state, action) => {
      state.selectedSubmission = action.payload;
    },
    changeSelectedAllSubmissions: (state, action) => {
      state.selectedAllSubmissions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProblems.fulfilled, (state, action) => {
      if (action.payload) {
        state.listProblem = action.payload.problems;
      }
    });

    builder.addCase(getProblemByFilter.fulfilled, (state, action) => {
      if (action.payload) {
        state.listProblem = action.payload.problems;
      }
    });

    builder.addCase(getProblemById.fulfilled, (state, action) => {
      if (action.payload) {
        state.selectedProblem = action.payload.problem;
        state.demoTestCase = action.payload.listDemoTestcase;
        state.listLanguage = action.payload.listLanguageSupport;
      }
    });

    builder.addCase(updateProblemById.fulfilled, (state, action) => {
      console.log(
        "🚀 ~ file: problemReducer.js:33 ~ builder.addCase ~ action:",
        action.payload
      );
    });

    builder.addCase(runCodeWithoutSaving.fulfilled, (state, action) => {
      if (action.payload) {
        state.runningResult = action.payload.data;
        state.isLoading = false;
      }
    });

    builder.addCase(runCodeWithSaving.fulfilled, (state, action) => {
      if (action.payload) {
        state.runningResult = action.payload.runningInfo.data;
        state.isLoading = false;
        let newSubmission = action.payload.newSubmission;
        state.listSubmission.push(newSubmission);
        state.listSubmission = state.listSubmission.sort((a, b) => {
          return -a.updatedAt.localeCompare(b);
        });
      }
    });

    builder.addCase(getSubmissionById.fulfilled, (state, action) => {
      if (action.payload) {
        state.listSubmission = action.payload.listSubmissions;
        if (action.payload.listSubmissions) {
          state.listSubmission = state.listSubmission.sort((a, b) => {
            return -a.updatedAt.localeCompare(b);
          });
        }
      }
    });

    builder.addCase(getAllSubmissions.fulfilled, (state, action) => {
      if (action.payload) {
        state.listAllSubmissions = action.payload.listSubmissions;
        if (action.payload.listAllSubmissions) {
          state.listAllSubmissions = state.listAllSubmissions.sort((a, b) => {
            return -a.updatedAt.localeCompare(b);
          });
        }
      }
    });
  },
});

export const {
  resetSelectedProblem,
  updateSelectedProblem,
  loadingOn,
  changeSelectedSubmission,
  changeSelectedAllSubmissions,
} = problemSlice.actions;

export default problemSlice.reducer;
