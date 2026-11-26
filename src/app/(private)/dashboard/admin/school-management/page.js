// TODO: need to do at last 
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Search, Plus, Pencil, X, Loader2, BookOpen } from "lucide-react";

import { toast } from "react-toastify";
import Pagination from "@/components/Pagination";

import { getSubjectList, createSubject, updateSubject } from "@/api/academics";

import { useInitialData } from "@/hooks/useInitialData";

const PAGE_SIZE = 10;

const initialFormData = {
  name: "",
  faculty: "",
  class_level: "",
  is_active: true,
};

// Get a useful error message from the backend
const getErrorMessage = (error) => {
  const data = error.response?.data;

  if (data?.detail) return data.detail;
  if (data?.message) return data.message;

  // Handle Django field validation errors
  if (data && typeof data === "object") {
    const firstError = Object.values(data)[0];

    if (Array.isArray(firstError)) {
      return firstError[0];
    }

    if (typeof firstError === "string") {
      return firstError;
    }
  }

  return "Something went wrong. Please try again.";
};

const SchoolManagementPage = () => {
  // Subject data
  const [subjects, setSubjects] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  // Fetch faculties and class levels using your custom hook
  const {
    faculties = [],
    classLevels = [],
    loading: dataLoading,
  } = useInitialData();

  // Search and filters
  const [search, setSearch] = useState("");
  const [facultyFilter, setFacultyFilter] = useState("all");
  const [classLevelFilter, setClassLevelFilter] = useState("all");
  const [activeFilter, setActiveFilter] = useState("all");

  // Pagination and loading
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const isEditing = Boolean(selectedSubject);

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialFormData,
  });

  // Common select styling
  const selectClass =
    "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10";

  // Fetch subjects with filters
  useEffect(() => {
    let isMounted = true;

    const fetchSubjects = async () => {
      try {
        setLoading(true);

        const response = await getSubjectList({
          page: currentPage,
          search,
          faculty: facultyFilter === "all" ? "" : facultyFilter,
          class_level: classLevelFilter === "all" ? "" : classLevelFilter,
          is_active: activeFilter === "all" ? "" : activeFilter,
        });

        if (!isMounted) return;

        // Supports paginated and non-paginated responses
        const responseData = response.data;

        const data = Array.isArray(responseData)
          ? responseData
          : responseData.results || [];

        setSubjects(data);
        setTotalCount(responseData.count ?? data.length);
      } catch (error) {
        console.error("Fetch subjects error:", error);

        if (isMounted) {
          toast.error(getErrorMessage(error));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchSubjects();

    return () => {
      isMounted = false;
    };
  }, [currentPage, search, facultyFilter, classLevelFilter, activeFilter, selectedSubject]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  // Open Add Subject modal
  const handleAddSubject = () => {
    setSelectedSubject(null);
    reset(initialFormData);
    setShowModal(true);
  };

  // Open Update Subject modal
  const handleEditSubject = (subject) => {
    setSelectedSubject(subject);

    reset({
      name: subject.name || "",
      faculty: String(subject.faculty),
      class_level: String(subject.class_level),
      is_active: subject.is_active,
    });

    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    if (saving) return;

    setShowModal(false);
    setSelectedSubject(null);
    reset(initialFormData);
  };

  // Create or update subject
  const onSubmit = async (data) => {
    const payload = {
      name: data.name.trim(),
      faculty: Number(data.faculty),
      class_level: Number(data.class_level),
      is_active: Boolean(data.is_active),
    };
    console.log(payload);

    try {
      setSaving(true);

      if (isEditing) {
        await updateSubject(selectedSubject.id, payload);
        toast.success("Subject updated successfully!");
      } else {
        await createSubject(payload);
        toast.success("Subject created successfully!");
      }

      // Close modal and reset form after successful submission
      setShowModal(false);
      setSelectedSubject(null);
      reset(initialFormData);
    } catch (error) {
      console.error("Subject save error:", error);
      toast.error(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-heading">
            Subject Management
          </h1>

          <p className="mt-1 text-sm text-body">
            Manage subjects, faculties, and class levels.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddSubject}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover"
        >
          <Plus size={18} />
          Add Subject
        </button>
      </div>

      {/* Search and Filters */}
      <div className="rounded-2xl border border-slate-200 bg-card p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* Search */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search subjects..."
              className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          {/* Faculty Filter */}
          <select
            value={facultyFilter}
            onChange={(e) => {
              setFacultyFilter(e.target.value);
              setCurrentPage(1);
            }}
            className={selectClass}
          >
            <option value="all">All Faculties</option>

            {faculties.map((faculty) => (
              <option key={faculty.id} value={faculty.id}>
                {faculty.name}
              </option>
            ))}
          </select>

          {/* Class Level Filter */}
          <select
            value={classLevelFilter}
            onChange={(e) => {
              setClassLevelFilter(e.target.value);
              setCurrentPage(1);
            }}
            className={selectClass}
          >
            <option value="all">All Class Levels</option>

            {classLevels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.name}
              </option>
            ))}
          </select>

          {/* Active Status Filter */}
          <select
            value={activeFilter}
            onChange={(e) => {
              setActiveFilter(e.target.value);
              setCurrentPage(1);
            }}
            className={selectClass}
          >
            <option value="all">All Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
      </div>

      {/* Results Information */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-body">
          Showing{" "}
          <span className="font-semibold text-heading">{subjects.length}</span>{" "}
          of <span className="font-semibold text-heading">{totalCount}</span>{" "}
          subjects
        </p>
      </div>

      {/* Subject Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-card shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-heading">Available Subjects</h2>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="animate-spin text-primary" size={30} />

            <p className="mt-3 text-sm text-muted">Loading subjects...</p>
          </div>
        ) : subjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
            <BookOpen size={40} className="text-muted" />

            <h3 className="mt-3 font-semibold text-heading">
              No subjects found
            </h3>

            <p className="mt-1 text-sm text-body">
              Try changing your filters or add a new subject.
            </p>

            <button
              type="button"
              onClick={handleAddSubject}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-hover"
            >
              <Plus size={16} />
              Add Subject
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-187.5 text-left text-sm">
              <thead className="bg-background text-muted">
                <tr>
                  <th className="px-5 py-4 font-medium">Subject</th>

                  <th className="px-5 py-4 font-medium">Faculty</th>

                  <th className="px-5 py-4 font-medium">Class Level</th>

                  <th className="px-5 py-4 font-medium">Status</th>

                  <th className="px-5 py-4 text-right font-medium">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {subjects.map((subject) => (
                  <tr key={subject.id} className="transition hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <span className="font-semibold text-heading">
                        {subject.name}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-body">
                      {subject.faculty_name}
                    </td>

                    <td className="px-5 py-4 text-body">
                      {subject.class_level_name}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                          subject.is_active
                            ? "bg-green-50 text-green-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            subject.is_active ? "bg-green-600" : "bg-amber-600"
                          }`}
                        />

                        {subject.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleEditSubject(subject)}
                        className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-xs font-semibold text-primary transition hover:bg-primary hover:text-white"
                      >
                        <Pencil size={14} />
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {!loading && subjects.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Add / Update Subject Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="my-auto w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-lg font-bold text-heading">
                  {isEditing ? "Update Subject" : "Add New Subject"}
                </h2>

                <p className="mt-1 text-xs text-muted">
                  {isEditing
                    ? "Update the subject information below."
                    : "Enter the details to create a new subject."}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                disabled={saving}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-heading disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* React Hook Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5 p-5 sm:p-6"
            >
              {/* Subject Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-heading">
                  Subject Name <span className="text-error">*</span>
                </label>

                <input
                  type="text"
                  placeholder="e.g. Computer Science"
                  {...register("name", {
                    required: "Subject name is required.",
                    validate: (value) =>
                      value.trim() !== "" || "Subject name cannot be empty.",
                  })}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                />

                {errors.name && (
                  <p className="mt-1 text-xs text-error">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Faculty */}
              <div>
                <label className="mb-2 block text-sm font-medium text-heading">
                  Faculty <span className="text-error">*</span>
                </label>

                <select
                  {...register("faculty", {
                    required: "Please select a faculty.",
                  })}
                  disabled={dataLoading || isEditing}
                  className={`${isEditing ? "cursor-not-allowed" : ""} ${selectClass}`}
                >
                  <option value="">Select Faculty</option>

                  {faculties.map((faculty) => (
                    <option key={faculty.id} value={faculty.id}>
                      {faculty.name}
                    </option>
                  ))}
                </select>

                {errors.faculty && (
                  <p className="mt-1 text-xs text-error">
                    {errors.faculty.message}
                  </p>
                )}
              </div>

              {/* Class Level */}
              <div>
                <label className="mb-2 block text-sm font-medium text-heading">
                  Class Level <span className="text-error">*</span>
                </label>

                <select
                  {...register("class_level", {
                    required: "Please select a class level.",
                  })}
                  disabled={dataLoading || isEditing}
                  className={`${isEditing ? "cursor-not-allowed" : ""} ${selectClass}`}
                >
                  <option value="">Select Class Level</option>

                  {classLevels.map((level) => (
                    <option key={level.id} value={level.id}>
                      {level.name}
                    </option>
                  ))}
                </select>

                {errors.class_level && (
                  <p className="mt-1 text-xs text-error">
                    {errors.class_level.message}
                  </p>
                )}
              </div>

              {/* Active Status */}
              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4">
                <div>
                  <p className="text-sm font-semibold text-heading">
                    Active Status
                  </p>

                  <p className="mt-1 text-xs text-muted">
                    Enable or disable this subject.
                  </p>
                </div>

                <input
                  type="checkbox"
                  {...register("is_active")}
                  className="h-5 w-5 cursor-pointer accent-primary"
                />
              </label>

              {/* Modal Actions */}
              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={saving}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-body transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving || dataLoading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      {isEditing ? <Pencil size={16} /> : <Plus size={17} />}

                      {isEditing ? "Update Subject" : "Create Subject"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolManagementPage;
