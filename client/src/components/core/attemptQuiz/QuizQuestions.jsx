import React, { useState, useEffect, useCallback } from "react";
import Button from "../../Button";
import QuestionCard from "./QuestionCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../../../services/apiConnector";
import { quizEndpoints } from "../../../services/APIs";
import { setUser } from "../../../slices/AuthSlice";

const QuizQuestions = ({ quizDetails, quizQuestions }) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Generate a unique key for this quiz attempt
  const storageKey = `quiz_attempt_${quizDetails?._id}`;

  // Load saved state on component mount
  useEffect(() => {
    if (!quizDetails) return;

    const savedState = localStorage.getItem(storageKey);
    if (savedState) {
      try {
        const { started, timeRemaining, answers, timestamp } = JSON.parse(savedState);
        
        // Calculate elapsed time since last save
        const elapsedSeconds = Math.floor((Date.now() - timestamp) / 1000);
        const adjustedTime = Math.max(0, timeRemaining - elapsedSeconds);

        if (adjustedTime > 0) {
          setQuizStarted(started);
          setRemainingTime(adjustedTime);
          setUserAnswers(answers);
        } else {
          // Time expired while away, clear storage and auto-submit
          localStorage.removeItem(storageKey);
          setRemainingTime(0);
          setQuizStarted(true);
        }
      } catch (error) {
        console.error("Error loading saved quiz state:", error);
        // If corrupted, start fresh
        localStorage.removeItem(storageKey);
        setRemainingTime(quizDetails.timer * 60);
      }
    } else if (quizDetails?.timer) {
      setRemainingTime(quizDetails.timer * 60);
    }
  }, [quizDetails]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (quizStarted && quizDetails) {
      const stateToSave = {
        started: quizStarted,
        timeRemaining: remainingTime,
        answers: userAnswers,
        timestamp: Date.now()
      };
      localStorage.setItem(storageKey, JSON.stringify(stateToSave));
    }
  }, [quizStarted, remainingTime, userAnswers, quizDetails]);

  // Timer effect
  useEffect(() => {
    let timer;
    if (quizStarted && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => Math.max(0, prevTime - 1));
      }, 1000);
    } else if (quizStarted && remainingTime === 0) {
      clearInterval(timer);
      localStorage.removeItem(storageKey);
      alert("⏰ Time's Up! Your quiz will be submitted automatically.");
      submitQuiz(true);
    }
    return () => clearInterval(timer);
  }, [quizStarted, remainingTime]);

  // Add beforeunload warning to prevent accidental page close
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (quizStarted && remainingTime > 0) {
        e.preventDefault();
        e.returnValue = "You have a quiz in progress. Your progress will be saved if you refresh.";
        return e.returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [quizStarted, remainingTime]);

  const handleAnswerChange = useCallback((questionId, selectedOption) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  }, []);

  const startQuiz = () => setQuizStarted(true);

  const submitQuiz = async (isTimeUp = false) => {
    try {
      const answersArray = Object.entries(userAnswers).map(([questionId, selectedOption]) => ({
        questionId,
        selectedOption,
      }));

      if (!isTimeUp && answersArray.length !== quizQuestions.length) {
        alert("Please answer all questions before submitting.");
        return;
      }

      const response = await apiConnector(
        "POST",
        `${quizEndpoints.ATTEMMP_QUIZ}/${quizDetails._id}/attempt`,
        { quizId: quizDetails._id, answers: answersArray }
      );

      if (response?.data?.score !== undefined) {
        // Clear saved state after successful submission
        localStorage.removeItem(storageKey);
        
        dispatch(
          setUser({
            ...user,
            attemptedQuizzes: [...(user.attemptedQuizzes || []), quizDetails._id],
          })
        );
        navigate("/quiz-results", { state: { quizTitle: quizDetails.title } });
      } else {
        throw new Error("Invalid response from the server.");
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Failed to submit the quiz. Please try again.");
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="flex py-5 border min-h-[70vh] px-5 justify-center items-start mt-5 rounded-lg bg-slate-900 border-slate-600">
      {!quizStarted ? (
        <Button className="h-16 w-max text-lg self-center" onClick={startQuiz}>
          Start Quiz
        </Button>
      ) : (
        <div className="w-full flex flex-col">
          <h2 className="border border-slate-600 py-2 px-3 rounded-lg text-center md:text-end">
            Time Remaining: <span className="text-red-500 ml-2">{formatTime(remainingTime)}</span>
          </h2>
          <div className="min-h-[50vh]">
            {quizQuestions &&
              quizQuestions.map((ques) => (
                <QuestionCard 
                  key={ques._id} 
                  question={ques} 
                  onAnswerChange={handleAnswerChange}
                  initialAnswer={userAnswers[ques._id]}
                />
              ))}
          </div>
          <Button
            className="w-32 h-16 text-lg self-center mt-5"
            onClick={submitQuiz}
            disabled={Object.keys(userAnswers).length !== quizQuestions.length}
          >
            Submit
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuizQuestions;
