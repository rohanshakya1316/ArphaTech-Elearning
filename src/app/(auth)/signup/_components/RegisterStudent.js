"use client";
import { sendOTP } from "@/api/auth";
import logo from "@/assets/images/logo.jpeg";
import nepalFlag from "@/assets/images/nepal-flag.svg";
import PasswordInput from "@/components/PasswordInput";
import Spinner from "@/components/Spinner";
import { LOGIN_ROUTE } from "@/constants/routes";
import { ArrowRight, GraduationCap, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import CustomizedInputField from "./CustomizedInputField";

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, control, setValue } = useForm();

  // Disable body scroll when OTP modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function in case the component unmounts while open
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const submitForm = (data) => {
    setLoading(true);
    console.log(data)
  };

  return (
    <>
      {/* {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary/20"
          onClick={() => setOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <VerifyOTP />
          </div>
        </div>
      )} */}

      <section className="mx-auto bg-gray-500 rounded-2xl my-4">
        <div className={`w-full max-w-fit bg-white/90 p-8`}>
          {/* Header */}
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl text-primary font-bold">
              Complete your Student Profile
            </h2>

            <p className="mt-2 text-body">
              Tell us a bit about yourself so that we could analyze your
              learning journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(submitForm)} className="mt-8 space-y-5">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm: gap-x-4 md:grid-cols-4 md:gap-x-4 lg:grid-cols-6 lg:gap-4">
              {/* Email */}
              <div className="col-span-full">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-heading mb-2"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/20"
                  required
                  autoComplete="off"
                  {...register("email")}
                />
              </div>

              {/* School or College Name */}
              <div className="col-span-full">
                <label
                  htmlFor="instituteName"
                  className="block text-sm font-medium text-heading mb-2"
                >
                  School or College Name
                </label>

                <CustomizedInputField register={register} setValue={setValue} control={control} />
              </div>

              {/* Current grade or year */}
              <div className="md:col-span-2 lg:col-span-3">
                <label
                  htmlFor="grade_year"
                  className="block text-sm font-medium text-heading mb-2"
                >
                  Current grade / year
                </label>

                <input
                  type="text"
                  id="grade_year"
                  placeholder="Current grade / year"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition-all duration-300
            focus:border-primary focus:ring-4 focus:ring-primary/20"
                  required
                  autoComplete="off"
                  {...register("grade_year")}
                />
              </div>

              {/* Faculty / Major */}
              <div className="md:col-span-2 lg:col-span-3">
                <label
                  htmlFor="faculty_major"
                  className="block text-sm font-medium text-heading mb-2"
                >
                  Faculty / Major
                </label>

                <input
                  type="text"
                  id="faculty_major"
                  placeholder="Enter your faculty / major"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition-all duration-300
            focus:border-primary focus:ring-4 focus:ring-primary/20"
                  required
                  autoComplete="off"
                  {...register("faculty_major")}
                />
              </div>

              {/* Address */}
              <div className="col-span-full">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-heading mb-2"
                >
                  Address
                </label>

                <input
                  type="text"
                  id="address"
                  placeholder="Address"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition-all duration-300
            focus:border-primary focus:ring-4 focus:ring-primary/20"
                  required
                  autoComplete="off"
                  {...register("address")}
                />
              </div>

              {/* Password */}
              <div className="md:col-span-2 lg:col-span-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-heading mb-2"
                >
                  Password
                </label>

                <PasswordInput id="password" {...register("password")} />
              </div>

              {/* Confirm Password */}
              <div className="md:col-span-2 lg:col-span-3">
                <label
                  htmlFor="password_confirm"
                  className="block text-sm font-medium text-heading mb-2"
                >
                  Confirm Password
                </label>

                <PasswordInput
                  id="password_confirm"
                  placeholder="Enter your confirm password"
                  {...register("password_confirm")}
                />
              </div>
            </div>

            {/* Divider */}
            <div className="relative flex items-center">
              <div className="grow border-t border-slate-400"></div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-body">
                <input type="checkbox" className="accent-primary" required />
                By clicking continue, you agree to our Terms & Privacy Policy
              </label>
            </div>

            {/* Complete Student Profile Button */}
            <button
              type="submit"
              className="relative w-full rounded-xl bg-primary py-2 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-primary-hover hover:shadow-xl hover:-translate-y-1 active:translate-y-0 disabled:opacity-80"
              disabled={loading}
            >
              <span className="flex items-center justify-center gap-4">
                {" "}
                Complete Profile <ArrowRight size={30} />
              </span>
              {loading && (
                <Spinner className="absolute top-2.5 right-5 w-7! h-7!" />
              )}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignupPage;
