"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Eye, FileCheck, Loader2 } from "lucide-react";
import { getAllUsersByAdmin } from "@/api/auth";
import { TEACHER_ROLE } from "@/constants/roles";
import Pagination from "@/components/Pagination";
import { VERIFY_TEACHER_ROUTE } from "@/constants/routes";

const VerifyTeacherPage = () => {
  const PAGE_SIZE = 20;

  const [totalCount, setTotalCount] = useState(0);
  const [teachers, setTeachers] = useState([]);

  // Search and filters
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("-created_at");

  const [selectedUser, setSelectedUser] = useState(null);
  const [role, setRole] = useState("");
  const [isActive, setIsActive] = useState(false);

  // Loading
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  // Fetch all Teachers
  useEffect(() => {
    let isMounted = true;

    const fetchTeachers = async () => {
      try {
        setLoading(true);

        const response = await getAllUsersByAdmin({
          page: currentPage,
          search,
          role: TEACHER_ROLE,
          is_active: activeFilter === "all" ? "" : activeFilter,
          ordering: sortOrder,
        });

        if (isMounted) {
          setTeachers(response.data.results);
          setTotalCount(response.data.count);
        }
      } catch (error) {
        console.error("Fetch teachers error:", error);

        if (isMounted) {
          toast.error(
            error.response?.data?.detail || "Failed to fetch teachers.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchTeachers();

    return () => {
      isMounted = false;
    };
  }, [currentPage, search, role, activeFilter, sortOrder]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setRole(user.role);
    setIsActive(user.is_active);
  };

  const handleUpdateUser = async () => {
    try {
      setLoading(true);

      const updatedData = {
        role,
        is_active: isActive,
      };

      const response = await updateUserByAdmin(
        selectedUser.phone_number,
        updatedData,
      );

      // Update the user in your existing table
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? { ...user, ...updatedData } : user,
        ),
      );

      toast.success(response.data?.message || "User updated successfully!");

      setSelectedUser(null);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data?.detail ||
          "Failed to update user.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-heading">
          Teacher Verification
        </h1>
        <p className="mt-1 text-sm text-body">
          Review teacher information and verification documents before approving
          their accounts.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
          {/* Search */}
          <div className="relative sm:col-span-2">
            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by name, email, or phone..."
              className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          {/* Active Status Filter */}
          <select
            value={activeFilter}
            onChange={(e) => {
              setActiveFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-primary"
          >
            <option value="all">All Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          {/* Sorting */}
          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-primary"
          >
            <option value="-created_at">Newest First</option>
            <option value="created_at">Oldest First</option>
            <option value="full_name">Name (A-Z)</option>
            <option value="-full_name">Name (Z-A)</option>
            <option value="-last_login">Last Login (Newest)</option>
            <option value="last_login">Last Login (Oldest)</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-heading">{teachers.length}</span>{" "}
          of <span className="font-semibold text-heading">{totalCount}</span>{" "}
          users
        </p>
      </div>

      {/* Teachers Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-card">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-heading">
            Pending Teacher Requests
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-primary" />
          </div>
        ) : teachers.length === 0 ? (
          <div className="py-12 text-center">
            <FileCheck size={36} className="mx-auto text-muted" />
            <p className="mt-3 font-medium text-heading">
              No pending verification requests
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-background text-muted">
                <tr>
                  <th className="px-5 py-3">Teacher</th>
                  <th className="px-5 py-3">Phone</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {teachers.map((teacher) => (
                  <tr key={teacher.phone_number}>
                    <td className="px-5 py-4 font-medium text-heading">
                      {teacher.full_name}
                    </td>

                    <td className="px-5 py-4 text-body">
                      {teacher.phone_number}
                    </td>

                    <td className="px-5 py-4 text-body">{teacher.email}</td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                          teacher?.is_verified_teacher
                            ? "bg-green-50 text-green-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            teacher?.is_verified_teacher
                              ? "bg-green-600"
                              : "bg-amber-600"
                          }`}
                        />
                        {teacher?.is_verified_teacher
                          ? "Verified"
                          : "Unverified"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`${VERIFY_TEACHER_ROUTE}/${encodeURIComponent(
                          teacher.phone_number,
                        )}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-white hover:bg-primary-hover"
                      >
                        <Eye size={15} />
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {!loading && teachers.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default VerifyTeacherPage;
