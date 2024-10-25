import React, { useState } from "react";
import { Button, Logo, Input } from "./index";
import { login as authLogin } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.logIn(data);
      if (session) {
        const userData = await authService.currentLoginStatus();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
      console.error(`Error during login: ${error}`);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don't have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              type="email"
              placeholder="Enter your email..."
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
          <Button type="submit" classname="w-full">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
