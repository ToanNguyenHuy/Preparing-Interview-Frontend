import { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Stack,
  Typography,
  Box,
  IconButton,
  Chip,
  Alert,
  Snackbar
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import jobApi  from '@/network/jobApi/index';
import { getUserId } from '@/reducers/authentication/authenticationSelector';
import { useSelector } from 'react-redux';
import ViewsChart from './components/chart';
import PieChartComponent from './components/pieChart';

const JobTracker = () => {
  const userID = useSelector(getUserId);
  const [open, setOpen] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const initialFormState = {
    jobTitle: '',
    companyName: '',
    jobStatus: '',
    applicationDate: '',
    location: '',
    salaryRange: '',
    notes: '',
    userID: userID,
    jobId: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  // Fetch jobs on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobApi.getAllJobs(userID);
      const data = response.data;
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching jobs:', err.response?.data || err.message);
      setError('Failed to fetch jobs');
      showSnackbar('Failed to fetch jobs', 'error');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const getLocationData = () => {
    const locationCount = jobs.reduce((acc, job) => {
      const location = job.location || 'Unspecified';
      acc[location] = (acc[location] || 0) + 1;
      return acc;
    }, {});
  
    return Object.entries(locationCount).map(([name, value]) => ({
      name,
      value
    }));
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (selectedJob) {
        await jobApi.updateJob({
            jobTitle : formData.jobTitle,
            companyName : formData.companyName,
            jobStatus : formData.jobStatus,
            applicationDate : formData.applicationDate,
            location : formData.location,
            salaryRange : formData.salaryRange,
            notes : formData.notes,
            jobId : formData.jobId
        });
        showSnackbar('Job updated successfully', 'success');
      } else {
        await jobApi.createJob({
          jobTitle : formData.jobTitle,
          companyName : formData.companyName,
          jobStatus : formData.jobStatus,
          applicationDate : formData.applicationDate,
          location : formData.location,
          salaryRange : formData.salaryRange,
          notes : formData.notes,
          userID: userID
        });
        showSnackbar('Job added successfully', 'success');
      }
      await fetchJobs();
      handleClose();
    } catch (err) {
      console.log(err);
      showSnackbar('Failed to save job', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        setLoading(true);
        await jobApi.deleteJob(id);
        await fetchJobs();
        showSnackbar('Job deleted successfully', 'success');
      } catch (err) {
        console.log(err);
        showSnackbar('Failed to delete job', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (job) => {
    setSelectedJob(job);
    setFormData({
      ...job,
      jobId: job.id
    });
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
    setSelectedJob(null);
    setFormData(initialFormState);
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  // Status chip color mapping
  const statusColors = {
    APPLIED: 'primary',
    INTERVIEW: 'warning',
    REJECTED: 'error',
    OFFERED: 'success',
    ACCEPTED: 'info'
  };

  const data = [];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}> 

        <Typography variant="h4" component="h1">
          Job Tracker
        </Typography>

        <Button
        onClick={() => setShowChart(true)}
        >
          Process Summary
        </Button>

        <Button
          onClick={() => setOpen(true)}
          className='button-24'
        >
          Add New Job
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <TableRow>
              <TableCell scope="col" class="px-6 py-3">Company</TableCell>
              <TableCell scope="col" class="px-6 py-3">Position</TableCell>
              <TableCell scope="col" class="px-6 py-3">Status</TableCell>
              <TableCell scope="col" class="px-6 py-3">Applied Date</TableCell>
              <TableCell scope="col" class="px-6 py-3">Location</TableCell>
              <TableCell scope="col" class="px-6 py-3">Salary Range</TableCell>
              <TableCell scope="col" class="px-6 py-3">Notes</TableCell>
              <TableCell scope="col" class="px-6 py-3">Edit</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Array.isArray(jobs) && jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.companyName}</TableCell>
                <TableCell>{job.jobTitle}</TableCell>
                <TableCell>
                  <Chip
                    label={job.jobStatus}
                    color={statusColors[job.jobStatus]}
                    size="small"
                  />
                </TableCell>
                <TableCell>{new Date(job.applicationDate).toLocaleDateString()}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.salaryRange}</TableCell>
                <TableCell>{job.notes}</TableCell>
                <TableCell>
                  <IconButton 
                    size="small" 
                    color="primary"
                    onClick={() => handleEdit(job)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="error"
                    onClick={() => handleDelete(job.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add New Job</DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <TextField
                label="Job Title"
                required
                fullWidth
                value={formData.jobTitle}
                className={"w-[336px] input-field"}
                onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
              />

              <TextField
                label="Company Name"
                required
                fullWidth
                value={formData.companyName}
                className={"w-[336px] input-field"}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
              />

              <TextField
                select
                label="Status"
                required
                fullWidth
                value={formData.jobStatus}
                className={"w-[336px] input-field"}
                onChange={(e) => setFormData({...formData, jobStatus: e.target.value})}
              >
                <MenuItem value="APPLIED">Applied</MenuItem> 
                <MenuItem value="REJECTED">Rejected</MenuItem>
                <MenuItem value="OFFERED">Offered</MenuItem>
                <MenuItem value="1ST ROUND">1st Round</MenuItem>
                <MenuItem value="2ND ROUND">2nd Round</MenuItem>
                <MenuItem value="3RD ROUND">3rd Round</MenuItem>
                <MenuItem value="NO RESPONSE">No Response</MenuItem>
              </TextField>

              <TextField
                type="date"
                label="Application Date"
                required
                fullWidth
                className={"w-[336px] input-field"}
                InputLabelProps={{ shrink: true }}
                value={formData.applicationDate}
                onChange={(e) => setFormData({...formData, applicationDate: e.target.value})}
              />

              <TextField
                label="Location"
                fullWidth
                value={formData.location}
                className={"w-[336px] input-field"}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />

              <TextField
                label="Salary Range"
                fullWidth
                value={formData.salaryRange}
                className={"w-[336px] input-field"}
                onChange={(e) => setFormData({...formData, salaryRange: e.target.value})}
              />

              <TextField
                label="Notes"
                multiline
                rows={4}
                fullWidth
                value={formData.notes}
                className={"w-[336px] input-field"}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Save Job</Button>
          </DialogActions>
        </form>
      </Dialog>
      
      <Dialog
        open={showChart}
        onClose={() => setShowChart(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Application Process Summary</DialogTitle>
        <DialogContent>
          <div>
          <h2>Total jobs applied for ⭐</h2>
          <Typography variant="h4" align="center" gutterBottom>
          {jobs.length}
          </Typography>
          </div>

          <div>  
            <h2>Location</h2>
            <PieChartComponent data={getLocationData()}/>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowChart(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default JobTracker;