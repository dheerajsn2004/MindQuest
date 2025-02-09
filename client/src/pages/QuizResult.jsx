import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const QuizResults = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Extract score and total safely
    const score = location.state?.score ?? null;
    const total = location.state?.total ?? null;

    // Handle missing or invalid values
    const isValidScore = score !== null && total !== null && total > 0;

    return (
        <div className='min-h-[80vh] flex flex-col gap-5 justify-center items-center'>
            <div className='text-center'>
                <h1 className='text-3xl border-b border-slate-600 pb-5'>Quiz Results</h1>

                {isValidScore ? (
                    <p className='text-2xl mt-4 flex items-center gap-3 font-thin'>
                        Your Score: 
                        <span className='font-semibold'>
                            <span className={`${score / total >= 0.4 ? "text-green-500" : "text-red-700"}`}>
                                {score}
                            </span> / {total}
                        </span>
                    </p>
                ) : (
                    <p className='text-xl mt-4 text-red-500 font-semibold'>Invalid Score Data</p>
                )}
            </div>

            <Button className='w-max' onClick={() => navigate("/")}>Back to Home</Button>
        </div>
    );
};

export default QuizResults;
