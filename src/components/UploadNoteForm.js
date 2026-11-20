"use client";

import { useForm, useWatch } from "react-hook-form";
import {
  FileText,
  UploadCloud,
  X,
  BookOpen,
  Loader2,
  FileCheck2,
} from "lucide-react";

import BackButton from "./BackButton";
import ComboBox from "./ComboBox";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const FieldError = ({ error }) =>
  error ? (
    <p className="mt-1.5 text-xs font-medium text-error">{error.message}</p>
  ) : null;

const UploadNoteForm = ({ onSubmit, onCancel, subjects, classLevels }) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      pdf_file: null,
      subject: "",
      class_level: "",
      chapter: "",
    },
    mode: "onSubmit",
  });

  // Watch individual fields using useWatch
  const selectedFile = useWatch({
    control,
    name: "pdf_file",
  })?.[0];

  const description =
    useWatch({
      control,
      name: "description",
    }) || "";

  // PDF validation
  const pdfRegistration = register("pdf_file", {
    required: "Please upload a PDF document.",
    validate: {
      fileType: (files) =>
        !files?.[0] ||
        files[0].type === "application/pdf" ||
        files[0].name.toLowerCase().endsWith(".pdf") ||
        "Only PDF files are allowed.",

      fileSize: (files) =>
        !files?.[0] ||
        files[0].size <= MAX_FILE_SIZE ||
        "File size must not exceed 5 MB.",
    },
  });

  // Form submission
  const submitHandler = async (data) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title.trim());
      formData.append("description", data.description.trim());
      formData.append("pdf_file", data.pdf_file[0]);
      formData.append("subject", data.subjectId);
      formData.append("class_level", data.class_level);
      formData.append("chapter", data.chapter?.trim() || "");

      const success = await onSubmit(formData);

      // Reset only when upload succeeds
      if (success) {
        reset();
      }
    } catch (error) {
      console.error("Note submission failed:", error);
    }
  };

  // Show validation errors
  const handleInvalidSubmit = (formErrors) => {
    console.log("Form validation errors:", formErrors);
  };

  // Remove selected PDF
  const removeFile = () => {
    setValue("pdf_file", null, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // Cancel form
  const handleCancel = () => {
    if (isSubmitting) return;

    reset();
    onCancel?.();
  };

  // Styling
  const inputClass = (error) =>
    `w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm
    text-heading outline-none transition-all duration-200
    placeholder:text-muted
    focus:border-primary focus:ring-4 focus:ring-primary/10
    ${error ? "border-error" : "border-slate-200 hover:border-slate-300"}`;

  const labelClass = "mb-1.5 block text-sm font-medium text-heading";

  const formatFileSize = (bytes) => {
    return bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(1)} KB`
      : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler, handleInvalidSubmit)}
      noValidate
      className="mx-auto w-full max-w-4xl"
    >
      <div className="m-4 overflow-hidden rounded-xl border border-slate-200 bg-card shadow-sm">
        {/* Header */}
        <div className="border-b border-slate-200 px-5 py-5 sm:px-7">
          <div className="sm:flex sm:items-center sm:gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BookOpen size={22} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-heading">
                Add New Notes
              </h2>

              <p className="mt-1 text-sm text-body">
                Upload study materials and organize them for your students.
              </p>
            </div>

            <div className="hidden md:ml-auto md:block">
              <BackButton />
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6 p-5 sm:p-7">
          {/* Title and Description */}
          <div className="space-y-5">
            {/* Title */}
            <div>
              <label htmlFor="title" className={labelClass}>
                Note Title <span className="text-error">*</span>
              </label>

              <input
                id="title"
                type="text"
                placeholder="e.g. Introduction to Database Management"
                className={inputClass(errors.title)}
                {...register("title", {
                  required: "Note title is required.",
                  minLength: {
                    value: 5,
                    message: "Title must contain at least 5 characters.",
                  },
                  maxLength: {
                    value: 150,
                    message: "Title cannot exceed 150 characters.",
                  },
                  validate: (value) =>
                    value.trim().length > 0 ||
                    "Title cannot contain only spaces.",
                })}
              />

              <FieldError error={errors.title} />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className={labelClass}>
                Description <span className="text-error">*</span>
              </label>

              <textarea
                id="description"
                rows={4}
                placeholder="Provide the necessary information for the editor..."
                className={`${inputClass(errors.description)} min-h-24 resize-none`}
                {...register("description", {
                  required: "Description is required.",
                  validate: {
                    notEmpty: (value) =>
                      value.trim().length > 0 ||
                      "Description cannot contain only spaces.",

                    minLength: (value) =>
                      value.trim().length >= 10 ||
                      "Description must contain at least 10 characters.",

                    maxLength: (value) =>
                      value.trim().length <= 100 ||
                      "Description cannot exceed 100 characters.",
                  },
                })}
              />

              <div className="mt-1.5 flex items-center justify-between gap-2">
                <FieldError error={errors.description} />

                <span
                  className={`ml-auto text-xs ${
                    description.length > 100 ? "text-error" : "text-muted"
                  }`}
                >
                  {description.length}/100
                </span>
              </div>
            </div>
          </div>

          {/* Subject and Class Level */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Subject */}
            <div>
              <label htmlFor="subject" className={labelClass}>
                Subject <span className="text-error">*</span>
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
                validationRules={{
                  required: "Subject is required.",
                }}
              />

              <FieldError error={errors.subject} />
            </div>

            {/* Class Level */}
            <div>
              <label htmlFor="class_level" className={labelClass}>
                Class Level <span className="text-error">*</span>
              </label>

              <ComboBox
                control={control}
                setValue={setValue}
                register={register}
                options={classLevels}
                nameField="class_level_name"
                idField="class_level"
                mode="dropdown"
                placeholder="Your Class Level"
                validationRules={{
                  required: "Class Level is required.",
                }}
              />

              <FieldError error={errors.class_level} />
            </div>

            {/* Optional Chapter Field */}
            {/*
            <div className="sm:col-span-2">
              <label htmlFor="chapter" className={labelClass}>
                Chapter
              </label>

              <input
                id="chapter"
                type="text"
                placeholder="e.g. Chapter 01 - Introduction to DBMS"
                className={inputClass(errors.chapter)}
                {...register("chapter", {
                  maxLength: {
                    value: 150,
                    message: "Chapter cannot exceed 150 characters.",
                  },
                })}
              />

              <FieldError error={errors.chapter} />
            </div>
            */}
          </div>

          {/* PDF Upload */}
          <section>
            <div className="my-4">
              <h3 className="text-sm font-semibold text-heading">
                Upload Study Material
                <span className="text-error"> *</span>
              </h3>

              <p className="mt-1 text-xs text-muted">
                Upload the notes in PDF format.
              </p>
            </div>

            <label
              htmlFor="pdf_file"
              className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors ${
                errors.pdf_file
                  ? "border-error bg-error/5"
                  : "border-slate-300 bg-background hover:border-primary hover:bg-primary/3"
              }`}
            >
              <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <UploadCloud size={24} />
              </div>

              <p className="text-sm font-medium text-heading">
                Click to upload your PDF
              </p>

              <p className="mt-1 text-xs text-body">
                PDF format only · Maximum file size 5 MB
              </p>

              <input
                id="pdf_file"
                type="file"
                accept=".pdf,application/pdf"
                className="sr-only"
                {...pdfRegistration}
              />
            </label>

            <FieldError error={errors.pdf_file} />

            {/* Selected File */}
            {selectedFile && (
              <div className="mt-4 flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileCheck2 size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-heading">
                    {selectedFile.name}
                  </p>

                  <p className="mt-0.5 text-xs text-muted">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={removeFile}
                  disabled={isSubmitting}
                  className="flex size-8 shrink-0 items-center justify-center rounded-lg text-body transition-colors hover:bg-error/10 hover:text-error disabled:opacity-50"
                  aria-label="Remove selected PDF"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </section>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50/70 px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-body transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <FileText size={17} />
                Add Notes
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default UploadNoteForm;
