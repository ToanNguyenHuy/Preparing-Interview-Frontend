import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useState } from 'react';
import { Button } from '@mui/material';
import FeedbackPanel from './components/collapsible';

function index() {
  const [feedbackList,setFeedbackList] = useState([]);
  const router = useRouter();
  const { mockId } = router.query;

  useEffect(()=>{
    if(mockId){
        GetFeedback();
    }
  },[mockId]);

  const GetFeedback = async () => {
    console.log(mockId);
    const result = await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef,mockId));
    console.log(result);
    setFeedbackList(result);
  }
  return (
    <div className='p-10'>
        {feedbackList?.length == 0? (
        <h2 className='font-bold text-xl text-gray-500'>
            No Interview feedback record found
        </h2>
        ) : (
            <>
            <h2 className='text-3xl font-bold text-green-500'>
            Congratulations!
            </h2>

            <h2 className='font-bold text-2xl'>
            Here is your interview feedback.
            </h2>

            <h2 className='text-blue-500 text-lg my-3'>
            <strong>Click on the Questions and see all of the details</strong>
            </h2>

            <h2 className='text-sm text-gray-500'>
            Find below interview question with correct answer. Your answer and
            feedback for improvement.
            </h2>

            {feedbackList && feedbackList.map((item,index) => (
               <FeedbackPanel item={item} index={index} />
            ))}
            </>
        )}
        
        <Button onClick={() => router.replace('/mockinterview')}>Go Home</Button>
    </div>
  )
}

export default index
