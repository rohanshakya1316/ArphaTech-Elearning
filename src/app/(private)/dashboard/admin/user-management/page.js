"use client";

import { getAllUsersByAdmin, updateUserByAdmin } from "@/api/auth";
import Pagination from "@/components/Pagination";
import {
  ADMIN_ROLE,
  EDITOR_ROLE,
  STUDENT_ROLE,
  TEACHER_ROLE,
  USER_ROLES,
} from "@/constants/roles";
import { ADD_EDITOR_ROUTE } from "@/constants/routes";
import { getFormattedDateforDisplay } from "@/helpers/getDateUtilities";
import {
  Eye,
  Loader2,
  Mail,
  Phone,
  Plus,
  Search,
  UserRound,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UserManagementPage = () => {
  const PAGE_SIZE = 20;

  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  // Search and filters
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("-created_at");

  // Update user role and status
  const [selectedUser, setSelectedUser] = useState(null);
  const [role, setRole] = useState("");
  const [isActive, setIsActive] = useState(false);

  // Loading
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  // Fetch Users
  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      try {
        setLoading(true);

        const response = await getAllUsersByAdmin({
          page: currentPage,
          search,
          role: roleFilter === "all" ? "" : roleFilter,
          is_active: activeFilter === "all" ? "" : activeFilter,
          ordering: sortOrder,
        });

        if (isMounted) {
          setUsers(response.data.results);
          setTotalCount(response.data.count);
        }
      } catch (error) {
        console.error("Fetch users error:", error);

        if (isMounted) {
          toast.error(error.response?.data?.detail || "Failed to fetch users.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, [currentPage, search, roleFilter, activeFilter, sortOrder]);

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

  // Role Badge
  const getRoleStyle = (role) => {
    switch (role?.toLowerCase()) {
      case ADMIN_ROLE:
        return "bg-purple-50 text-purple-700";

      case TEACHER_ROLE:
        return "bg-blue-50 text-blue-700";

      case STUDENT_ROLE:
        return "bg-emerald-50 text-emerald-700";

      default:
        return "bg-slate-300 text-slate-600";
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        {/* Page Heading */}
        <div className="mb-7 flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-white">
            <Users size={28} />
          </div>

          <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-heading sm:text-3xl">
                User Management
              </h1>
              <p className="mt-1 text-sm text-slate-500 sm:text-base">
                Manage and monitor all registered users.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href={ADD_EDITOR_ROUTE}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-md shadow-primary/20 transition hover:bg-primary-hover sm:w-auto"
              >
                <Plus size={17} />
                Add Editor
              </Link>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {/* Search */}
            <div className="relative lg:col-span-2">
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

            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-primary"
            >
              {USER_ROLES.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
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
            <span className="font-semibold text-heading">{users.length}</span>{" "}
            of <span className="font-semibold text-heading">{totalCount}</span>{" "}
            users
          </p>
        </div>

        {/* Users Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {loading ? (
            <div className="px-5 py-16 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-primary" />

              <p className="mt-4 text-sm font-medium text-slate-500">
                Loading users...
              </p>
            </div>
          ) : users.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-212.5 text-left">
                {/* Table Header */}
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-4 font-semibold">User</th>

                    <th className="px-6 py-4 font-semibold">Contact</th>

                    <th className="px-6 py-4 font-semibold">Role</th>

                    <th className="px-6 py-4 font-semibold">Joined Date</th>

                    <th className="px-6 py-4 font-semibold">Status</th>

                    <th className="px-6 py-4 text-center font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-slate-100">
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="transition hover:bg-slate-50/80"
                    >
                      {/* User Information */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <UserRound size={20} />
                          </div>

                          <div>
                            <p className="font-semibold text-heading">
                              {user.full_name ||
                                user.username ||
                                "Unknown User"}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              Id: {user.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-6 py-4">
                        <div className="space-y-1.5 text-sm text-slate-600">
                          {user.email && (
                            <div className="flex items-center gap-2">
                              <Mail size={14} className="text-slate-400" />
                              {user.email}
                            </div>
                          )}

                          {user.phone_number && (
                            <div className="flex items-center gap-2">
                              <Phone size={14} className="text-slate-400" />
                              {user.phone_number}
                            </div>
                          )}

                          {!user.email && !user.phone_number && (
                            <span className="text-slate-400">
                              No contact details
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${getRoleStyle(user.role)}`}
                        >
                          {user.role || "Unknown"}
                        </span>
                      </td>

                      {/* Joined Date */}
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {getFormattedDateforDisplay(
                          user.created_at || user.createdAt,
                        ) || "Unknown"}
                      </td>

                      {/* Active Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            user.is_active
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {user.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleViewUser(user)}
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-primary hover:bg-primary/5 hover:text-primary"
                        >
                          <Eye size={16} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-5 py-16 text-center">
              <Users size={40} className="mx-auto text-slate-300" />

              <h3 className="mt-4 text-lg font-semibold text-heading">
                No users found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {users.length === 0
                  ? "There are no registered users yet."
                  : "Try changing your search or filter criteria."}
              </p>
            </div>
          )}
        </div>
      </div>
      {!loading && users.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {/* User Details Modal */}
      {selectedUser && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedUser(null);
            }
          }}
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            {/* Header */}
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-xl font-bold text-heading">User Details</h2>

              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                disabled={loading}
                className="text-slate-400 transition hover:text-primary"
              >
                <X size={21} />
              </button>
            </div>

            {/* User Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2  space-y-4">
              <div>
                <label className="text-xs font-medium text-muted">
                  Full Name
                </label>
                <p className="text-sm font-semibold text-heading">
                  {selectedUser.full_name}
                </p>
              </div>

              <div>
                <label className="text-xs font-medium text-muted">
                  Phone Number
                </label>
                <p className="text-sm text-body">{selectedUser.phone_number}</p>
              </div>

              <div>
                <label className="text-xs font-medium text-muted">Email</label>
                <p className="text-sm text-body">{selectedUser.email}</p>
              </div>

              <div>
                <label className="text-xs font-medium text-muted">
                  Joined Date
                </label>
                <p className="text-sm text-body">
                  {getFormattedDateforDisplay(selectedUser.created_at)}
                </p>
              </div>
            </div>

            {/* Account Management */}
            <div className="mt-2 space-y-2 border-t border-slate-100 pt-3">
              <h3 className="text-sm font-semibold text-heading">
                Account Management
              </h3>

              {/* Role */}
              <div className="space-y-2">
                <label
                  htmlFor="user-role"
                  className="text-sm font-medium text-body"
                >
                  User Role
                </label>

                <select
                  id="user-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm capitalize text-heading outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                >
                  <option value={STUDENT_ROLE}>Student</option>
                  <option value={TEACHER_ROLE}>Instructor</option>
                  <option value={EDITOR_ROLE}>Editor</option>
                </select>
              </div>

              {/* Account Status */}
              <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
                <div>
                  <p className="text-sm font-medium text-heading">
                    Account Status
                  </p>

                  <p className="mt-1 text-xs text-muted">
                    {isActive
                      ? "User can access the platform."
                      : "User access is currently disabled."}
                  </p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={isActive}
                  aria-label="Toggle user account status"
                  disabled={loading}
                  onClick={() => setIsActive((prev) => !prev)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    isActive ? "bg-success" : "bg-slate-300"
                  } disabled:opacity-50`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all ${
                      isActive ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>

              {/* Current Status */}
              <div>
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={handleUpdateUser}
                disabled={
                  loading ||
                  (role === selectedUser.role &&
                    isActive === selectedUser.is_active)
                }
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>

              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                disabled={loading}
                className="w-full rounded-xl border border-slate-200 py-3 text-sm font-semibold text-body transition hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;
