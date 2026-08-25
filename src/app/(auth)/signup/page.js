"use client";
import logo from "@/assets/images/logo.jpeg";
import nepalFlag from "@/assets/images/nepal-flag.svg";
import PasswordInput from "@/components/PasswordInput";
import Spinner from "@/components/Spinner";
import { LOGIN_ROUTE } from "@/constants/routes";
import { GraduationCap, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: { role: "" },
  });

  // watch the role field
  const selectedRole = useWatch({ control, name: "role" });

  const submitForm = (data) => {
    setLoading(true);
    console.log(data);
    setLoading(false);
  };

  const handleRoleSelect = (role) => {
    setValue("role", role, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <section className="mx-auto bg-gray-500 rounded-2xl my-4">
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
          <h2 className="text-3xl font-bold text-heading">Sign In</h2>

          <p className="mt-2 text-body">
            Sign in to continue with your Learning Journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(submitForm)} className="mt-8 space-y-5">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-x-4 lg:grid-cols-3 lg:gap-4">
            {/* Firstname */}
            <div>
              <label
                htmlFor="firstname"
                className="block text-sm font-medium text-heading mb-2"
              >
                First Name
              </label>

              <input
                type="text"
                id="firstname"
                placeholder="First Name"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition-all duration-300
            focus:border-primary focus:ring-4 focus:ring-primary/20"
                required
                autoComplete="off"
                {...register("firstname")}
              />
            </div>
            {/* Middle Name */}
            <div>
              <label
                htmlFor="middlename"
                className="block text-sm font-medium text-heading mb-2"
              >
                Middle Name
              </label>

              <input
                type="text"
                id="middlename"
                placeholder="Middle Name"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition-all duration-300
            focus:border-primary focus:ring-4 focus:ring-primary/20"
                autoComplete="off"
                {...register("middlename")}
              />
            </div>
            {/* Last Name */}
            <div className="md:col-span-2 lg:col-span-1">
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-heading mb-2"
              >
                Last Name
              </label>

              <input
                type="text"
                id="lastname"
                placeholder="Last Name"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition-all duration-300
            focus:border-primary focus:ring-4 focus:ring-primary/20"
                required
                autoComplete="off"
                {...register("lastname")}
              />
            </div>
          </div>

          {/* Password */}
          <div className="hidden">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-heading mb-2"
            >
              Password
            </label>

            <PasswordInput id="password" {...register("password")} />
          </div>

          {/* Phone with Country Code */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-heading mb-2"
            >
              Phone Number
            </label>

            <div className="flex items-center justify-center gap-2">
              <div className="flex gap-1 max-w-auto rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/20 text-gray-500">
                <Image
                  src={nepalFlag}
                  alt="Nepal"
                  height="auto"
                  width="auto"
                  className="h-6 w-6 -ml-2 object-contain"
                />
                <span className="text-sm text-gray-700 mr-3 pt-0.5">+977</span>
              </div>

              <input
                type="phone"
                id="phone"
                placeholder="Enter your phone number"
                maxLength={10}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/20"
                required
                autoComplete="off"
                {...register("phone")}
              />
            </div>
          </div>

          {/* Divider */}
          <div className="relative flex items-center">
            <div className="grow border-t border-slate-400"></div>
          </div>

          {/* User Roles */}
          <div>
            <input type="hidden" {...register("role")} />
            <h3 className="text-xl font-semibold text-center mb-4">
              Select your role as a user
            </h3>
            <div className="grid grid-cols-2 items-stretch justify-center">
              <div
                onClick={() => handleRoleSelect("student")}
                className={`mx-auto w-36 md:w-44 overflow-hidden cursor-pointer rounded-2xl bg-white shadow-lg hover:shadow-2xl border ${selectedRole == "student" ? `bg-blue-100!` : `border-transparent bg-white`}`}
              >
                <div className="mx-auto mt-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f4e3cf]/50">
                  <span>
                    <GraduationCap size={32} />
                  </span>
                </div>
                <div className="p-1 text-center text-primary">
                  <h2 className="text-xl font-bold">Student</h2>
                  <span className="inline-block m-4 text-[10px] text-black tracking-tight">
                    Access courses, track progress, achieve learning goals
                  </span>
                </div>
              </div>

              <div
                onClick={() => handleRoleSelect("teacher")}
                className={`mx-auto w-36 md:w-44 overflow-hidden cursor-pointer rounded-2xl bg-white shadow-lg hover:shadow-2xl border ${selectedRole == "teacher" ? `bg-blue-100!` : `border-transparent bg-white`}`}
              >
                <div className="mx-auto mt-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f4e3cf]/50">
                  <span>
                    <UserRound size={32} />
                  </span>
                </div>
                <div className="p-1 text-center text-primary">
                  <h2 className="text-xl font-bold">Teacher</h2>
                  <span className="inline-block m-4 text-[10px] text-black tracking-tight">
                    Create contents, manage learners and teach
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-body">
              <input type="checkbox" className="accent-primary" />I accept Terms
              & Conditions
            </label>
          </div>

          {/* Send OTP Button */}
          <button
            type="submit"
            className="relative w-full rounded-xl bg-primary py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-primary-hover hover:shadow-xl hover:-translate-y-1 active:translate-y-0 disabled:opacity-80"
            disabled={loading}
          >
            Send OTP{" "}
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
            Already have an account? &nbsp;
            <Link
              href={LOGIN_ROUTE}
              className="text-sm font-semibold text-primary hover:text-primary-hover"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
