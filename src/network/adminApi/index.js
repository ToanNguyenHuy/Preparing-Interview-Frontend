import { api, api_pb } from "@/network";

const AdminApi = {};

AdminApi.getAllProblems = () => {
  return api_pb().get("api/problem/getAllProblems");
};
//
//
//
AdminApi.getAProblem = (id) => {
  return api_pb().get("/api/problem/getAProblem/" + id);
};

AdminApi.createProblem = ({
  hardLevel,
  problemName,
  description,
  statement,
  input,
  output,
  constraint
}) => {
  return api_pb().post("api/problem/create", {
    hardLevel: hardLevel,
    problemName: problemName,
    description: description,
    statement: statement,
    input: input,
    output: output,
    constraint: constraint
  });
};

AdminApi.updateProblem = ({
  id,
  hardLevel,
  categories,
  updatedAt,
  problemName,
  description,
  statement,
  input,
  output,
}) => {
  return api_pb().post("api/problem/edit", {
    problemId: id,
    hardLevel: hardLevel,
    categories: categories,
    updatedAt: updatedAt,
    problemName: problemName,
    description: description,
    statement: statement,
    input: input,
    output: output,
  });
};

AdminApi.deleteAProblem = (problemId) => {
  return api_pb().delete("/api/problem/deleteAProblem/" + problemId);
};

AdminApi.getAllTestcases = (id) => {
  return api_pb().get("/api/testcase/getAllTestcases/" + id);
};

AdminApi.createTestcase = ({ input, output, explaination, problemId, ownerId }) => {
  return api_pb().post("/api/testcase/addTestcase", {
    input: input,
    output: output,
    explaination: explaination,
    problemId: problemId,
    ownerId: ownerId
  });
};

AdminApi.updateTestcase = ({ testcaseId, input, output, explaination }) => {
  return api_pb().post("/api/testcase/editTestcase", {
    testcaseId: testcaseId,
    input: input,
    output: output,
    explaination: explaination,
  });
};

AdminApi.deleteTestcase = (testcaseId) => {
  return api_pb().delete("/api/testcase/deleteTestcase/" + testcaseId);
};

AdminApi.getAllUser = () => {
  return api().get("/api/auth/allUser");
}

AdminApi.addRole = (userId, role) => {
  return api().post("/api/auth/addRole", {
    userId : userId,
    role : role
  });
}

AdminApi.removeRole = (userId, role) => {
  return api().post("/api/auth/removeRole", {
    userId : userId,
    role : role
  });
}


export default AdminApi;
