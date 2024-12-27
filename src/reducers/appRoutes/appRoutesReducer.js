import { createSlice } from "@reduxjs/toolkit";
import { Logger } from "@/shared/utilities";

let logger = function (message) {
  Logger.log("appRoutesReducer: ", message);
};
export const ROUTES = {
  HOME_PAGE: "homepage",
  LIST_PROBLEM: "listproblem",
  DOING: "listdoing",
  ADMIN: "admin",
  AUTHEN: "authen",
  JOB_TRACKER: "jobtracker",
  MOCK_INTERVIEW: "mockinterview",
  CHATBOT: "chatbot"
};

const isDifferentPage = function (currentPage, nextPage) {
  if (currentPage !== nextPage) {
    return true;
  }
  return false;
};

const appRoutes = createSlice({
  name: "appRoutes",
  initialState: {
    currentRoutes: ROUTES.HOME_PAGE,
  },
  reducers: {
    changeToHomePage(state) {
      if (isDifferentPage(state.currentRoutes, ROUTES.HOME_PAGE)) {
        logger("CALLING CHANGE TO HOMEPAGE");
        state.currentRoutes = ROUTES.HOME_PAGE;
      }
    },
    changeToListProblem(state) {
      if (isDifferentPage(state.currentRoutes, ROUTES.LIST_PROBLEM)) {
        logger("CALLING CHANGE TO LIST PROBLEM");
        state.currentRoutes = ROUTES.LIST_PROBLEM;
      }
    },
    changeToProblemPage(state) {
      if (isDifferentPage(state.currentRoutes, ROUTES.DOING)) {
        logger("CALLING CHANGE TO LIST DOING PAGE");
        state.currentRoutes = ROUTES.DOING;
      }
    },
    changeToAdminPage(state) {
      if (isDifferentPage(state.currentRoutes, ROUTES.ADMIN)) {
        logger("CALLING CHANGE TO ADMIN PAGE");
        state.currentRoutes = ROUTES.ADMIN;
      }
    },
    changeToAuthenPage(state) {
      if (isDifferentPage(state.currentRoutes, ROUTES.AUTHEN)) {
        state.currentRoutes = ROUTES.AUTHEN;
      }
    },
    changeToJobTrackerPage(state) {
      if (isDifferentPage(state.currentRoutes, ROUTES.JOB_TRACKER)) {
        state.currentRoutes = ROUTES.JOB_TRACKER;
      }
    },
    changeToMockInterviewPage(state) {
      if (isDifferentPage(state.currentRoutes, ROUTES.MOCK_INTERVIEW)) {
        state.currentRoutes = ROUTES.MOCK_INTERVIEW;
      }
    },
    changeToChatbotPage(state) {
      if (isDifferentPage(state.currentRoutes, ROUTES.CHATBOT)) {
        state.currentRoutes = ROUTES.CHATBOT;
      }
    }
  },
  extraReducers: (builder) => {},
});

export const {
  changeToHomePage,
  changeToListProblem,
  changeToProblemPage,
  changeToAuthenPage,
  changeToAdminPage,
  changeToJobTrackerPage,
  changeToMockInterviewPage,
  changeToChatbotPage
} = appRoutes.actions;
export default appRoutes.reducer;
