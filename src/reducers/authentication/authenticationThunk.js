import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthApi from "@/network/authApi";

const signIn = createAsyncThunk(
    'authentication/signIn',
    async (loginInfo, thunkApi) => {
        try {
            const response = await AuthApi.signIn(loginInfo);
            if (response.status != 200) {
                return {
                    status: false,
                    message: response.data.message
                }
            }
            return response.data;

        } catch (error) {
            console.log("🚀 ~ file: authenticationThunk.js:19 ~ error:", error)
        }
    }
)

const signUp = createAsyncThunk(
    'authentication/signUp',
    async (signUpInfo, thunkApi) => {
        const response = await AuthApi.signUp(signUpInfo)
        return response.data;
    }
)

const verifyToken = createAsyncThunk(
    'authentication/verifyToken',
    async () => {
        const response = await AuthApi.verifyToken();
        if (response.status != 200) {
            return {
                status: false,
                message: response.data.message
            }
        }
        return response.data;
    }
)

export {
    signIn,
    signUp,
    verifyToken
}