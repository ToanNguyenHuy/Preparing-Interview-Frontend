import JobTrackerApi from "@/network/jobTrackerApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

const createJob = createAsyncThunk(
    'jobTracker/createJob',
    async (job) => {
        const response = await JobTrackerApi.createJob(job);
        return response.data;
    }
)

const getJobByCompany = createAsyncThunk(
    'jobTracker/getJobByCompany',
    async (companyId) => {
        const response = await JobTrackerApi.getJobByCompany(companyId);
        return response.data;
    }
)

const updateJob = createAsyncThunk(
    'jobTracker/updateJob',
    async (job) => {
        const response = await JobTrackerApi.updateJob(job);
        return response.data;
    }
)

const deleteJob = createAsyncThunk(
    'jobTracker/deleteJob',
    async (jobId) => {
        const response = await JobTrackerApi.deleteJob(jobId);
        return response.data;
    }
)

export {
    createJob,
    getJobByCompany,
    updateJob,
    deleteJob
}


