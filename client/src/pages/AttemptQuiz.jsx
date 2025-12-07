import { useEffect, useState } from 'react';
import React from 'react';
import { apiConnector } from "../services/apiConnector";
import { useParams } from 'react-router-dom';
import { questionEndpoints, quizEndpoints } from '../services/APIs';
import { useSelector } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import QuizQuestions from '../components/core/attemptQuiz/QuizQuestions';

const AttemptQuiz = () => {
    const [quizDetails, setQuizDetails] = useState(null);
    const [quizQuestions, setQuizQuestions] = useState(null);
    const [loading, setLoading] = useState(true);

    const { token } = useSelector(state => state.auth);
    const { id: quizId } = useParams();

    const fetchQuizData = async () => {
        setLoading(true);
        try {
            const [detailsResponse, questionsResponse] = await Promise.all([
                apiConnector("GET", `${quizEndpoints.GET_QUIZ_DETAILS}/${quizId}`),
                apiConnector("GET", `${questionEndpoints.GET_QUIZ_QUESTIONS}/${quizId}`)
            ]);

            setQuizDetails(detailsResponse?.data?.data);
            setQuizQuestions(questionsResponse?.data?.data);
        } catch (error) {
            console.error('Error fetching quiz data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuizData();
    }, [quizId]);

    return (
        <section className='min-h-[90vh] py-10'>
            <div className='border py-3 px-5 rounded-lg bg-slate-900 border-slate-600'>
                {loading ? (
                    <h1 className='text-center'>Loading...</h1>
                ) : (
                    <>
                        <div className='flex flex-col md:flex-row gap-x-5 gap-y-1 items-center justify-between font-thin mb-3'>
                            <h3 className='text-base md:text-2xl font-semibold line-clamp-2'>{quizDetails?.title}</h3>
                            <p className='text-slate-300 w-fit text-nowrap'>Time: {quizDetails?.timer} minutes</p>
                        </div>

                        <div className='flex flex-col md:flex-row justify-between items-center gap-x-5 gap-y-1 font-thin'>
                            <p className='font-thin mt-1 line-clamp-2'>{quizDetails?.description}</p>
                            <div className='flex gap-3 text-slate-300 w-fit text-nowrap'>
                                <p>Created By - {quizDetails?.createdBy?.username}</p>
                                <p>{formatDistanceToNow(new Date(quizDetails.createdAt), { addSuffix: true })}</p>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {!loading && <QuizQuestions quizDetails={quizDetails} quizQuestions={quizQuestions} />}
        </section>
    );
};

export default AttemptQuiz;
