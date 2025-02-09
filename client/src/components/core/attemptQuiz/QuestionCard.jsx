import React, { useState } from "react";

const QuestionCard = React.memo(({ question, onAnswerChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (optionId) => {
    setSelectedOption(optionId);
    onAnswerChange(question._id, optionId);
  };

  return (
    <div className="border border-slate-600 bg-slate-800 w-full p-4 rounded-lg my-3 transition-all duration-300 hover:shadow-lg hover:border-slate-400">
      <h3 className="border-b pb-3 mb-3 border-slate-600 text-lg font-semibold">
        {question.questionText}
      </h3>
      <div className="flex flex-wrap justify-center gap-4">
        {question.options.map((option) => (
          <label
            key={option._id}
            className={`flex items-center justify-center w-[45%] p-3 border rounded-lg cursor-pointer transition-all text-sm font-medium
              ${
                selectedOption === option._id
                  ? "bg-green-500 text-white border-green-600"
                  : "bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600 hover:border-slate-500"
              }`}
            onClick={() => handleOptionChange(option._id)}
            role="radio"
            aria-checked={selectedOption === option._id}
            tabIndex={0}
          >
            <input
              type="radio"
              name={question._id}
              value={option._id}
              className="hidden"
              checked={selectedOption === option._id}
              onChange={() => handleOptionChange(option._id)}
            />
            <span className="text-center">{option.text}</span>
          </label>
        ))}
      </div>
    </div>
  );
});

export default QuestionCard;
