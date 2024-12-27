import { useState } from 'react'
import { useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { TextField, Box } from '@mui/material';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { MockInterview } from '@/utils/schema';
import { db } from '@/utils/db';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { useRouter } from 'next/router';
import { getUserId } from '@/reducers/authentication/authenticationSelector';

// Initialize the API with your key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

function AddNewInterview() {
  const userID = useSelector(getUserId);
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState();
  const [jobPosition, setJobPosition] = useState();
  const [jobDescription, setJobDescription] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [jsonResponse, setJsonResponse] = useState([]);
  const router = useRouter();
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = async (e)=>{
    e.preventDefault()
    console.log(jobDescription,jobExperience,jobPosition,userName)
  /*  */
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const inputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDescription}, Years of Experience: ${jobExperience}, Depends on Job Position, Job Description & Years of Experience give us 5 Interview question in JSON format, Give us question and answer field on JSON`;
      
      const result = await model.generateContent(inputPrompt);
      const response = await result.response;
      const mockresponse = (response.text()).replace(/```json/g, '').replace(/```/g, '');
      console.log(JSON.parse(mockresponse));

      setJsonResponse(mockresponse);
      const mockId = uuidv4();
      const res = await db.insert(MockInterview).values({
        jobPosition: jobPosition,
        jobDesc: jobDescription, 
        jobExperience: jobExperience,
        jsonMockResp: mockresponse,
        mockId: mockId,
        createdAt: moment().format('DD-MM-YYYY'),
        userId: userID
      }).returning({ mockId: MockInterview.mockId });
      if(res) {
        console.log(res[0]?.mockId)
        router.push({
          pathname: '/mockinterview/session',
          query: { 
            username: userName,
            mockId: res[0]?.mockId
          }
        });
        handleClose(); 
      }
    } catch (error) {
      console.error('Error generating interview questions:', error);
    }
  }

  return (
    <>
      <div className='p-10 border border-gray-300 rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
        onClick={() => setOpen(true)}
      > 
        <h2 className='text-xl font-bold text-center'>Add New Interview</h2>
      </div>

      <Dialog open={open}> 
        <DialogTitle>{"Mock Interview"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Mock Interview for software engineer 
          </DialogContentText>
           
          <form onSubmit={onSubmit}>
            <div>
              <div className='my-4 mt-7'> 
                <TextField id="outlined-basic" label="What's your name ?" variant="outlined" className={"w-[336px] input-field"}
                onChange={(e)=>setUserName(e.target.value)} required>
                </TextField>
              </div>

              <div className='my-4 mt-7'> 
                <TextField id="outlined-basic" label="Position" variant="outlined" className={"w-[336px] input-field"}
                onChange={(e)=>setJobPosition(e.target.value)} required>
                </TextField>
              </div>
               
              <div className='my-4'>
                <TextField  id="outlined-basic" label="Description"  multiline className={"w-[336px] input-field"}
                 onChange={(e)=>setJobDescription(e.target.value)} required
                >
                </TextField>
              </div>
                
              <div className='my-4'>
                <TextField id="outlined-basic" label="Experience" variant="outlined" type="number" className={"w-[336px] input-field"}
                 onChange={(e)=>setJobExperience(e.target.value)}
                >
                </TextField>
              </div>
            </div>

            <DialogActions>
              <Button onClick={handleClose} variant='ghost' type="button">Cancel</Button>
              <Button type="submit">Continue</Button>
            </DialogActions>
          </form>

        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddNewInterview
