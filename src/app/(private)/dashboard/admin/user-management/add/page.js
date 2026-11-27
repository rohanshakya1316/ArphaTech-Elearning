"use client";

import { createUserByAdmin } from "@/api/auth";
import PasswordInput from "@/components/PasswordInput";
import { emailRegex, passwordRegex, phoneRegex } from "@/constants/regex";
import { ArrowRight, UserPlus, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddEditorPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      full_name: "",
      phone_number: "",
      email: "",
      role: "editor",
      password: "",
      password_confirm: "",
    },
    mode: "onBlur",
  });

  // Prepare form data
  const prepareData = (data) => {
    const formData = new FormData();

    formData.append("full_name", data.full_name.trim());
    formData.append("phone_number", data.phone_number.trim());
    formData.append("email", data.email.trim().toLowerCase());
    formData.append("role", data.role);
    formData.append("password", data.password);
    formData.append("password_confirm", data.password_confirm);

    return formData;
  };

  // Submit form
  const submitForm = async (data) => {
    try {
      const response = await createUserByAdmin(prepareData(data));

      toast.success(response.data?.message || "Editor created successfully!");

      reset();
    } catch (error) {
      const errorData = error.response?.data;

      // Handle backend field validation errors
      if (errorData && typeof errorData === "object") {
        Object.entries(errorData).forEach(([field, messages]) => {
          if (field in data) {
            setError(field, {
              type: "server",
              message: Array.isArray(messages) ? messages[0] : messages,
            });
          }
        });
      }

      toast.error(
        errorData?.message ||
          errorData?.detail ||
          "Unable to create editor. Please try again.",
      );

      console.error("Editor creation error:", error);
    }
  };

  // Reusable input styling
  const inputClass = (field) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm text-heading outline-none transition-all
    placeholder:text-muted
    focus:border-primary focus:ring-4 focus:ring-primary/10
    ${
      errors[field]
        ? "border-error focus:border-error focus:ring-error/10"
        : "border-slate-200"
    }`;

  return (
    <section className="w-full space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <UserPlus size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-heading sm:text-3xl">
                Create New Editor
              </h1>
              <p className="mt-1 text-sm text-body">
                Add a new editor to your e-learning platform.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start rounded-full bg-success/10 px-4 py-2 text-xs font-medium text-success sm:self-center">
          <ShieldCheck size={16} />
          Admin Access
        </div>
      </div>

      {/* Form Card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-card shadow-sm">
        {/* Card Header */}
        <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-5 sm:px-8">
          <h2 className="text-lg font-semibold text-heading">
            Editor Information
          </h2>
          <p className="mt-1 text-sm text-body">
            Enter the required details to create an editor account.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(submitForm)}
          noValidate
          className="space-y-7 p-5 sm:p-8"
        >
          {/* Personal Information */}
          <div className="space-y-5">
            <div>
              <h3 className="text-base font-semibold text-heading">
                Personal Details
              </h3>
              <p className="mt-1 text-xs text-muted">
                Provide the editor&apos;s basic contact information.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Full Name */}
              <div className="space-y-2">
                <label
                  htmlFor="full_name"
                  className="text-sm font-medium text-heading"
                >
                  Full Name <span className="text-error">*</span>
                </label>

                <input
                  id="full_name"
                  type="text"
                  placeholder="Enter full name"
                  autoComplete="name"
                  className={inputClass("full_name")}
                  aria-invalid={!!errors.full_name}
                  {...register("full_name", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must contain at least 2 characters",
                    },
                    maxLength: {
                      value: 100,
                      message: "Name cannot exceed 100 characters",
                    },
                    validate: (value) =>
                      value.trim().length >= 2 || "Please enter a valid name",
                  })}
                />

                {errors.full_name && (
                  <p className="text-xs text-error">
                    {errors.full_name.message}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label
                  htmlFor="phone_number"
                  className="text-sm font-medium text-heading"
                >
                  Phone Number <span className="text-error">*</span>
                </label>

                <input
                  id="phone_number"
                  type="tel"
                  placeholder="98XXXXXXXX"
                  autoComplete="tel"
                  maxLength={10}
                  className={inputClass("phone_number")}
                  aria-invalid={!!errors.phone_number}
                  {...register("phone_number", {
                    required: "Phone number is required",
                    pattern: {
                      value: phoneRegex,
                      message: "Enter a valid Nepali phone number",
                    },
                  })}
                />

                {errors.phone_number && (
                  <p className="text-xs text-error">
                    {errors.phone_number.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-heading"
                >
                  Email Address <span className="text-error">*</span>
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="editor@example.com"
                  autoComplete="email"
                  className={inputClass("email")}
                  aria-invalid={!!errors.email}
                  {...register("email", {
                    required: "Email address is required",
                    pattern: {
                      value: emailRegex,
                      message: "Enter a valid email address",
                    },
                  })}
                />

                {errors.email && (
                  <p className="text-xs text-error">{errors.email.message}</p>
                )}
              </div>

              {/* Role */}
              <div className="space-y-2">
                <label
                  htmlFor="role"
                  className="text-sm font-medium text-heading"
                >
                  Assigned Role
                </label>

                <input
                  id="role"
                  type="text"
                  value="Editor"
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-medium text-body"
                />

                <p className="text-xs text-muted">
                  This account will be created with editor permissions.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100" />

          {/* Account Security */}
          <div className="space-y-5">
            <div>
              <h3 className="text-base font-semibold text-heading">
                Account Security
              </h3>
              <p className="mt-1 text-xs text-muted">
                Create a secure password for the editor account.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-heading"
                >
                  Password <span className="text-error">*</span>
                </label>

                <PasswordInput
                  id="password"
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: passwordRegex,
                      message:
                        "Use at least 8 characters with uppercase, lowercase, number and special character",
                    },
                  })}
                />

                {errors.password && (
                  <p className="text-xs text-error">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password_confirm"
                  className="text-sm font-medium text-heading"
                >
                  Confirm Password <span className="text-error">*</span>
                </label>

                <PasswordInput
                  id="password_confirm"
                  placeholder="Confirm your password"
                  {...register("password_confirm", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match",
                  })}
                />

                {errors.password_confirm && (
                  <p className="text-xs text-error">
                    {errors.password_confirm.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Form Footer */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted">
              Fields marked with <span className="text-error">*</span> are
              required.
            </p>

            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => reset()}
                disabled={isSubmitting}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-body transition hover:bg-slate-50 disabled:opacity-50"
              >
                Reset Form
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-3 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Creating Editor...
                  </>
                ) : (
                  <>
                    Create Editor
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddEditorPage;
