import React, { useState } from "react";
import Score from "./Score";
import { IoIosArrowUp } from "react-icons/io";
import Button from "../../Button";
import { useDispatch } from "react-redux";
import { setEdit, setQuiz } from "../../../slices/QuizSlice";
import { useNavigate } from "react-router-dom";

const QuizCard = ({ quiz, handleDeleteQuiz }) => {
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditQuiz = () => {
    dispatch(setQuiz(quiz));
    dispatch(setEdit(true));
    navigate(`/dashboard/edit-quiz/${quiz._id}`);
  };

  return (
    <div className="py-4 px-6 border border-slate-600 bg-slate-900 hover:border-slate-400 transition-all duration-300 rounded-lg relative shadow-md">
      {/* Header: Title & Expand/Collapse Toggle */}
      <span
        onClick={() => setShowDetails(!showDetails)}
        className="border-b border-slate-600 cursor-pointer pb-3 mb-3 flex justify-between items-center"
      >
        <h3 className="text-xl font-semibold capitalize">Title: {quiz.title}</h3>
        <IoIosArrowUp
          className={`text-xl transition-transform duration-300 ${
            !showDetails ? "rotate-180" : "rotate-0"
          }`}
        />
      </span>

      {/* Description & Time */}
      <div className="flex flex-col md:flex-row gap-y-3 justify-between">
        <div>
          <p className="text-gray-300">Description: {quiz.description}</p>
          <p className="text-gray-300">Time: {quiz.timer} minutes</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end items-center">
          <Button
            onClick={() => handleDeleteQuiz(quiz._id)}
            className="w-max bg-red-600 hover:bg-red-700"
          >
            Delete
          </Button>
          <Button
            onClick={handleEditQuiz}
            className="w-max bg-blue-600 hover:bg-blue-700"
          >
            Edit
          </Button>
        </div>
      </div>

      {/* Expandable Score Details */}
      {showDetails && <Score quiz={quiz} />}
    </div>
  );
};

export default QuizCard;
