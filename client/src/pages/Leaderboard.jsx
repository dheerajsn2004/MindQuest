import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { apiConnector } from "../services/apiConnector";
import { quizEndpoints } from "../services/APIs/index";
import QuizCard from "../components/core/Home/QuizCard";
import { useParams } from "react-router-dom";

const Leaderboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);
  const { id: quizId } = useParams();

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const response = await apiConnector(
        "POST",
        quizEndpoints.GET_LEADERBOARD,
        {
          id: quizId,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      setQuizzes(response.data.data);
    } catch (e) {
      console.log("COULDNT GET LEADERBOARD");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <section className="min-h-[90vh] border-t border-slate-600 py-5 mt-3">
      <h1 className="text-4xl text-center font-bold text-orange-500 ">
        Leaderboard
      </h1>
      {loading ? (
        <div className="text-center min-h-[90vh] flex items-center justify-center text-xl ">
          Loading...
        </div>
      ) : !loading && quizzes?.length > 0 ? (
        <div className="">
          <div className="grid gap-3 grid-cols-3 text-center text-2xl font-bold text-green-500 my-6">
            <div>Rank</div>
            <div>Name</div>
            <div>Score</div>
          </div>
          {quizzes.map((quiz, key) => {
            const bg =
              key === 0
                ? "bg-yellow-400"
                : key === 1
                ? "bg-slate-400"
                : key === 2
                ? "bg-yellow-700"
                : "bg-gray-100";

            return (
              <div
                key={key}
                className={`grid gap-3 grid-cols-3 py-3 px-4 text-xl text-center ${bg} rounded-lg mb-4 text-black`}
                style={{
                  boxShadow: "0 8px 20px rgba(255, 165, 0, 0.7)", // Thicker orange shadow
                }}
              >
                <div>{key + 1}</div>
                <div>{quiz.userId?.username}</div>
                <div>{quiz.score}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No SUBMISSIONS FOUND</p>
      )}
    </section>
  );
};

export default Leaderboard;
