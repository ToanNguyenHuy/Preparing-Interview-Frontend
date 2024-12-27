import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserId } from '@/reducers/authentication/authenticationSelector'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { desc, eq } from 'drizzle-orm';
import InterviewItemCard from './InterviewItemCard';

function InterviewList() {
  const userID = useSelector(getUserId);
  const [interviewList,setInterviewList] = useState([]);

  useEffect(()=>{
    if(userID) {
      getInterviewList();
    }
  },[userID])

  const getInterviewList = async () => {
    const result = await db.select().from(MockInterview).where(eq(MockInterview.userId,userID)).orderBy(desc(MockInterview.id));
    console.log(result);
    setInterviewList(result);
  }

  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interview</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        { interviewList && interviewList.map((interview,index)=>(
           <InterviewItemCard key={index} interview={interview} />
        ))}
       </div>
    </div>
  )
}

export default InterviewList

