import React, { memo } from 'react';
import Button from '../../Button';

const QuestionCard = ({ question, deleteQuestionHandler }) => {
  return (
    <div className='space-y-3 border border-slate-600 bg-slate-900 px-5 py-3 rounded-lg'>
      {/* Question Header */}
      <span className='flex justify-between gap-5 border-b pb-3 border-slate-600'>
        <h4 className='text-xl font-semibold break-words'>{question.questionText}</h4>
      </span>

      {/* Options Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        {question.options.map((option, index) => (
          <div 
            key={index} 
            className={`border-2 rounded-lg py-1 px-3 text-sm md:text-base ${option.isCorrect ? "border-green-500 bg-green-900/20" : "border-red-500 bg-red-900/20"}`}
          >
            {option.text}
          </div>
        ))}
      </div>

      {/* Delete Button */}
      <div className='flex justify-end py-3'>
        <Button
          onClick={() => deleteQuestionHandler(question)}
          className='w-max h-max'
          active={false}
          aria-label="Delete question"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default memo(QuestionCard);
