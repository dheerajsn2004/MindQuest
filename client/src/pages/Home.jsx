import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { apiConnector } from '../services/apiConnector';
import { quizEndpoints } from '../services/APIs/index';
import QuizCard from '../components/core/Home/QuizCard';

const Home = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector(state => state.auth);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const response = await apiConnector('GET', quizEndpoints.GET_ALL_QUIZES, null, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      setQuizzes(response.data.data);
    } catch (e) {
      console.error('COULD NOT GET QUIZZES:', e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <section className='min-h-[90vh] border-t border-slate-600 py-5 mt-3 px-3 sm:px-6 md:px-8 lg:px-10'>
      {loading ? (
        <div className='text-lg sm:text-xl md:text-2xl min-h-[80vh] flex items-center justify-center'>
          Loading...
        </div>
      ) : quizzes.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {quizzes.map((quiz, index) => (
            <QuizCard key={quiz._id} quiz={quiz} index={index} />
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center min-h-[80vh] text-center'>
          <p className='text-lg sm:text-xl md:text-2xl text-gray-400'>No quizzes found</p>
        </div>
      )}
    </section>
  );
};

export default Home;
