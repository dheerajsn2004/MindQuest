import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const QuizResults = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const quizTitle = location.state?.quizTitle ?? 'the quiz';

    return (
        <div className='min-h-[80vh] flex flex-col gap-8 justify-center items-center px-4'>
            <div className='text-center max-w-2xl'>
                {/* Main Heading */}
                <h1 className='text-4xl md:text-5xl font-bold mb-4 text-green-400'>
                    Thank You!
                </h1>
                
                {/* Success Message */}
                <p className='text-xl md:text-2xl text-gray-300 mb-6'>
                    You have successfully completed <span className='text-yellow-400 font-semibold'>{quizTitle}</span>
                </p>
                
                {/* Divider */}
                <div className='border-t border-slate-600 my-6'></div>
                
                {/* Results Info */}
                <div className='bg-slate-800 border border-slate-600 rounded-lg p-6 mb-6'>
                    <p className='text-lg text-gray-200 mb-2'>
                        Your responses have been recorded successfully!
                    </p>
                    <p className='text-md text-gray-400'>
                        Stay tuned for the results. They will be announced soon.
                    </p>
                </div>
                
                {/* Additional Message */}
                <p className='text-gray-400 italic'>
                    "Good luck! We hope you did your best."
                </p>
            </div>

            {/* Back to Home Button */}
            <Button className='w-max px-8 py-3 text-lg' onClick={() => navigate("/")}>
                Back to Home
            </Button>
        </div>
    );
};

export default QuizResults;
