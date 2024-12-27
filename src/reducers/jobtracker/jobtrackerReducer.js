import { createSlice } from "@reduxjs/toolkit";
import { createJob, getJobByCompany, updateJob, deleteJob } from "./jobtrackerThunk";


const jobTrackerSlice = createSlice({
    name: "jobTracker",
    initialState: {
        jobList: [],
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(createJob.fulfilled, (state, data) => {
                let payload = data.payload;
                state.jobList.push(payload);
            })
            .addCase(getJobByCompany.fulfilled, (state, data) => {
                let payload = data.payload;
                state.jobList = payload;
            })
            .addCase(updateJob.fulfilled, (state, data) => {
                let payload = data.payload;
                state.jobList = state.jobList.map(job => job.id === payload.id ? payload : job);
            })
            .addCase(deleteJob.fulfilled, (state, data) => {
                let payload = data.payload;
                state.jobList = state.jobList.filter(job => job.id !== payload.id);
            })
    }
})

export default jobTrackerSlice.reducer;
