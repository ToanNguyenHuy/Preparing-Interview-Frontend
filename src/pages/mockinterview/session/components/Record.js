"use client"
import React, { useEffect , useState} from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Button } from '@mui/material';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import moment from 'moment';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

function RecordAnswerSection({mockInterviewQuestion,activeQuestionIndex,interviewData}) {
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });  
    const [userAnswer,setUserAnswer]=useState('');
    const [loading,setLoading]=useState(false);
    
    useEffect(()=>{
      results?.map((result)=>(
          setUserAnswer(prevAns=>prevAns+result?.transcript)
      ))
    },[results])

    useEffect(()=>{
      if(!isRecording && userAnswer?.length>10)
        {
          FeedBackUserAnswer();
        } 
      },[userAnswer])

    const StartStopRecording=async()=>{
      if(isRecording)
      {
        stopSpeechToText()
      }
      else{
        startSpeechToText();
      }
    }

    const FeedBackUserAnswer = async() => {
      setLoading(true)
      console.log(userAnswer)
      const feedbackPrompt = "Question:"+mockInterviewQuestion[activeQuestionIndex]?.question+
        ", User Answer:"+userAnswer+",Depends on question and user answer for give interview question "+
        " please give us rating for answer and feedback as area of improvmenet if any "+
        "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const result = await model.generateContent(feedbackPrompt);
      const response = await result.response;
      const mockresponse = (response.text()).replace(/```json/g, '').replace(/```/g, '');
      const Jsonmockresponse = JSON.parse(mockresponse)
      
      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        ExampleAns:mockInterviewQuestion[activeQuestionIndex]?.question,
        userAns: userAnswer,
        feedback: Jsonmockresponse?.feedback,
        rating: Jsonmockresponse?.rating,
        createdAt:moment().format('DD-MM-YYYY')
      })

      if(resp) {
        console.log("done")
        setUserAnswer('');
        setResults([]);
      }
      setLoading(false);
    } 

  return (
    <div>
      <div> 
        <Webcam></Webcam>
      </div>

      <Button
        onClick={StartStopRecording}
      >
      {isRecording?
            <h2 className='text-red-600 animate-pulse flex gap-2 items-center'>
                Stop Recording
            </h2>
            :
            
            <h2 className='text-primary flex gap-2 items-center'>
                Record Answer</h2> }
      </Button>
    </div>
  )
}

export default RecordAnswerSection

