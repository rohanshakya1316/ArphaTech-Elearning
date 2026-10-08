"use client";

import { forgotPassword } from "@/api/auth";
import Spinner from "@/components/Spinner";
import VerifyOTP from "@/components/VerifyOTP";
import { RESET_PASSWORD_PURPOSE } from "@/constants/purposes";
import { LOGIN_ROUTE } from "@/constants/routes";
import { setCookie } from "@/helpers/cookie";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ResetPasswordForm from "../_components/ResetPasswordForm";

const ForgotPasswordPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [showVerifyOTP, setShowVerifyOTP] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showResetPasswordPage, setShowResetPasswordPage] = useState(false);

  const submitForm = (data) => {
    setLoading(true);
    setPhoneNumber(data.phone_number);
    forgotPassword(data)
      .then((response) => {
        toast.success(`${response?.data.message}`);
        reset();
        setShowVerifyOTP(true);
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(error.response?.data?.message || "Something went wrong!");
      })
      .finally(() => setLoading(false));
  };

  const handleOnSuccessOTP = (data) => {
    try {
      setLoading(true);

      setCookie("passwordResetToken", data.reset_token, 5);
      setCookie("resetPhone", phoneNumber, 5);

      toast.success(data?.message);
      setShowResetPasswordPage(true);
      setShowVerifyOTP(false);
    } catch (error) {
      console.log(error);
    }
  };

  const payloadForUnauthenticatedUserForPasswordReset = {
    purpose: RESET_PASSWORD_PURPOSE,
    phone_number: phoneNumber,
  };

  return (
    <>
      {showVerifyOTP ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/20">
          <div onClick={(e) => e.stopPropagation()}>
            <VerifyOTP
              onSuccess={handleOnSuccessOTP}
              verifyData={payloadForUnauthenticatedUserForPasswordReset}
            />
          </div>
        </div>
      ) : showResetPasswordPage ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/20">
          <ResetPasswordForm />{" "}
        </div>
      ) : (
        <div className="w-full max-w-md mx-auto m-10">
          {/* Card */}
          <div className="bg-card rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Top */}
            <div className="bg-primary px-8 py-8 text-white text-center">
              <div className="w-16 h-16 rounded-full bg-white/20 mx-auto flex items-center justify-center">
                <ShieldCheck size={32} />
              </div>

              <h1 className="mt-5 text-3xl font-bold">Forgot Password?</h1>

              <p className="mt-2 text-white/80 text-sm">
                Enter your phone number and we will send you an OTP.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(submitForm)} className="p-8 space-y-6">
              <div>
                <label
                  htmlFor="phone_number"
                  className="block text-sm font-semibold text-heading mb-2"
                >
                  Phone Number
                </label>

                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                    size={20}
                  />

                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    maxLength={10}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-white text-heading focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    required
                    {...register("phone_number")}
                  />
                </div>
              </div>

              <button
                className="relative w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-xl transition duration-300"
                disabled={loading}
              >
                Send OTP{" "}
                {loading && (
                  <Spinner className="absolute top-2.5 right-5 w-7! h-7!" />
                )}
              </button>

              <div className="text-center">
                <Link
                  href={LOGIN_ROUTE}
                  className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-medium"
                >
                  <ArrowLeft size={18} />
                  Back to Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPasswordPage;
