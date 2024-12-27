import { Button } from '@mui/material'
import { useRouter } from "next/navigation";
import React from 'react'

function InterviewItemCard({interview}) {
  const router = useRouter()
  const onFeedbackPress = () => {
    router.push({
        pathname: '/mockinterview/feedback',
        query: { 
          mockId: interview?.mockId,  
        }
      });
  }
  return (
    <div className='border shadow-sm rounded-lg p-3'>
      <h2 className="font-bold text-primary">Position: {interview?.jobPosition}</h2>
      <h2 className="text-sm text-gray-500">Year of experience: {interview?.jobExperience}</h2>
      <h2 className="text-xs text-gray-400">
        Created At: {interview?.createdAt}
      </h2>

      <div>
        <Button size="sm" variant="outline" className="w-full" onClick={onFeedbackPress}>Feedback</Button>
      </div>
    </div>
  )
}

export default InterviewItemCard
