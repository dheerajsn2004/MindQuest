import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../components/Button'
import RequiredError from '../components/RequiredError'
import { login } from '../services/operations/AuthAPIs'
import { TbEyeClosed, TbEyeCheck } from "react-icons/tb";
import toast from 'react-hot-toast'

const LogIn = () => {
  const [hidePassword, setHidePassword] = useState(true)
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (data) => {
    setLoading(true);
    const toastId = toast.loading("Logging in...");
    try {
      const response = await login(data, dispatch);
      if (response) {
        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Error while logging in:", error);
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <section>
        <h1 className='text-orange-400 text-center pb-5 text-4xl font-mono'>Electronika'25</h1>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className='flex flex-col gap-y-3 max-w-[480px] shadow-lg border p-10 rounded-lg'
        >
          <h3 className='text-orange-400 text-4xl pb-5 text-center'>
            Log in to Your Account
          </h3>

          {loading && <span className='text-center text-red-500 text-sm'>Loading... Please wait</span>}

          {/* Email Field */}
          <span className='flex flex-col gap-1'>
            <label htmlFor="email">Email</label>
            <input
              id='email'
              placeholder='Email'
              autoComplete="email"
              className='py-2 px-3 text-base bg-slate-300 text-slate-950 rounded-lg outline-none xl:text-xl'
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <RequiredError>{errors.email.message}</RequiredError>}
          </span>

          {/* Password Field */}
          <span className='flex flex-col gap-1'>
            <label htmlFor="password">Password</label>
            <span className='flex items-center w-full'>
              <input
                id='password'
                placeholder='Password'
                autoComplete="current-password"
                className='py-2 px-3 text-base bg-slate-300 text-slate-950 w-full rounded-lg outline-none xl:text-xl'
                type={hidePassword ? "password" : "text"}
                {...register("password", { required: "Password is required" })}
              />
              <span
                className='p-3 cursor-pointer'
                onClick={() => setHidePassword(!hidePassword)}
              >
                {hidePassword ? <TbEyeClosed /> : <TbEyeCheck />}
              </span>
            </span>
            {errors.password && <RequiredError>{errors.password.message}</RequiredError>}
          </span>

          {/* Submit Button */}
          <span className='mt-2 '>
            <Button className=' py-1 px-36' disabled={loading} variant={"primary"} type="submit">
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </span>

          <p className='text-center mt-3'>
            Don't have an account? 
            <span onClick={() => navigate("/signup")} className='cursor-pointer text-green-500 ml-1'>
              Sign Up
            </span>
          </p>

        </form>
      </section>
    </div>
  )
}

export default LogIn;
