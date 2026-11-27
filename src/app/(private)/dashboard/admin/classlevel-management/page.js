"use client";

import { BookOpen, Loader2, Pencil, Plus, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Pagination from "@/components/Pagination";
import { toast } from "react-toastify";

import {
  createClassLevel,
  getClassLevelList,
  updateClassLevel,
} from "@/api/academics";
import { getFormattedDateforDisplay } from "@/helpers/getDateUtilities";

const PAGE_SIZE = 10;

const initialFormData = {
  name: "",
  level_type: "",
  level_type_display: "",
  display_order: "",
  created_at: "",
  updated_at: "",
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

const ClasslevelManagementPage = () => {
  // Class Level data
  const [classlevels, setClasslevels] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  // Search and filters
  const [search, setSearch] = useState("");
  const [levelTypeFilter, setLevelTypeFilter] = useState("all");

  // Pagination and loading
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedClasslevel, setSelectedClasslevel] = useState(null);

  const isEditing = Boolean(selectedClasslevel);

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

  // Fetch classlevels with filters
  useEffect(() => {
    let isMounted = true;

    const fetchClasslevels = async () => {
      try {
        setLoading(true);

        const response = await getClassLevelList({
          page: currentPage,
          search,
          levelType: levelTypeFilter === "all" ? "" : levelTypeFilter,
        });

        if (!isMounted) return;

        // Supports paginated and non-paginated responses
        const responseData = response.data;

        const data = Array.isArray(responseData)
          ? responseData
          : responseData.results || [];

        setClasslevels(data);
        setTotalCount(responseData.count ?? data.length);
      } catch (error) {
        console.error("Fetch classlevels error:", error);

        if (isMounted) {
          toast.error(getErrorMessage(error));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchClasslevels();

    return () => {
      isMounted = false;
    };
  }, [currentPage, search, levelTypeFilter, refresh]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  // Open Add Class Level modal
  const handleAddClasslevel = () => {
    setSelectedClasslevel(null);
    reset(initialFormData);
    setShowModal(true);
  };

  // Open Update Class Level modal
  const handleEditClasslevel = (classlevel) => {
    setSelectedClasslevel(classlevel);

    reset({
      name: classlevel.name || "",
      level_type: classlevel.level_type || "",
      created_at: classlevel.created_at
        ? getFormattedDateforDisplay(classlevel.created_at)
        : "",
      updated_at: classlevel.updated_at
        ? getFormattedDateforDisplay(classlevel.updated_at)
        : "",
    });

    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    if (saving) return;

    setShowModal(false);
    setSelectedClasslevel(null);
    reset(initialFormData);
  };

  // Create or update classlevel
  const onSubmit = async (data) => {
    const payload = {
      name: data.name.trim(),
    };

    try {
      setSaving(true);

      if (isEditing) {
        await updateClassLevel(selectedClasslevel.id, payload);
        toast.success("Class Level updated successfully!");
      } else {
        await createClassLevel(payload);
        toast.success("Class Level created successfully!");
      }

      // Close modal and reset form after successful submission
      setShowModal(false);
      setSelectedClasslevel(null);
      reset(initialFormData);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Class Level save error:", error);
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
            Class Level Management
          </h1>

          <p className="mt-1 text-sm text-body">
            Manage class levels in your elearning platform.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddClasslevel}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover"
        >
          <Plus size={18} />
          Add Class Level
        </button>
      </div>

      {/* Search */}
      <div className="rounded-2xl border border-slate-200 bg-card p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
              placeholder="Search class levels..."
              className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          {/* Level Type Filter */}
          <select
            value={levelTypeFilter}
            onChange={(e) => {
              setLevelTypeFilter(e.target.value);
              setCurrentPage(1);
            }}
            className={selectClass}
          >
            <option value="all">All Level Types</option>
            <option value="+2">+2</option>
            <option value="SEE">SEE</option>
            <option value="bachelor">Bachelor</option>
          </select>
        </div>
      </div>

      {/* Results Information */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-body">
          Showing{" "}
          <span className="font-semibold text-heading">
            {classlevels.length}
          </span>{" "}
          of <span className="font-semibold text-heading">{totalCount}</span>{" "}
          class levels{" "}
        </p>
      </div>

      {/* Class Level Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-card shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-heading">Available Class Levels</h2>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="animate-spin text-primary" size={30} />

            <p className="mt-3 text-sm text-muted">Loading class levels...</p>
          </div>
        ) : classlevels.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
            <BookOpen size={40} className="text-muted" />

            <h3 className="mt-3 font-semibold text-heading">
              No classlevels found
            </h3>

            <p className="mt-1 text-sm text-body">
              Try changing your filters or add a new class level.
            </p>

            <button
              type="button"
              onClick={handleAddClasslevel}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-hover"
            >
              <Plus size={16} />
              Add Class Level
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-187.5 text-left text-sm">
              <thead className="bg-background text-muted">
                <tr>
                  <th className="px-5 py-4 font-medium">Class Level</th>

                  <th className="px-5 py-4 font-medium">Level Type</th>

                  <th className="px-5 py-4 font-medium">Created At</th>

                  <th className="px-5 py-4 font-medium">Updated At</th>

                  <th className="px-5 py-4 text-right font-medium">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {classlevels.map((level) => (
                  <tr key={level.id} className="transition hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <span className="font-semibold text-heading">
                        {level.name}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-body">
                      {level.level_type_display}
                    </td>

                    <td className="px-5 py-4 text-body">
                      {getFormattedDateforDisplay(level.created_at)}
                    </td>
                    <td className="px-5 py-4 text-body">
                      {getFormattedDateforDisplay(level.updated_at)}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleEditClasslevel(level)}
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
      {!loading && classlevels.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Add / Update Class Level Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="my-auto w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-lg font-bold text-heading">
                  {isEditing ? "Update Class Level" : "Add New Class Level"}
                </h2>

                <p className="mt-1 text-xs text-muted">
                  {isEditing
                    ? "Update the class level information below."
                    : "Enter the details to create a new class level."}
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
              {/* Class Level Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-heading">
                  Class Level Name <span className="text-error">*</span>
                </label>

                <input
                  type="text"
                  placeholder="e.g. Computer Science"
                  {...register("name", {
                    required: "Classlevel name is required.",
                    validate: (value) =>
                      value.trim() !== "" || "Classlevel name cannot be empty.",
                  })}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                />

                {errors.name && (
                  <p className="mt-1 text-xs text-error">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Class Level Type */}
              <div>
                <label className="mb-2 block text-sm font-medium text-heading">
                  Class Level Type<span className="text-error">*</span>
                </label>

                <select
                  {...register("level_type", {
                    required: "Please select a level type.",
                  })}
                  disabled={isEditing}
                  placeholder="e.g. Bachelor, +2, SEE"
                  className={`${isEditing ? "cursor-not-allowed" : ""} ${selectClass}`}
                >
                  <option value="">Select Class Level</option>
                  <option value="+2">+2</option>
                  <option value="SEE">SEE</option>
                  <option value="bachelor">Bachelor</option>
                  ))
                </select>

                {errors.level_type && (
                  <p className="mt-1 text-xs text-error">
                    {errors.level_type.message}
                  </p>
                )}
              </div>

              {isEditing && (
                <div>
                  {/* Created At */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-heading">
                      Created At <span className="text-error">*</span>
                    </label>

                    <input
                      type="text"
                      disabled
                      placeholder="Class Level Created At"
                      {...register("created_at")}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-gray-500 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                  </div>

                  {/* Updated At */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-heading">
                      Updated At <span className="text-error">*</span>
                    </label>

                    <input
                      type="text"
                      disabled
                      placeholder="Class Level Updated At"
                      {...register("updated_at")}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-gray-500 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                </div>
              )}

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

                      {isEditing ? "Update Class Level" : "Create Class Level"}
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

export default ClasslevelManagementPage;
