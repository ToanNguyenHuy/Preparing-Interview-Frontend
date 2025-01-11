import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { changeToAdminPage } from "@/reducers/appRoutes/appRoutesReducer";
import FeatureBar from "@/pages/admin/components/FeatureBar";
import ExecuteButton, {
  BUTTON_TYPE,
} from "@/pages/problems/idComponent/console/components/ExcuteButton";
import ProblemList from "@/pages/admin/components/ProblemList";
import AdminApi from "@/network/adminApi";
import { getAuthenRole } from "@/reducers/authentication/authenticationSelector";
import ListUser from "./components/ListUser";
import { SetMealSharp } from "@mui/icons-material";
import { Modal, Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export const ADMIN_FEATURE = {
  MANAGE_PROBLEM: "manageproblem",
  MANAGE_USER: "manage_user"
};

export default function AdminstrationPage(props) {
  const dispatch = useDispatch();

  const [selectedFeature, setSelectedFeature] = useState(ADMIN_FEATURE.MANAGE_PROBLEM);

  const onChangeToListUser = function () {
    setSelectedFeature(ADMIN_FEATURE.MANAGE_USER);
  }

  const onChangeToListProblem = function () {
    setSelectedFeature(ADMIN_FEATURE.MANAGE_PROBLEM);
  }

  const features = [
    {
      enum: ADMIN_FEATURE.MANAGE_PROBLEM,
      title: "Problems",
      onClick: () => onChangeToListProblem()
    },
    {
      enum: ADMIN_FEATURE.MANAGE_USER,
      title: "Users",
      onClick: () => onChangeToListUser()
    }
  ];

  const [onlyOne, setOnlyOne] = useState(1);
  useEffect(() => {
    dispatch(changeToAdminPage());
  }, [onlyOne]);

  const [reload, setReload] = useState(true);

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    hardLevel: '',
    problemName: '',
    description: '',
    statement: '',
    input: '',
    output: '',
    constraint: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateProblem = () => {
    setOpenCreateModal(true);
  };

  const handleSubmit = () => {
    AdminApi.createProblem(formData)
      .then(() => {
        setReload(true);
        setOpenCreateModal(false);
        setFormData({
          hardLevel: '',
          problemName: '',
          description: '',
          statement: '',
          input: '',
          output: '',
          constraint: ''
        });
      });
  };

  const createProblemModal = (
    <Modal
      open={openCreateModal}
      onClose={() => setOpenCreateModal(false)}
      aria-labelledby="create-problem-modal"
      className="flex items-center justify-center"
    >
      <Box className="bg-white rounded-lg shadow-xl p-6 w-[500px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b pb-4">Create New Problem</h2>
        <div className="space-y-4">
          <FormControl fullWidth>
            <InputLabel className="text-gray-700">Level</InputLabel>
            <Select
              name="hardLevel"
              value={formData.hardLevel}
              onChange={handleChange}
              label="Level"
              className={"w-[445px] input-field"}
            >
              <MenuItem value="EASY" className="text-green-600">Easy</MenuItem>
              <MenuItem value="MEDIUM" className="text-yellow-600">Medium</MenuItem>
              <MenuItem value="HARD" className="text-red-600">Hard</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            fullWidth
            label="Problem Name"
            name="problemName"
            value={formData.problemName}
            required
            onChange={handleChange}
            className={"w-[336px] input-field"}
          />
          
          <TextField
            fullWidth
            label="Description"
            name="description"
            required
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className={"w-[336px] input-field"}
          />
          
          <TextField
            fullWidth
            label="Statement"
            name="statement"
            required
            className={"w-[336px] input-field"}
            multiline
            rows={4}
            value={formData.statement}
            onChange={handleChange}
          />
          
          <TextField
            fullWidth
            label="Input"
            name="input"
            required
            className={"w-[336px] input-field"}
            multiline
            rows={2}
            value={formData.input}
            onChange={handleChange}
          />
          
          <TextField
            fullWidth
            label="Output"
            name="output"
            required
            className={"w-[336px] input-field"}
            multiline
            rows={2}
            value={formData.output}
            onChange={handleChange}
          />
          
          <TextField
            fullWidth
            label="Constraints"
            name="constraint"
            required
            className={"w-[336px] input-field"}
            multiline
            rows={2}
            value={formData.constraint}
            onChange={handleChange}
          />
          
          <div className="flex justify-end space-x-2 pt-4">
            <ExecuteButton
              title="Cancel"
              type={BUTTON_TYPE.CANCEL}
              handleRunClick={() => setOpenCreateModal(false)}
            />
            <ExecuteButton
              title="Create"
              type={BUTTON_TYPE.CREATE}
              handleRunClick={handleSubmit}
            />
          </div>
        </div>
      </Box>
    </Modal>
  );

  const displayFeature = function () {
    switch (selectedFeature) {
      case ADMIN_FEATURE.MANAGE_PROBLEM:
        return (
          <>
            <ProblemList reload={reload} setReload={setReload} />
            <div className={"w-full px-5"}>
              <ExecuteButton
                title={"Tạo đề bài"}
                type={BUTTON_TYPE.CREATE}
                handleRunClick={handleCreateProblem}
                className={"w-full h-[40px] bg-sky-400 hover:bg-sky-500"}
              />
              
            </div>
          </>
        )
      case ADMIN_FEATURE.MANAGE_USER:
        return (<ListUser />)
    }
  }

  return (
    <div className={"w-full h-screen flex drop-shadow"}>
      {createProblemModal}
      <FeatureBar
        listFeature={features}
        currentFeature={selectedFeature}
      />
      <div className={"w-10/12"}>
        {
          displayFeature()
        }
        {/*  */}
      </div>
    </div>
  );
}
