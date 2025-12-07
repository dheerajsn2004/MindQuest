import { useNavigate } from 'react-router-dom';
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import Button from '../../Button';

const AttemptCard = ({ item }) => {
    const navigate = useNavigate();

    // Ensure safe access to properties
    const quizTitle = item?.quizId?.title || "Untitled Quiz";
    const quizDescription = item?.quizId?.description || "No description available.";
    const createdAt = item?.createdAt ? formatDistanceToNow(new Date(item.createdAt), { addSuffix: true }) : "N/A";
    const score = item?.score || 0;
    const totalQuestions = item?.answers?.length || 1; // Avoid division by zero

    return (
        <div className='border border-slate-600 p-5 rounded-lg flex flex-col gap-3'>
            {/* Quiz Details */}
            <div>
                <h3 className='text-lg md:text-xl font-semibold line-clamp-2'>{quizTitle}</h3>
                <p className='text-xs md:text-base line-clamp-2 font-thin text-slate-200'>{quizDescription}</p>
                <span className='text-xs md:text-base text-end font-thin text-slate-300'>{createdAt}</span>
            </div>

            {/* Status Message */}
            <div className='bg-slate-800 border border-slate-600 rounded-lg p-4 my-3'>
                <p className='text-center text-gray-300'>
                    Quiz completed successfully!
                </p>
                <p className='text-center text-sm text-gray-400 mt-1'>
                    Results will be announced soon
                </p>
            </div>

            {/* Attempt Again Button */}
            <Button 
                onClick={() =>'#'} 
                className="w-full mt-2"
            >
                Attempted
            </Button>
        </div>
    );
}

export default AttemptCard;
