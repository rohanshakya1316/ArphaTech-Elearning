"use client";

import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import { LOGIN_ROUTE } from "@/constants/routes";
import PasswordInput from "@/components/PasswordInput";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { confirmResetPassword } from "@/api/auth";
import { getCookie } from "@/helpers/cookie";
import { useRouter } from "next/navigation";

const ResetPasswordForm = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const password = useWatch({ control, name: "new_password" });

  const resetToken = getCookie("passwordResetToken");

  const submitForm = (data) => {
    const payloadForResetPassword = {
      ...data,
      reset_token: resetToken,
    };
    confirmResetPassword(payloadForResetPassword)
      .then(() => {
        toast.success("Password reset successfully!");
        reset();
        router.replace(LOGIN_ROUTE);
      })
      .catch((error) => console.log(error));
  };

  return (
    <section>
      <div className="w-full max-w-md">
        <div className="bg-card rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}

          <div className="bg-primary px-8 py-8 text-center text-white">
            <div className="w-16 h-16 rounded-full bg-white/20 mx-auto flex items-center justify-center">
              <Lock size={30} />
            </div>

            <h1 className="mt-5 text-3xl font-bold">Reset Password</h1>

            <p className="mt-2 text-sm text-white/80">
              Choose a strong password to secure your account.
            </p>
          </div>

          {/* Form */}

          <form onSubmit={handleSubmit(submitForm)} className="p-8 space-y-6">
            {/* Password */}

            <div>
              <label
                htmlFor="new_password"
                className="block text-sm font-semibold text-heading mb-2"
              >
                New Password
              </label>

              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                  size={20}
                />

                <PasswordInput
                  {...register("new_password", {
                    required: "Password is required",
                  })}
                />
              </div>
            </div>

            {/* Confirm */}

            <div>
              <label
                htmlFor="new_password_confirm"
                className="block text-sm font-semibold text-heading mb-2"
              >
                Confirm Password
              </label>

              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                  size={20}
                />

                <PasswordInput
                  placeholder="Enter Confirm Password"
                  {...register("new_password_confirm", {
                    required: "Password is required",
                    validate: (value) => {
                      value === password || "Password does not match.";
                    },
                  })}
                />
                <p className="text-xs m-2 text-red-600">
                  {errors.new_password_confirm?.message}
                </p>
              </div>
            </div>

            <button className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold transition">
              Reset Password
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
    </section>
  );
};

export default ResetPasswordForm;
