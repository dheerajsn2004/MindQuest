import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { apiConnector } from "../services/apiConnector";
import { quizEndpoints } from "../services/APIs/index";
import { useParams } from "react-router-dom";

const Leaderboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const { id: quizId } = useParams();

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      setError(null); // Reset error state
      try {
        const response = await apiConnector(
          "POST",
          quizEndpoints.GET_LEADERBOARD,
          { id: quizId }
        );

        if (!response.data.success) {
          console.log(response.data.message || "Failed to fetch data");
        }

        setQuizzes(response.data.data);
      } catch (error) {
        console.log(error.message || "Couldn't get leaderboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [quizId, token]); // Added dependencies to avoid stale state issues

  return (
    <section className="min-h-[90vh] border-t border-slate-600 py-5 mt-3">
      <h1 className="text-4xl text-center font-bold text-orange-500">
        Leaderboard
      </h1>

      {loading ? (
        <div className="text-center min-h-[90vh] flex items-center justify-center text-xl">
          Loading...
        </div>
      ) : error ? (
        <div className="text-center text-red-500 font-semibold">
          {error}
        </div>
      ) : quizzes.length > 0 ? (
        <div>
          {/* Header Row */}
          <div className="grid gap-3 grid-cols-3 text-center text-2xl font-bold text-green-500 my-6">
            <div>Rank</div>
            <div>Name</div>
            <div>Score</div>
          </div>

          {/* Leaderboard Entries */}
          {quizzes.map((quiz, index) => {
            const bg =
              index === 0
                ? "bg-yellow-400"
                : index === 1
                ? "bg-slate-400"
                : index === 2
                ? "bg-yellow-700"
                : "bg-gray-100";

            return (
              <div
                key={quiz.userId?._id || index}
                className={`grid gap-3 grid-cols-3 py-3 px-4 text-xl text-center ${bg} rounded-lg mb-4 text-black shadow-lg`}
              >
                <div>{index + 1}</div>
                <div>{quiz.userId?.username || "Unknown"}</div>
                <div>{quiz.score}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 font-semibold">
          No submissions found.
        </p>
      )}
    </section>
  );
};

export default Leaderboard;
