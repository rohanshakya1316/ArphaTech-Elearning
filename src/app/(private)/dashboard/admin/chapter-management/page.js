"use client";

import {
  BookOpen,
  Loader2,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Pagination from "@/components/Pagination";
import { toast } from "react-toastify";

import {
  createChapter,
  deleteChapter,
  getAllChapters,
  updateChapter,
} from "@/api/academics";
import { getFormattedDateforDisplay } from "@/helpers/getDateUtilities";
import { useInitialData } from "@/hooks/useInitialData";

const PAGE_SIZE = 10;

const initialFormData = {
  subject: "",
  subject_name: "",
  name: "",
  description: "",
  is_active: "",
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

const ChapterManagementPage = () => {
  const { subjects } = useInitialData();

  // Chapter data
  const [chapters, setChapters] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  // Search and filters
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [subjectIdFilter, setSubjectIdFilter] = useState("all");
  const [deleting, setDeleting] = useState(false);

  // Pagination and loading
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedChapters, setSelectedChapters] = useState(null);

  const isEditing = Boolean(selectedChapters);

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialFormData,
  });

  const selectClass =
    "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10";

  // Fetch chapters with filters
  useEffect(() => {
    let isMounted = true;

    const fetchChapters = async () => {
      try {
        setLoading(true);

        const response = await getAllChapters({
          page: currentPage,
          search,
          subject: subjectIdFilter === "all" ? "" : subjectIdFilter,
          is_active: activeFilter === "all" ? "" : activeFilter,
        });

        if (!isMounted) return;

        // Supports paginated and non-paginated responses
        const responseData = response.data;

        const data = Array.isArray(responseData)
          ? responseData
          : responseData.results || [];

        setChapters(data);
        setTotalCount(responseData.count ?? data.length);
      } catch (error) {
        console.error("Fetch chapters error:", error);

        if (isMounted) {
          toast.error(getErrorMessage(error));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchChapters();

    return () => {
      isMounted = false;
    };
  }, [currentPage, search, subjectIdFilter, activeFilter, refresh]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  // Open Add Chapter modal
  const handleAddChapter = () => {
    setSelectedChapters(null);
    reset(initialFormData);
    setShowModal(true);
  };

  const handleDeleteChapter = async (chapter) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${chapter.name}"?`,
    );

    if (!confirmDelete) return;

    try {
      setDeleting(true);

      await deleteChapter(chapter.id);

      toast.success("Chapter deleted successfully!");

      // Refresh the chapter list
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Delete chapter error:", error);
      toast.error(getErrorMessage(error));
    } finally {
      setDeleting(false);
    }
  };

  // Open Update Chapter modal
  const handleEditChapter = (chapter) => {
    setSelectedChapters(chapter);

    reset({
      subject_name: chapter.subject_name || "",
      name: chapter.name || "",
      description: chapter.description || "",
      is_active: chapter.is_active ?? false,
    });

    setShowModal(true);
  };
  // Close modal
  const handleCloseModal = () => {
    if (saving) return;

    setShowModal(false);
    setSelectedChapters(null);
    reset(initialFormData);
  };

  // Create or update chapter
  const onSubmit = async (data) => {
    console.log(subjects);
    let selectedSubject = null;

    if (!isEditing) {
      // Find subject by name
      selectedSubject = subjects.find(
        (subject) =>
          subject.name.toLowerCase().trim() ===
          data.subject_name.toLowerCase().trim(),
      );

      // Check whether subject exists
      if (!selectedSubject) {
        toast.error("Please enter a valid subject.");
        return;
      }
    }

    const payload = {
      ...(!isEditing && { subject: selectedSubject.id }),
      name: data.name.trim(),
      description: data.description,
      is_active: data.is_active,
    };

    try {
      setSaving(true);

      if (isEditing) {
        await updateChapter(selectedChapters.id, payload);
        toast.success("Chapter updated successfully!");
      } else {
        await createChapter(payload);
        toast.success("Chapter created successfully!");
      }

      setShowModal(false);
      setSelectedChapters(null);
      reset(initialFormData);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Chapter save error:", error);
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
            Chapters Management
          </h1>

          <p className="mt-1 text-sm text-body">
            Manage chapters of different subjects in your elearning platform.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddChapter}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover"
        >
          <Plus size={18} />
          Add Chapter
        </button>
      </div>

      {/* Search */}
      <div className="rounded-2xl border border-slate-200 bg-card p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative col-span-2">
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
                placeholder="Search chapters..."
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </div>

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

          {/* Subject ID Filter */}
          <select
            value={subjectIdFilter}
            onChange={(e) => {
              setSubjectIdFilter(e.target.value);
              setCurrentPage(1);
            }}
            className={selectClass}
          >
            <option value="all">All Subjects</option>

            {subjects?.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Information */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-body">
          Showing{" "}
          <span className="font-semibold text-heading">{chapters.length}</span>{" "}
          of <span className="font-semibold text-heading">{totalCount}</span>{" "}
          chapters{" "}
        </p>
      </div>

      {/* Chapters Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-card shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-heading">Available Chapters</h2>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="animate-spin text-primary" size={30} />

            <p className="mt-3 text-sm text-muted">Loading chapters...</p>
          </div>
        ) : chapters.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
            <BookOpen size={40} className="text-muted" />

            <h3 className="mt-3 font-semibold text-heading">
              No chapters found
            </h3>

            <p className="mt-1 text-sm text-body">
              Try changing your filters or add a new chapters.
            </p>

            <button
              type="button"
              onClick={handleAddChapter}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-hover"
            >
              <Plus size={16} />
              Add Chapter
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-187.5 text-left text-sm">
              <thead className="bg-background text-muted">
                <tr>
                  <th className="px-5 py-4 font-medium">Subject</th>
                  <th className="px-5 py-4 font-medium">Chapter Name</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 font-medium">Created At</th>

                  <th className="px-5 py-4 font-medium">Updated At</th>

                  <th className="px-5 py-4 text-center font-medium">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {chapters.map((chapter) => (
                  <tr key={chapter.id} className="transition hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <span className="font-semibold text-heading">
                        {chapter.subject_name}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-body">{chapter.name}</td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                          chapter.is_active
                            ? "bg-green-50 text-green-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            chapter.is_active ? "bg-green-600" : "bg-amber-600"
                          }`}
                        />

                        {chapter.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-body">
                      {getFormattedDateforDisplay(chapter.created_at)}
                    </td>
                    <td className="px-5 py-4 text-body">
                      {getFormattedDateforDisplay(chapter.updated_at)}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditChapter(chapter)}
                          className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-xs font-semibold text-primary transition hover:bg-primary hover:text-white"
                        >
                          <Pencil size={14} />
                          Update
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteChapter(chapter)}
                          disabled={deleting}
                          className="inline-flex items-center gap-2 rounded-lg border border-error/20 bg-error px-3 py-2 text-xs font-semibold text-white transition hover:bg-error/80 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {!loading && chapters.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Add / Update Chapter Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="my-auto w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-lg font-bold text-heading">
                  {isEditing ? "Update Chapter" : "Add New Chapter"}
                </h2>

                <p className="mt-1 text-xs text-muted">
                  {isEditing
                    ? "Update the chapter information below."
                    : "Enter the details to create a new chapter."}
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
                  disabled={isEditing}
                  placeholder="e.g. Computer Science"
                  {...register("subject_name", {
                    required: "Subject name is required.",
                    validate: (value) =>
                      value.trim() !== "" || "Subject name cannot be empty.",
                  })}
                  className={`${isEditing ? "cursor-not-allowed text-gray-500" : ""} w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10`}
                />

                {errors.subject_name && (
                  <p className="mt-1 text-xs text-error">
                    {errors.subject_name.message}
                  </p>
                )}
              </div>

              {/* Chapter Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-heading">
                  Chapter Name <span className="text-error">*</span>
                </label>

                <input
                  type="text"
                  placeholder="e.g. Computer Science"
                  {...register("name", {
                    required: "Chapter name is required.",
                    validate: (value) =>
                      value.trim() !== "" || "Chapter name cannot be empty.",
                  })}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                />

                {errors.name && (
                  <p className="mt-1 text-xs text-error">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Chapter Description */}
              <div>
                <label className="mb-2 block text-sm font-medium text-heading">
                  Chapter Description <span className="text-error">*</span>
                </label>

                <input
                  type="text"
                  placeholder="e.g. Computer Science"
                  {...register("description", {
                    required: "Chapter description is required.",
                    validate: (value) =>
                      value.trim() !== "" ||
                      "Chapter description cannot be empty.",
                  })}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                />

                {errors.description && (
                  <p className="mt-1 text-xs text-error">
                    {errors.description.message}
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
                  disabled={saving}
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

                      {isEditing ? "Update Chapter" : "Create Chapter"}
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

export default ChapterManagementPage;
