
import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthApi from "@/network/authApi";
import AdminApi from "@/network/adminApi";

const getAllUser  = createAsyncThunk(
    'admin/getAllUser',
    async () => {
        try {
            let response = await AdminApi.getAllUser();
            if (response.status !== 200) {
                console.log("adminThunk : getAllUser : " + response.data.message);
                return {
                    status : false,
                    message : response.data.message
                }
            } else {
                return response.data;
            }
        } catch (error) {
            console.log("adminThunk : 20 : " + error);
        }
    }
);

const addRole = createAsyncThunk(
    'admin/addRole',
    async ({userId, role}, thunkApi) => {
        try {
            let response = await AdminApi.addRole(userId, role);
            if (response.status !== 200) {
                console.log("adminThunk : addRole : " + response.data.message);
                return {
                    status : false,
                    message : response.data.message
                };
            } else {
                return response.data;
            }
        } catch (error) {
            console.log("adminThunk : 39 : " + error);
        }
    }
);

const removeRole = createAsyncThunk(
    'admin/removeRole',
    async ({userId, role}, thunkApi) => {
        try {
            let response = await AdminApi.removeRole(userId, role);
            if (response.status !== 200) {
                console.log("adminThunk : removeRole : " + response.data.message);
                return {
                    status : false,
                    message : response.data.message
                };
            } else {
                return response.data;
            }
        } catch (error) {
            console.log("adminThunk : 58 : " + error);
        }
    }
)

export {
    getAllUser,
    removeRole,
    addRole
}