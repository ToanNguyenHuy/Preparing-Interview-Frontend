import {api_job_tracker} from "@/network";

const jobApi = {};

jobApi.getAllJobs = (userId) => {
     return api_job_tracker().get("/api/job/getAllJobs/" + userId)
};

jobApi.createJob = ({companyName,jobTitle,jobStatus,location,applicationDate,notes,salaryRange,userID}) => {
    return api_job_tracker().post("/api/job/createJob",{
      companyName: companyName,
      jobTitle: jobTitle,
      jobStatus: jobStatus,
      location: location,
      applicationDate: applicationDate,
      notes: notes,
      salaryRange: salaryRange,
      userID: userID
    })
};

jobApi.updateJob = ({jobId,companyName,jobTitle,jobStatus,location,applicationDate,notes,salaryRange}) => {
    return api_job_tracker().post("/api/job/updateJob",{
      jobId: jobId,
      companyName: companyName,
      jobTitle: jobTitle,
      jobStatus: jobStatus,
      location: location,
      applicationDate: applicationDate,
      notes: notes,
      salaryRange: salaryRange
    })
};

jobApi.deleteJob = (jobId) => {
  return api_job_tracker().delete("/api/job/deleteJob/" + jobId)
}

export default jobApi;
