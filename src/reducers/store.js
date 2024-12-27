import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authenticationReducer from "@/reducers/authentication/authenticationReducer";
import problemReducer from "@/reducers/problem/problemReducer";
import appRoutesReducer from "@/reducers/appRoutes/appRoutesReducer";
import {createWrapper} from "next-redux-wrapper";
import adminReducer from "./adminReducer/adminReducer";

const reducers = combineReducers(
    {
        authentication: authenticationReducer,
        problem: problemReducer,
        appRoutes : appRoutesReducer,
        admin : adminReducer
    }
);

const makeStore = () => configureStore({
    reducer : reducers
});

export const wrapper = createWrapper(makeStore);

