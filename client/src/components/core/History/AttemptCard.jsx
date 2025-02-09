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

            {/* Score Display */}
            <div>
                <h3 className='flex items-center justify-center gap-3 text-base md:text-xl my-3'>
                    Score 
                    <span className='text-xl md:text-3xl font-semibold'>
                        <span className={`${score / totalQuestions >= 0.4 ? "text-green-500" : "text-red-700"}`}>
                            {score}
                        </span> / {totalQuestions}
                    </span>
                </h3>
            </div>

            {/* Attempt Again Button */}
            <Button 
                onClick={() => navigate(`../../quiz/${item?.quizId?._id}`)} 
                className="w-full mt-2"
            >
                Attempt Again
            </Button>
        </div>
    );
}

export default AttemptCard;
