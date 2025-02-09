import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../Button';
import { IoAdd, IoClose } from "react-icons/io5";
import { createQuestion } from '../../../services/operations/questionAPIs';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const CreateQuestionModal = ({ quiz, setQuestions, setCreateQuestionModalData }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentOption, setCurrentOption] = useState('');
  const [isCurrentOptionCorrect, setIsCurrentOptionCorrect] = useState(false);
  const [optionError, setOptionError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { token } = useSelector(state => state.auth);

  const submitHandler = async (data) => {
    if (options.length < 4) {
      setOptionError("There must be at least 4 options.");
      return;
    }

    if (!options.some(option => option.isCorrect)) {
      setOptionError("At least one option must be correct.");
      return;
    }

    setLoading(true);
    data.options = options;
    data.quizId = quiz._id;

    try {
      const response = await createQuestion(data, token);
      if (response) {
        setQuestions(prevQuestions => [...prevQuestions, response]);
        setCreateQuestionModalData(null);
      }
    } catch (e) {
      console.error("ERROR WHILE CREATING THE QUESTION:", e);
      toast.error("Question cannot be created");
    } finally {
      setLoading(false);
    }
  };

  const addOption = useCallback(() => {
    if (!currentOption.trim()) {
      setOptionError("Option text cannot be empty.");
      return;
    }

    if (options.some(opt => opt.text === currentOption.trim())) {
      setOptionError("This option already exists.");
      return;
    }

    if (isCurrentOptionCorrect && options.some(option => option.isCorrect)) {
      setOptionError("Only one correct option is allowed.");
      return;
    }

    setOptions([...options, { text: currentOption.trim(), isCorrect: isCurrentOptionCorrect }]);
    setOptionError('');
    setCurrentOption('');
    setIsCurrentOptionCorrect(false);
  }, [currentOption, isCurrentOptionCorrect, options]);

  const removeOption = useCallback((index) => {
    setOptions(prevOptions => prevOptions.filter((_, i) => i !== index));
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className='max-w-[640px] w-full mx-auto p-5 flex flex-col bg-slate-800 shadow-lg rounded-lg border border-slate-600'>
        <h3 className='text-3xl text-center'>Create a Question</h3>
        <form onSubmit={handleSubmit(submitHandler)} className='w-full flex flex-col gap-5'>

          <label className="flex flex-col gap-2">
            Enter Question
            <input
              type="text"
              placeholder='Enter Question here'
              className='py-2 px-3 bg-slate-300 rounded-lg outline-none text-black text-lg'
              {...register("questionText", { required: "Question is required" })}
            />
            {errors.questionText && <p className='text-red-500'>{errors.questionText.message}</p>}
          </label>

          <label className="flex flex-col gap-2">
            Add Options
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder='Enter an option'
                className='py-2 px-3 bg-slate-300 rounded-lg outline-none text-black text-lg w-full'
                value={currentOption}
                onChange={(e) => setCurrentOption(e.target.value)}
              />
              <input
                type="checkbox"
                checked={isCurrentOptionCorrect}
                onChange={() => setIsCurrentOptionCorrect(!isCurrentOptionCorrect)}
              />
              <label>Correct?</label>
              <button onClick={addOption} type='button' className='p-2 bg-blue-500 text-white rounded-lg'>
                <IoAdd />
              </button>
            </div>
          </label>

          {options.length > 0 && (
            <div className="flex flex-col gap-2">
              {options.map((option, index) => (
                <div key={index} className='flex items-center justify-between bg-gray-700 p-2 rounded-md'>
                  <p className='text-white'>{option.text}</p>
                  {option.isCorrect && <span className='text-green-500'>(Correct)</span>}
                  <button onClick={() => removeOption(index)} className='text-red-500'>
                    <IoClose />
                  </button>
                </div>
              ))}
            </div>
          )}

          {optionError && <p className='text-red-500'>{optionError}</p>}

          <div className='flex justify-end gap-3'>
            <Button onClick={() => setCreateQuestionModalData(null)} className='w-max h-max' active={false}>Cancel</Button>
            <Button type="submit" disabled={loading} className='w-max h-max' active>Create</Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateQuestionModal;
