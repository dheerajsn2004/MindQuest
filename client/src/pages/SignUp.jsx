import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import RequiredError from "../components/RequiredError";
import { signUp } from "../services/operations/AuthAPIs";
import HighLightText from "../components/HighLightText";
import { TbEyeClosed, TbEyeCheck } from "react-icons/tb";

const SignUp = () => {
  const [hidePassword, setHidePassword] = useState({
    password: true,
    confirmPassword: true,
  });
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const navigate = useNavigate();

  // Handle form submission
  const submitHandler = async (data) => {
    setLoading(true);
    const toastId = toast.loading("Signing up...");

    try {
      const response = await signUp(data);
      if (response) {
        toast.success("Account created successfully! Redirecting...");
        navigate("/login");
      }
    } catch (e) {
      console.error("ERROR WHILE SIGNING UP: ", e);
      toast.error(e.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  // Set default role to "user"
  useEffect(() => {
    setValue("role", "user");
  }, [setValue]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <section>
        <h1 className="text-center pb-5 text-4xl font-mono">Electronika 22.0</h1>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col gap-y-3 max-w-[480px] shadow-lg shadow-blue-300 border p-10 rounded-lg"
        >
          <div>
            <h3 className="text-4xl pb-5 text-center leading-[1.125]">
              Create Your <HighLightText>Free</HighLightText> Account Now!!!
            </h3>
          </div>

          {loading && (
            <span className="text-center text-red-500 text-sm">
              First-time signups may take a moment. Please be patient!
            </span>
          )}

          {/* Username Field */}
          <span className="flex flex-col gap-1">
            <label htmlFor="username">Create a Username</label>
            <input
              id="username"
              placeholder="Username"
              className="py-2 text-base placeholder:text-black text-slate-950 rounded-lg px-3 outline-none bg-slate-300 xl:text-xl"
              type="text"
              autoComplete="username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && <RequiredError>{errors.username.message}</RequiredError>}
          </span>

          {/* Email Field */}
          <span className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              placeholder="Email"
              className="py-2 text-base placeholder:text-black text-slate-950 rounded-lg px-3 outline-none bg-slate-300 xl:text-xl"
              type="email"
              autoComplete="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <RequiredError>{errors.email.message}</RequiredError>}
          </span>

          {/* Password Field */}
          <span className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <span className="flex items-center w-full">
              <input
                id="password"
                placeholder="Password"
                className="py-2 text-base placeholder:text-black text-slate-950 w-full rounded-lg px-3 outline-none bg-slate-300 xl:text-xl"
                type={hidePassword.password ? "password" : "text"}
                autoComplete="new-password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters long" },
                })}
              />
              <span
                className="p-3 cursor-pointer"
                onClick={() => setHidePassword((prev) => ({ ...prev, password: !prev.password }))}
              >
                {hidePassword.password ? <TbEyeClosed /> : <TbEyeCheck />}
              </span>
            </span>
            {errors.password && <RequiredError>{errors.password.message}</RequiredError>}
          </span>

          {/* Confirm Password Field */}
          <span className="flex flex-col gap-1">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <span className="flex items-center w-full">
              <input
                id="confirmPassword"
                placeholder="Confirm Password"
                className="py-2 text-base placeholder:text-black text-slate-950 w-full rounded-lg px-3 outline-none bg-slate-300 xl:text-xl"
                type={hidePassword.confirmPassword ? "password" : "text"}
                autoComplete="new-password"
                {...register("confirmPassword", {
                  required: "Re-enter your password",
                  validate: (value) => value === watch("password") || "Passwords do not match",
                })}
              />
              <span
                className="p-3 cursor-pointer"
                onClick={() =>
                  setHidePassword((prev) => ({ ...prev, confirmPassword: !prev.confirmPassword }))
                }
              >
                {hidePassword.confirmPassword ? <TbEyeClosed /> : <TbEyeCheck />}
              </span>
            </span>
            {errors.confirmPassword && <RequiredError>{errors.confirmPassword.message}</RequiredError>}
          </span>

          {/* Role Selection */}
          <span className="flex border border-slate-600 p-1 cursor-pointer w-max gap-3 rounded-full">
            <button
              type="button"
              className={`${role === "user" ? "bg-green-700 text-white" : "bg-transparent"} px-3 rounded-full`}
              onClick={(e) => {
                e.preventDefault();
                setValue("role", "user");
                setRole("user");
              }}
            >
              User
            </button>

            {/* Uncomment below if Admin option is needed */}
            {/* 
            <button
              type="button"
              className={`${role === "admin" ? "bg-green-700 text-white" : "bg-transparent"} px-3 rounded-full`}
              onClick={(e) => {
                e.preventDefault();
                setValue("role", "admin");
                setRole("admin");
              }}
            >
              Admin
            </button> 
            */}
          </span>

          {/* Sign Up Button */}
          <span>
            <Button className="py-3 px-36" disabled={loading} varient="primary" type="submit">
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </span>

          {/* Redirect to Login */}
          <p className="text-center mt-3">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} className="text-green-500 cursor-pointer">
              Log in
            </span>
          </p>
        </form>
      </section>
    </div>
  );
};

export default SignUp;
