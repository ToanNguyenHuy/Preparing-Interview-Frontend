import React from 'react'

function QuestionSection({mockInterviewQuestion,activeQuestionIndex}) {
  return mockInterviewQuestion && (
    <div className='p-5 border rounded-lg my-10'>
        <div>
        {mockInterviewQuestion && mockInterviewQuestion.map((question,index)=>(
                <h2 className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex == index && 'bg-blue-700 text-white'}`}>Question #{index+1}</h2>
            ))}
        </div>
        <h2 className='my-5 text-md md:text-lg'>
                {mockInterviewQuestion[activeQuestionIndex]?.question}
        </h2>
    </div>
  )
}

export default QuestionSection
