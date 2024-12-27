export const problemListSelector = (state) => state.problem.listProblem;
export const problemByIdSelector = (state) => state.problem.selectedProblem;

export const getListTestCase = (state) => state.problem.demoTestCase;
export const getListLanguage = (state) => state.problem.listLanguage;

export const getRunningInfoSelector = (state) =>
  state.problem.runningResult ? state.problem.runningResult : "";

export const getIsWaitingForResultSelector = (state) => state.problem.isLoading;
export const getListSubmissionSelector = (state) =>
  state.problem.listSubmission;

export const getSelectedSubmissionIndex = (state) =>
  state.problem.selectedSubmission;

export const getListAllSubmissionsSelector = (state) =>
  state.problem.listAllSubmissions;
