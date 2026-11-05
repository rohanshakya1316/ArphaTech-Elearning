"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Spinner from "@/components/Spinner";
import ComboBox from "@/components/ComboBox";
import ProfileImage from "./_components/ProfileImage";

import { HOME_ROUTE } from "@/constants/routes";
import { STUDENT_ROLE, TEACHER_ROLE } from "@/constants/roles";

import { useAuthStore } from "@/stores/authStore";
import { useInitialData } from "@/hooks/useInitialData";

import {
  getAuthUserDetails,
  updateStudentProfile,
  updateTeacherProfile,
} from "@/api/auth";

// Reusable input styling
const inputStyles = `
  w-full min-w-0
  rounded-xl border border-slate-300
  bg-white px-4 py-3
  text-sm text-body-text
  outline-none
  transition-all duration-200
  placeholder:text-slate-400
  hover:border-slate-400
  focus:border-primary
  focus:ring-4 focus:ring-primary/10
  disabled:cursor-not-allowed
  disabled:bg-slate-100
`;

// Reusable label styling
const labelStyles = `
  mb-2 block
  text-sm font-semibold
  text-heading
`;

// Reusable error styling
const errorStyles = `
  mt-1.5 text-xs font-medium text-error
`;

const ProfilePage = () => {
  // Authenticated user
  const user = useAuthStore((state) => state.user);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  // Component state
  const [loading, setLoading] = useState(false);

  // Initial dropdown data
  const {
    subjects,
    faculties,
    institutes,
    classLevels,
    loading: dataLoading,
    error: dataError,
  } = useInitialData();

  // User role
  const isTeacher = user?.role === TEACHER_ROLE;
  const isStudent = user?.role === STUDENT_ROLE;

  // React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    values: {
      full_name: user?.full_name || "",
      address: user?.profile?.address || "",
      bio: user?.profile?.bio || "",

      alternative_email: user?.profile?.alternative_emails?.[0] || "",

      alternative_phone: user?.profile?.alternative_phones?.[0] || "",

      profileImage: null,

      // Existing backend IDs
      instituteId:
        user?.profile?.school || user?.profile?.school_names?.[0]?.id || "",

      class_level_id: user?.profile?.class_level || "",
      faculty_id: user?.profile?.faculty || "",
      subject_ids: user?.profile?.subjects || [],
    },
  });

  // Handle profile submission
  const submitForm = async (data) => {
    if (loading) return;

    try {
      setLoading(true);

      const formData = new FormData();

      // Common fields
      formData.append("full_name", data.full_name);

      if (data.alternative_email) {
        formData.append("alternative_email", data.alternative_email);
      }

      if (data.alternative_phone) {
        formData.append("alternative_phone", data.alternative_phone);
      }

      if (data.instituteId) {
        formData.append("schools", data.instituteId);
      }

      // Teacher-specific fields
      if (isTeacher) {
        formData.append("bio", data.bio || "");

        if (data.faculty_id) {
          formData.append("faculty", data.faculty_id);
        }

        if (Array.isArray(data.subject_ids)) {
          data.subject_ids.forEach((id) => {
            formData.append("subjects", id);
          });
        }
      }

      // Student-specific fields
      if (isStudent && data.class_level_id) {
        formData.append("class_level", data.class_level_id);
      }

      // Profile image
      if (data.profileImage) {
        formData.append("profile_image", data.profileImage);
      }

      // Select the appropriate API
      const updateProfile = isTeacher
        ? updateTeacherProfile
        : updateStudentProfile;

      await updateProfile(formData);

      // Fetch updated user information
      const response = await getAuthUserDetails();

      // Update Zustand authentication store
      setAuthenticated(response.data);

      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Profile update error:", err);

      toast.error(
        err?.response?.data?.detail ||
          "Failed to update profile. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (dataLoading) {
    return (
      <div
        className="
          flex min-h-[60vh]
          items-center justify-center
          px-4
        "
      >
        <Spinner className="h-10 w-10 text-primary" />
      </div>
    );
  }

  // Initial data error
  if (dataError) {
    return (
      <div
        className="
          flex min-h-[50vh]
          items-center justify-center
          px-4
        "
      >
        <p role="alert" className="text-center text-sm font-medium text-error">
          Failed to load profile form data. Please refresh the page.
        </p>
      </div>
    );
  }

  return (
    <section
      className="
        min-h-screen w-full
        overflow-x-hidden
        bg-slate-50
        py-6
        sm:py-8
        lg:py-10
      "
    >
      <div
        className="
          mx-auto w-full
          max-w-5xl
          min-w-0
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* Page Header */}
        <header className="mb-5 sm:mb-7">
          <h1
            className="
              text-2xl font-bold
              text-heading
              sm:text-3xl
            "
          >
            My Profile
          </h1>

          <p
            className="
              mt-1.5
              max-w-2xl
              text-xs leading-relaxed
              text-muted-text
              sm:text-sm
            "
          >
            Manage your personal information and academic details.
          </p>
        </header>

        {/* Profile Form */}
        <form
          onSubmit={handleSubmit(submitForm)}
          noValidate
          className="
            w-full min-w-0
            rounded-xl
            border border-slate-200
            bg-white
            p-4
            shadow-sm
            sm:rounded-2xl
            sm:p-6
            lg:p-8
          "
        >
          {/* Profile Image */}
          <div className="mb-7 sm:mb-9">
            <ProfileImage
              onImageSelect={(file) =>
                setValue("profileImage", file, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
            />
          </div>

          {/* Form Fields */}
          <div
            className="
              grid w-full min-w-0
              grid-cols-1
              gap-x-6 gap-y-5
              sm:gap-y-6
              md:grid-cols-2
              lg:gap-x-8
            "
          >
            {/* Full Name */}
            <div className="min-w-0">
              <label htmlFor="full_name" className={labelStyles}>
                Full Name
                <span className="ml-1 text-error">*</span>
              </label>

              <input
                id="full_name"
                type="text"
                autoComplete="name"
                placeholder="Enter your full name"
                className={inputStyles}
                {...register("full_name", {
                  required: "Full name is required",
                  validate: (value) =>
                    value.trim().length > 0 || "Full name cannot be empty",
                })}
              />

              {errors.full_name && (
                <p className={errorStyles}>{errors.full_name.message}</p>
              )}
            </div>

            {/* Alternative Email */}
            <div className="min-w-0">
              <label htmlFor="alternative_email" className={labelStyles}>
                Alternative Email
              </label>

              <input
                id="alternative_email"
                type="email"
                autoComplete="email"
                placeholder="alternative@gmail.com"
                className={inputStyles}
                {...register("alternative_email", {
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />

              {errors.alternative_email && (
                <p className={errorStyles}>
                  {errors.alternative_email.message}
                </p>
              )}
            </div>

            {/* Alternative Phone */}
            <div className="min-w-0">
              <label htmlFor="alternative_phone" className={labelStyles}>
                Alternative Phone
              </label>

              <input
                id="alternative_phone"
                type="tel"
                autoComplete="tel"
                placeholder="98XXXXXXXX"
                className={inputStyles}
                {...register("alternative_phone")}
              />
            </div>

            {/* School / College */}
            <div className="min-w-0">
              <label htmlFor="instituteName" className={labelStyles}>
                School or College Name
                <span className="ml-1 text-error">*</span>
              </label>

              <ComboBox
                register={register}
                setValue={setValue}
                control={control}
                options={institutes}
                mode="combo"
                nameField="instituteName"
                idField="instituteId"
                placeholder="Select or type institute"
                validationRules={{
                  required: "School or college is required",
                }}
              />

              {errors.instituteName && (
                <p className={errorStyles}>{errors.instituteName.message}</p>
              )}
            </div>

            {/* Teacher Fields */}
            {isTeacher && (
              <>
                {/* Teacher Bio */}
                <div className="min-w-0 md:col-span-2">
                  <label htmlFor="bio" className={labelStyles}>
                    Teacher&apos;s Bio
                    <span className="ml-1 text-error">*</span>
                  </label>

                  <textarea
                    id="bio"
                    rows={4}
                    placeholder="Tell us about your teaching experience..."
                    className={`
                      ${inputStyles} 
                      min-h-28 resize-none
                    `}
                    {...register("bio", {
                      required: "Teacher bio is required",
                    })}
                  />

                  {errors.bio && (
                    <p className={errorStyles}>{errors.bio.message}</p>
                  )}
                </div>

                {/* Subjects */}
                <div className="min-w-0">
                  <label htmlFor="subject" className={labelStyles}>
                    Subjects
                    <span className="ml-1 text-error">*</span>
                  </label>

                  <ComboBox
                    control={control}
                    setValue={setValue}
                    register={register}
                    options={subjects}
                    mode="dropdown"
                    nameField="subjects"
                    idField="subjectId"
                    placeholder="Select multiple subjects"
                    validationRules={{
                      required: "At least one subject is required",
                    }}
                  />

                  {errors.subjects && (
                    <p className={errorStyles}>{errors.subjects.message}</p>
                  )}
                </div>

                {/* Faculty / Major */}
                <div className="min-w-0">
                  <label htmlFor="faculty_major" className={labelStyles}>
                    Faculty / Major
                    <span className="ml-1 text-error">*</span>
                  </label>

                  <ComboBox
                    control={control}
                    setValue={setValue}
                    register={register}
                    options={faculties}
                    mode="dropdown"
                    nameField="faculty_major"
                    idField="facultyId"
                    placeholder="Select your faculty / major"
                    validationRules={{
                      required: "Faculty is required",
                    }}
                  />

                  {errors.faculty_major && (
                    <p className={errorStyles}>
                      {errors.faculty_major.message}
                    </p>
                  )}
                </div>
              </>
            )}

            {/* Student Fields */}
            {isStudent && (
              <div className="min-w-0">
                <label htmlFor="class_level_name" className={labelStyles}>
                  Class Level
                  <span className="ml-1 text-error">*</span>
                </label>

                <ComboBox
                  register={register}
                  setValue={setValue}
                  control={control}
                  options={classLevels}
                  nameField="class_level_name"
                  idField="class_level"
                  mode="dropdown"
                  placeholder="Select class level"
                  validationRules={{
                    required: "Class level is required",
                  }}
                />

                {errors.class_level_name && (
                  <p className={errorStyles}>
                    {errors.class_level_name.message}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div
            className="
              mt-8 flex w-full
              flex-col-reverse
              gap-3
              border-t border-slate-100
              pt-6
              sm:mt-10
              sm:flex-row
              sm:justify-end
              sm:gap-4
            "
          >
            {/* Cancel */}
            <Link
              href={HOME_ROUTE}
              aria-disabled={loading}
              tabIndex={loading ? -1 : 0}
              className="
                inline-flex w-full
                items-center justify-center
                rounded-lg
                border border-slate-300
                bg-white
                px-6 py-3
                text-sm font-semibold
                text-body-text
                transition-colors
                hover:bg-slate-50
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
                focus-visible:ring-offset-2
                sm:w-auto
              "
            >
              Cancel
            </Link>

            {/* Save Changes */}
            <button
              type="submit"
              disabled={loading}
              className="
                inline-flex w-full
                items-center justify-center
                gap-2
                rounded-lg
                bg-primary
                px-7 py-3
                text-sm font-semibold
                text-white
                shadow-sm
                transition-all duration-200
                hover:bg-primary-hover
                active:scale-[0.98]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
                focus-visible:ring-offset-2
                disabled:cursor-not-allowed
                disabled:opacity-60
                sm:w-auto
              "
            >
              {loading ? (
                <>
                  <Spinner className="h-5 w-5" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProfilePage;
