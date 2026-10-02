"use client";
import { getFacultyList, getSchoolList, getSubjectList } from "@/api/academics";
import { completeTeacherSignup } from "@/api/auth";
import ComboBox from "@/components/ComboBox";
import PasswordInput from "@/components/PasswordInput";
import Spinner from "@/components/Spinner";
import { HOME_ROUTE } from "@/constants/routes";
import { ArrowRight, CloudUpload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const RegisterTeacher = () => {
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [verificationDocument, setVerificationDocument] = useState([]);
  const [localVerificationDocument, setLocalVerificationDocument] = useState(
    [],
  );

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          subjectsListResponse,
          schoolsListResponse,
          facultiesListResponse,
        ] = await Promise.all([
          getSubjectList(),
          getSchoolList(),
          getFacultyList(),
        ]);
        setSubjects(subjectsListResponse.data);
        setFaculties(facultiesListResponse.data);
        setInstitutes(schoolsListResponse.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const removeVerificationDocument = (indexToRemove) => {
    // Remove the actual file
    setVerificationDocument((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove),
    );

    // Revoke the preview URL to free browser memory
    setLocalVerificationDocument((prevUrls) => {
      const urlToRemove = prevUrls[indexToRemove];

      if (urlToRemove) {
        URL.revokeObjectURL(urlToRemove);
      }

      return prevUrls.filter((_, index) => index !== indexToRemove);
    });
  };

  const prepareData = (data) => {
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("faculty", data.facultyId);
    formData.append("schools", data.instituteId);
    formData.append("subjects", data.subjectId);
    formData.append("password", data.password);
    formData.append("password_confirm", data.password_confirm);

    // Add uploaded files
    if (verificationDocument?.length > 0) {
      verificationDocument.forEach((file) => {
        formData.append("verification_document", file);
      });
    }

    return formData;
  };

  const submitForm = (data) => {
    setLoading(true);
    const input = prepareData(data);

    completeTeacherSignup(input)
      .then((response) => {
        toast.success("Teacher Sign Up Process Completed!");
        setLocalVerificationDocument([]);
        setVerificationDocument([]);
        reset();
        router.replace(HOME_ROUTE);
      })
      .catch((error) => {
        toast.error(error.response.data);
        console.log(error);
      })
      .finally(() => setLoading(false));

    // See all FormData values
    for (const [key, value] of input.entries()) {
      console.log(key, value);
    }
  };

  return (
    <section className="mx-auto bg-gray-500 rounded-2xl my-4">
      <div className={`w-full max-w-fit bg-white/90 p-8`}>
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl text-primary font-bold">
            Complete your Teacher Profile
          </h2>

          <p className="mt-2 text-body">
            Tell us a bit about yourself so that we could analyze your teaching
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
                htmlFor="instituteName"
                className="block text-sm font-medium text-heading mb-2"
              >
                School or College Name
              </label>

              <ComboBox
                register={register}
                setValue={setValue}
                control={control}
                options={institutes}
                mode="combo"
                nameField="instituteName"
                idField="instituteId"
                placeholder="Select or type your institute"
                validationRules={{ required: "School name is required" }}
              />
              {errors.instituteName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.instituteName.message}
                </p>
              )}
            </div>

            {/* Subject */}
            <div className="md:col-span-2 lg:col-span-3">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-heading mb-2"
              >
                Subject
              </label>

              <ComboBox
                control={control}
                setValue={setValue}
                register={register}
                options={subjects}
                mode="dropdown"
                nameField="subjects"
                idField="subjectId"
                placeholder="Select a subject"
                required={require}
                validationRules={{ required: "Subject is required" }}
              />
              {errors.subjects && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.subjects.message}
                </p>
              )}
            </div>

            {/* Faculty / Major */}
            <div className="md:col-span-2 lg:col-span-3">
              <label
                htmlFor="faculty_major"
                className="block text-sm font-medium text-heading mb-2"
              >
                Faculty / Major
              </label>

              <ComboBox
                control={control}
                setValue={setValue}
                register={register}
                options={faculties}
                mode="dropdown"
                nameField="faculty_major"
                idField="facultyId"
                placeholder="Select or type your faculty / major"
                required={require}
                validationRules={{ required: "Faculty is required" }}
              />
              {errors.faculty_major && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.faculty_major.message}
                </p>
              )}
            </div>

            {/* Document Verification Uploads */}
            <div className="col-span-full">
              <p className="block text-sm font-medium text-heading mb-2">
                Document Verification
              </p>

              <label
                htmlFor="verification_document"
                className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/50 bg-gray-100 py-2 transition-all duration-300 hover:border-primary hover:bg-primary/5"
              >
                <CloudUpload className="h-10 w-10 text-accent transition group-hover:scale-110" />

                <h3 className="mt-2 text-md font-semibold text-heading">
                  Upload Document
                </h3>

                <p className="mt-2 text-body">
                  Click to browse or drag & drop (less than 5MB)
                </p>

                <span className="text-sm text-muted mt-1">
                  PNG • JPG • JPEG • WEBP • PDF
                </span>

                <input
                  id="verification_document"
                  type="file"
                  multiple
                  accept=".png,.jpg,.jpeg,.webp,.pdf"
                  className="hidden"
                  {...register("verification_document", {
                    required: "Verification document is required",
                    onChange: (event) => {
                      const files = Array.from(event.target.files || []);

                      // Store actual File objects
                      setVerificationDocument(files);

                      // Create preview URLs
                      const urls = files.map((file) =>
                        URL.createObjectURL(file),
                      );

                      setLocalVerificationDocument(urls);
                    },
                  })}
                />

                {/* File previews */}
                {localVerificationDocument.length > 0 && (
                  <div className="flex flex-wrap gap-5 mt-6">
                    {localVerificationDocument.map((url, index) => (
                      <div
                        key={url}
                        className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-md"
                      >
                        <Image
                          src={url}
                          alt={`Verification document ${index + 1}`}
                          width={120}
                          height={120}
                          className="w-28 h-28 object-cover"
                        />

                        <button
                          type="button"
                          onClick={() => removeVerificationDocument(index)}
                          className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </label>

              {errors.verification_document && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.verification_document.message}
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

export default RegisterTeacher;
