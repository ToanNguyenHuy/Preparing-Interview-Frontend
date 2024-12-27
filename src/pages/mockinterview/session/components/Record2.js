"use client"
import React, { useEffect, useState, useCallback } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Button, CircularProgress, Alert } from '@mui/material';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import moment from 'moment';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

function RecordAnswerSection2({ mockInterviewQuestion, activeQuestionIndex, interViewData }) {
    // States
    const [userAnswer, setUserAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState(null);

    // Speech to text hook
    const {
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    // Update user answer when speech results change
    useEffect(() => {
        if (results?.length > 0) {
            const transcripts = results.map(result => result.transcript).join(' ');
            setUserAnswer(transcripts);
        }
    }, [results]);

    // Process answer when recording stops
    useEffect(() => {
        if (!isRecording && userAnswer?.length > 10) {
            handleFeedback();
        }
    }, [isRecording, userAnswer]);

    // Handle recording start/stop
    const handleRecording = useCallback(() => {
        if (isRecording) {
            stopSpeechToText();
        } else {
            setUserAnswer('');
            setFeedback(null);
            startSpeechToText();
        }
    }, [isRecording, startSpeechToText, stopSpeechToText]);

    // Get feedback from AI and save to database
    const handleFeedback = async () => {
        try {
            setLoading(true);
            console.log(userAnswer);

            // Generate AI feedback
            const feedbackPrompt = `
                Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}
                User Answer: ${userAnswer}
                Please provide a rating (1-10) and constructive feedback in 3-5 lines to improve the answer.
                Return response in JSON format with 'rating' and 'feedback' fields.
            `;

            const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
            const result = await model.generateContent(feedbackPrompt);
            const response = await result.response;
            const mockresponse = (response.text()).replace(/```json/g, '').replace(/```/g, '');
            const jsonFeedback = JSON.parse(mockresponse);

            console.log(jsonFeedback);
            console.log(interViewData?.mockId);

            // Save to database
            const savedResponse = await db.insert(UserAnswer).values({
                mockIdRef: interViewData?.mockId,
                question: mockInterviewQuestion[activeQuestionIndex]?.question,
                ExampleAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
                userAns: userAnswer,
                feedback: jsonFeedback.feedback,
                rating: jsonFeedback.rating,
                createdAt: moment().format('DD-MM-YYYY')
            });

            if(savedResponse) {
                console.log("done")
                setUserAnswer('');
                setResults([]);
            }
            console.log("check again: ",userAnswer);
            setFeedback(jsonFeedback);

        } catch (err) {
            console.error('Error processing answer:', err);
            setError('Failed to process answer. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 p-4">
            {/* Webcam Section */}
            <div className="rounded-lg overflow-hidden shadow-lg">
                <Webcam
                    audio={false}
                    width="100%"
                    height="auto"
                    mirrored={true}
                    screenshotFormat="image/jpeg"
                />
            </div>

            {/* Recording Controls */}
            <div className="flex justify-center">
                <Button
                    color={isRecording ? "error" : "primary"}
                    onClick={handleRecording}
                    disabled={loading}
                    startIcon={loading && <CircularProgress size={20} />}
                >
                    {isRecording ? "Stop Recording" : "Start Recording"}
                </Button>
            </div>
        </div>
    );
}

export default RecordAnswerSection2;