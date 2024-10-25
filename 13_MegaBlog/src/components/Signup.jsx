import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login as authLogin } from "../store/authSlice";
import { Button, Logo, Input } from "./index";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signup = async (data) => {
    setError("");
    try {
      const userData = await authService.signUp(data);
      if (userData) {
        const userCredentials = await authService.currentLoginStatus();
        if (userCredentials) dispatch(authLogin(userCredentials));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
      console.error(`Error during signup: ${error.message}`);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && (
          <p className="text-red-600 mt-8 text-center font-semibold">{error}</p>
        )}
        <form onSubmit={handleSubmit(signup)}>
          <div className="space-y-5">
            <Input
              label="Full name: "
              type="email"
              placeholder="Enter your full name..."
              {...register("email", {
                required: true,
                validate: {
                  pattern: (val) =>
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
                      val
                    ) || "Email address must be a valid address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600 mt-8 text-center">
                {errors.email.message}
              </p>
            )}
            <Input
              type="password"
              label="Password: "
              placeholder="Enter your password..."
              {...register("password", {
                required: true,
                validate: {
                  pattern: (val) =>
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                      val
                    ) || "Password must be a valid password",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-600 mt-8 text-center">
                {errors.password.message}
              </p>
            )}
          </div>
        </form>
        <Button type="submit" classname="w-full">
          Create Account
        </Button>
      </div>
    </div>
  );
}

export default Signup;
