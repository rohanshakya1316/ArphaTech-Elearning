"use client";
import { sendOTP } from "@/api/auth";
import logo from "@/assets/images/logo.jpeg";
import nepalFlag from "@/assets/images/nepal-flag.svg";
import Spinner from "@/components/Spinner";
import VerifyOTP from "@/components/VerifyOTP";
import { RESUME_SIGNUP, SIGNUP } from "@/constants/purposes";
import { phoneRegex } from "@/constants/regex";
import { STUDENT_ROLE, TEACHER_ROLE } from "@/constants/roles";
import {
  LOGIN_ROUTE,
  REGISTER_STUDENT_ROUTE,
  REGISTER_TEACHER_ROUTE,
} from "@/constants/routes";
import { setCookie } from "@/helpers/cookie";
import { useAuthStore } from "@/stores/authStore";
import { GraduationCap, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [purpose, setPurpose] = useState(SIGNUP);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onBlur", defaultValues: { role: "" } });

  const setSignupData = useAuthStore((state) => state.setSignupData);
  const verifyOTPState = useAuthStore((state) => state.verifyOTP);

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

  // watch the role field
  const selectedRole = useWatch({ control, name: "role" });
  const pathname = usePathname();

  const submitForm = (data) => {
    setLoading(true);
    setPhoneNumber(data?.phone_number);

    // const otpSlug = "verify-otp";
    // window.history.pushState(null, "", `${pathname}/${otpSlug}`);

    sendOTP({
      phone_number: data.phone_number,
      role: data.role,
    })
      .then((response) => {
        setOpen(true);
        setPurpose(response.data?.action);
        if (response.data?.action === SIGNUP) {
          toast.success(response.data?.message);
        }
      })
      .catch((error) => {
        const errorData = error.response?.data;
        console.log(errorData);
        toast.error("Something went wrong!");
      })
      .finally(() => setLoading(false));
  };

  const handleRoleSelect = (role) => {
    setValue("role", role, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const verifyData = {
    purpose: purpose,
    phone_number: phoneNumber,
  };

  const handleOnSuccessOTP = (data) => {
    console.log("From Sign Up:", data);
    setSignupData({ signupToken: data.signup_token, user: data.user });
    setCookie("signUpToken", data?.signup_token, 5);
    verifyOTPState();

    if (data?.action === RESUME_SIGNUP || data?.action === SIGNUP) {
      toast.success(data?.message);
      if (data?.user?.role === STUDENT_ROLE) {
        router.replace(REGISTER_STUDENT_ROUTE);
      } else if (data?.user?.role === TEACHER_ROLE) {
        router.replace(REGISTER_TEACHER_ROUTE);
      } else {
        throw new Error(
          `Role mismatch or missing. Role is: ${data?.user?.role}`,
        );
      }
    }
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary/20"
          onClick={() => setOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <VerifyOTP verifyData={verifyData} onSuccess={handleOnSuccessOTP} />
          </div>
        </div>
      )}

      <section className="mx-auto bg-gray-500 rounded-2xl my-4">
        <div className={`w-full max-w-md bg-white/90 p-8`}>
          {/* Header */}
          <div className="flex flex-col items-center justify-center text-center">
            <Image
              src={logo}
              alt="Logo"
              priority
              className="h-20 w-24 mix-blend-multiply"
            />
            <h2 className="text-3xl font-bold text-heading">Sign Up</h2>

            <p className="mt-2 text-body">
              Sign up to continue with your Learning Journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(submitForm)} className="mt-8 space-y-5">
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
                  <span className="text-sm text-gray-700 mr-3 pt-0.5">
                    +977
                  </span>
                </div>

                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter your phone number"
                  maxLength={10}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/20"
                  required
                  autoComplete="off"
                  {...register("phone_number", {
                    required: "Phone Number is required",
                    minLength: {
                      value: 10,
                      message: "Valid Nepali Phone Number is of 10 digits",
                    },
                    maxLength: {
                      value: 10,
                      message: "Valid Nepali Phone Number is of 10 digits",
                    },
                    pattern: {
                      value: phoneRegex,
                      message: "Phone Number must start with 98 or 97 or 96",
                    },
                  })}
                />
              </div>
            </div>
            {Object.keys(errors).length > 0 && (
              <div
                className="error-summary-box"
                style={{
                  color: "red",
                  border: "1px solid red",
                  padding: "10px",
                  marginBottom: "15px",
                }}
              >
                <h4>Please fix the following errors:</h4>
                <ul>
                  {Object.values(errors).map((error, index) => (
                    <li className="ml-8 list-disc" key={index}>
                      {error.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* User Roles */}
            <div>
              <input type="hidden" {...register("role")} />
              <h3 className="text-xl font-semibold text-center mb-4">
                Select your role as a user
              </h3>
              <div className="grid grid-cols-2 gap-4 items-stretch justify-center">
                <div
                  onClick={() => handleRoleSelect(STUDENT_ROLE)}
                  className={`mx-auto w-36 md:w-44 overflow-hidden cursor-pointer rounded-2xl bg-white shadow-lg hover:shadow-2xl border ${selectedRole == STUDENT_ROLE ? `bg-blue-100!` : `border-transparent bg-white`}`}
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
                  onClick={() => handleRoleSelect(TEACHER_ROLE)}
                  className={`mx-auto w-36 md:w-44 overflow-hidden cursor-pointer rounded-2xl bg-white shadow-lg hover:shadow-2xl border ${selectedRole == TEACHER_ROLE ? `bg-blue-100!` : `border-transparent bg-white`}`}
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
                <input type="checkbox" className="accent-primary" required />I
                accept Terms & Conditions
              </label>
            </div>

            {/* Send OTP Button */}
            <button
              type="submit"
              className="relative w-full rounded-xl bg-primary py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-primary-hover hover:shadow-xl hover:-translate-y-1 active:translate-y-0 disabled:opacity-80"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
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

            {/* Login */}
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
    </>
  );
};

export default SignupPage;
