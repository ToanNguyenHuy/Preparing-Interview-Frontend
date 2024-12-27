import React from 'react'
import AddNewInterview from './components/AddNewInterview'
import InterviewList from './components/InterviewList'

function Dashboard() {
  return (
    <div>
    
     <h2 className='text-2xl font-bold'>Dashboard</h2>
     <h2 className='text-xl font-bold'>Create and Start Mock Interview</h2>
     
     <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
      <AddNewInterview/>
     </div>

     <div>
       <InterviewList/>
     </div>
    </div>
  )
}

export default Dashboard

