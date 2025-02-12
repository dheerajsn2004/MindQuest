import { useEffect, useState } from "react";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const QuizCard = ({ quiz }) => {
  const [attempted, setAttempted] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && quiz?._id) {
      setAttempted(!!user.attemptedQuizzes?.includes(quiz._id));
    }
  }, [user, quiz._id]);

  return (
    <div className="border border-slate-600 bg-slate-900 p-3 rounded-lg relative overflow-hidden">
      {/* Quiz Title */}
      <h2 className="text-xl line-clamp-2 border-b border-slate-600 pb-3 mb-2">
        {quiz?.title || "Untitled Quiz"}
      </h2>

      {/* Quiz Description & Metadata */}
      <div className="font-thin">
        <p className="line-clamp-2">{quiz?.description || "No description available."}</p>
        <span className="flex gap-3 text-sm text-slate-400">
          <p>{quiz?.createdBy?.username || "Unknown User"}</p>|
          <p>{quiz?.createdAt ? formatDistanceToNow(new Date(quiz.createdAt), { addSuffix: true }) : "Unknown Date"}</p>
        </span>
      </div>

      {/* Attempt Now or Leaderboard Button */}
      <Link
        className="mt-4 py-1 px-2 rounded block text-center transition-colors duration-200 
                   text-white bg-green-500 hover:bg-orange-500"
        to={attempted ? "/dashboard" : `/quiz/${quiz._id}`}
      >
        {attempted ? "Attempted" : "Attempt Now"}
      </Link>

      {/* Completed Badge */}
      {attempted && (
        <span className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 text-xs rounded">
          Completed
        </span>
      )}
    </div>
  );
};

export default QuizCard;
