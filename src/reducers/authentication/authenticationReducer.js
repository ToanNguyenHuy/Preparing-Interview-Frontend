import {createSlice} from "@reduxjs/toolkit";
import {ROLE} from "@/constants/role";
import {signIn, signUp, verifyToken} from "@/reducers/authentication/authenticationThunk";
import {getSuccessMessage} from "@/reducers/authentication/authenticationSelector";

const authenticationSlice = createSlice({
    name: "authentication",
    initialState: {
        id : -1,
        role: [ROLE.NON_AUTHORIZE],
        email: "",
        username: "",
        successMessage : "",
        failMessage : ""
    },
    reducers: {
        resetMessage : (state) => {
            state.successMessage = "";
            state.failMessage = "";
        },
        logout: (state) => {
            state.role = [ROLE.NON_AUTHORIZE];
            state.id = -1;
            state.username = "";
            localStorage.removeItem("access_token");
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(signIn.fulfilled, (state, action) => {
                let payload = action.payload;
                if (payload.status !== undefined) {
                    state.failMessage = payload.message;
                } else {
                    state.id = payload.id;
                    state.role = payload.roles;
                    state.username = payload.username;
                    state.email = payload.email;
                    localStorage.setItem("access_token", payload.accessToken);
                }
            })
            .addCase(signUp.fulfilled, (state, action) => {
                let payload = action.payload;
                if (!payload.status) {
                    state.failMessage = payload.message;
                } else {
                    state.successMessage = payload.message;
                }
            })
            .addCase(verifyToken.fulfilled, (state, action) => {
                let payload = action.payload;
                if (payload.status === undefined) {
                    state.id = payload.id;
                    state.role = payload.roles;
                    state.username = payload.username;
                    state.email = payload.email;
                    localStorage.setItem("access_token", payload.accessToken);
                }
            })
    }
})

export const {resetMessage, logout} = authenticationSlice.actions;
export default authenticationSlice.reducer;