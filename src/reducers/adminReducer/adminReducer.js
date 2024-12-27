import { createSlice } from "@reduxjs/toolkit";
import { addRole, getAllUser, removeRole } from "./adminThunk";
import { ROLE } from "@/constants/role";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        listUser: [],
        errorMessage: "",
        successMessage: "",
    },

    reducers: {
        resetMessage : (state) => {
            state.errorMessage = "";
            state.successMessage = "";
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getAllUser.fulfilled, (state, data) => {
                let payload = data.payload;
                if (payload.status === false) {
                    state.errorMessage = payload.message;
                } else {
                    let listUser = payload;
                    state.listUser = payload;
                }
            })
            .addCase(removeRole.fulfilled, (state, data) => {
                let payload = data.payload;
                console.log(data.payload);
                if (payload.status === false) {
                    state.errorMessage = payload.message;
                } else {
                    let removedRole = payload.role;
                    let userId = payload.userId;

                    let listUser = state.listUser;
                    for (let user of listUser) {
                        if (user.id === userId) {
                            user.roles.splice(user.roles.indexOf("ROLE_" + removedRole.toUpperCase()), 1);
                        }
                    }

                    state.successMessage = payload.message;

                    state.listUser = listUser;
                }
            })
            .addCase(addRole.fulfilled, (state, data) => {
                let payload = data.payload;
                if(!data.payload) return;
                console.log(data.payload);
                if (payload.status === false) {
                    state.errorMessage = payload.message;
                } else {
                    let addedRole = payload.role;
                    let userId = payload.userId;

                    let listUser = state.listUser;
                    for (let user of listUser) {
                        if (user.id === userId) {
                            user.roles.push("ROLE_" + addedRole.toUpperCase());
                        }
                    }
                    state.listUser = listUser;
                    state.successMessage = payload.message;
                }

            })
    }
});

export const { resetMessage } = adminSlice.actions;
export default adminSlice.reducer;