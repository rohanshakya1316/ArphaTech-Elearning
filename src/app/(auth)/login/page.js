"use client";
import Image from "next/image";
import logo from "@/assets/images/logo.jpeg";
import Spinner from "@/components/Spinner";
import PasswordInput from "@/components/PasswordInput";
import { useForm } from "react-hook-form";
import { FORGOT_PASSWORD_ROUTE, REGISTER_ROUTE } from "@/constants/routes";
import { useState } from "react";
import Link from "next/link";
const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const submitForm = (data) => {
    setLoading(true);
    console.log("Phone-->", data.phone);
    console.log("Password-->", data.password);
    setLoading(false);
  };
  return (
    <section className="mx-auto bg-gray-500 rounded-2xl mt-4">
      <div className="w-full max-w-md bg-white/90 p-8">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center">
          <Image
            src={logo}
            alt="Logo"
            width="auto"
            height="auto"
            loading="eager"
            className="h-20 w-24 mix-blend-multiply"
          />
          <h2 className="text-3xl font-bold text-heading">Welcome Back</h2>

          <p className="mt-2 text-body">
            Login to continue with your Learning Journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(submitForm)} className="mt-8 space-y-5">
          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-heading mb-2"
            >
              Phone Number
            </label>

            <input
              type="phone"
              id="phone"
              placeholder="Enter your phone number"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/20"
              required
              autoComplete="off"
              {...register("phone")}
            />
          </div>
          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-heading mb-2"
            >
              Password
            </label>

            <PasswordInput id="password" {...register("password")} />
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-body">
              <input type="checkbox" className="accent-primary" />
              Remember Me
            </label>

            <Link
              href={FORGOT_PASSWORD_ROUTE}
              className="text-primary hover:text-primary-hover font-medium"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="relative w-full rounded-xl bg-primary py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-primary-hover hover:shadow-xl hover:-translate-y-1 active:translate-y-0 disabled:opacity-80"
            disabled={loading}
          >
            Login{" "}
            {loading && (
              <Spinner className="absolute top-2.5 right-5 w-7! h-7!" />
            )}
          </button>

          {/* Divider */}
          <div className="relative flex items-center">
            <div className="grow border-t border-slate-300"></div>

            <span className="mx-4 text-sm text-muted bg-white px-2">OR</span>

            <div className="grow border-t border-slate-300"></div>
          </div>

          {/* Signup */}
          <p className="text-center text-sm text-body">
            Don&apos;t have an account? &nbsp;
            <Link
              href={REGISTER_ROUTE}
              className="text-sm font-semibold text-primary hover:text-primary-hover"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
