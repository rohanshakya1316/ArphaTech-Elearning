"use client";

import { getSchoolDetails } from "@/api/academics";
import { completeStudentSignup } from "@/api/auth";
import ComboBox from "@/components/ComboBox";
import PasswordInput from "@/components/PasswordInput";
import Spinner from "@/components/Spinner";
import { STUDENT_DASHBOARD_ROUTE } from "@/constants/routes";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";

const StudentForm = ({ institutes, faculties, classLevels }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const selectedSchoolFromForm = useWatch({ control, name: "schoolId" });
  const isExistingSchool = !!selectedSchoolFromForm;

  useEffect(() => {
    const getSelectedSchoolDetails = async () => {
      if (!selectedSchoolFromForm) {
        setValue("address", "");
        setValue("school_type", "");
        return;
      }
      if (!institutes) return;
      try {
        const response = await getSchoolDetails(selectedSchoolFromForm);
        console.log(response);
        setValue("address", response.data.address, { shouldValidate: true });
        setValue("school_type", response.data.school_type, {
          shouldValidate: true,
        });
      } catch (error) {
        console.log("Failed to fetch the school details", error);
      }
    };
    getSelectedSchoolDetails();
  }, [selectedSchoolFromForm, setValue, institutes]);

  const prepareData = (data) => {
    const formData = new FormData();

    formData.append("school", data.schoolId);
    formData.append("school_name", data.school_name);
    formData.append("school_type", data.school_type.toLowerCase());
    formData.append("class_level", data.class_level);
    formData.append("faculty", data.faculty);
    formData.append("address", data.address);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("password_confirm", data.password_confirm);

    return formData;
  };

  const submitForm = (data) => {
    setLoading(true);
    const selectedInstitute = institutes.find(
      (institute) => institute.id === data.schoolId,
    );

    const payload = {
      ...data,
      school_name: selectedInstitute?.name || "",
    };
    const input = prepareData(payload);

    completeStudentSignup(input)
      .then((response) => {
        toast.success("Student Sign Up Process Completed!");
        reset();
        router.replace(STUDENT_DASHBOARD_ROUTE);
      })
      .catch((error) => {
        toast.error(error.response.data);
        console.log(error);
      })
      .finally(() => setLoading(false));
  };
  return (
    <section className="mx-auto bg-gray-500 rounded-2xl my-4">
      <div className={`w-full max-w-fit bg-white/90 p-8`}>
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl text-primary font-bold">
            Complete your Student Profile
          </h2>

          <p className="mt-2 text-body">
            Tell us a bit about yourself so that we could analyze your learning
            journey
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
                htmlFor="school_name"
                className="block text-sm font-medium text-heading mb-2"
              >
                School or College Name
              </label>

              <ComboBox
                register={register}
                setValue={setValue}
                control={control}
                options={institutes.map((institute) => ({
                  ...institute,
                  displayName: `${institute.name} - ${institute.address}`,
                }))}
                nameField="school_name"
                labelKey="displayName"
                idField="schoolId"
                mode="combo"
                placeholder="Select or type your institute"
                validationRules={{ required: "School name is required" }}
              />
              {errors.school_name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.school_name.message}
                </p>
              )}
            </div>

            {/* Class Level */}
            <div className="md:col-span-2 lg:col-span-3">
              <label
                htmlFor="class_level_name"
                className="block text-sm font-medium text-heading mb-2"
              >
                Class Level
              </label>

              <ComboBox
                register={register}
                setValue={setValue}
                control={control}
                options={classLevels}
                nameField="class_level_name"
                idField="class_level"
                mode="dropdown"
                placeholder="Your Class Level"
                validationRules={{ required: "Class Level is required" }}
              />
              {errors.class_level_name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.class_level_name.message}
                </p>
              )}
            </div>

            {/* Faculty / Major */}
            <div className="md:col-span-2 lg:col-span-3">
              <label
                htmlFor="facultyName"
                className="block text-sm font-medium text-heading mb-2"
              >
                Faculty / Major
              </label>

              <ComboBox
                control={control}
                setValue={setValue}
                register={register}
                options={faculties}
                nameField="facultyName"
                idField="faculty"
                placeholder="Select or type your faculty / major"
                required={require}
                validationRules={{ required: "Faculty is required" }}
              />
              {errors.facultyName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.facultyName.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="md:col-span-2 lg:col-span-3">
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
                className={`w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition-all duration-300 ${
                  isExistingSchool
                    ? "cursor-not-allowed bg-slate-100 text-slate-400"
                    : "bg-white"
                }
            focus:border-primary focus:ring-4 focus:ring-primary/20`}
                required
                disabled={isExistingSchool}
                autoComplete="off"
                {...register("address")}
              />
            </div>

            {/* School Type */}
            <div
              className={`md:col-span-2 lg:col-span-3 ${
                isExistingSchool ? "cursor-not-allowed" : ""
              }`}
            >
              <label
                htmlFor="school_type"
                className="mb-2 block text-sm font-medium text-heading"
              >
                School Type
              </label>

              <div
                className={
                  isExistingSchool
                    ? "pointer-events-none cursor-not-allowed bg-slate-100 text-slate-400"
                    : ""
                }
              >
                <ComboBox
                  register={register}
                  setValue={setValue}
                  control={control}
                  options={[
                    { id: 1, name: "School" },
                    { id: 2, name: "College" },
                    { id: 3, name: "University" },
                  ]}
                  nameField="school_type"
                  idField="schoolTypeId"
                  mode="dropdown"
                  placeholder="Select category"
                  validationRules={{ required: "School type is required" }}
                />
              </div>

              {errors.school_type && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.school_type.message}
                </p>
              )}
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
  );
};

export default StudentForm;
