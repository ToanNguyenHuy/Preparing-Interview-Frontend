import React from 'react'
import QuestionSection from './components/QuestionSection';
import { useEffect, useState } from "react";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import Link from 'next/link';
import Webcam from 'react-webcam';
import RecordAnswerSection from './components/Record';
import RecordAnswerSection2 from './components/Record2';

function index() {
  const router = useRouter();
  const { mockId } = router.query;
  const [interViewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    if (mockId) {
      GetInterviewDetails();
    }
  }, [mockId])

  const GetInterviewDetails = async () => {
    try {
      const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, mockId));
      console.log("mock id: ",mockId);
      console.log("result: ",result);
      let jsonMockResp;
      try {
        jsonMockResp = JSON.parse(result[0].jsonMockResp); 
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        console.log("Raw JSON string:", result[0].jsonMockResp);
        return;
      } 
      setMockInterviewQuestion(jsonMockResp);
      setInterviewData(result[0]);
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  const transition = () => {
    router.push({
      pathname: '/mockinterview/feedback',
      query: { 
        mockId: interViewData?.mockId,  
      }
    });
  }

  return (
    <div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
    <QuestionSection
      mockInterviewQuestion={mockInterviewQuestion}
      activeQuestionIndex={activeQuestionIndex}
     />

    <RecordAnswerSection2
        mockInterviewQuestion={mockInterviewQuestion}
        activeQuestionIndex={activeQuestionIndex}
        interViewData={interViewData}
    />
    </div>

    <div className='flex justify-end gap-6'>
       {activeQuestionIndex>0&&  
       <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
       {activeQuestionIndex!=mockInterviewQuestion?.length-1&& 
        <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
       {activeQuestionIndex==mockInterviewQuestion?.length-1&&  
      
       <Button onClick={transition} >End Interview</Button>
       }
     </div>
    </div>
  )
}

export default index
