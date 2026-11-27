"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  GraduationCap,
  Users,
  BookOpen,
  FileText,
  FolderOpen,
  ClipboardCheck,
  MessageSquare,
  Bell,
  UserRound,
  Settings,
  Menu,
  X,
  Search,
  ChevronDown,
  LogOut,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  CalendarDays,
  Plus,
  Activity,
  BookMarked,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

const statistics = [
  {
    title: "Total Students",
    value: "2,450",
    change: "+12.5%",
    positive: true,
    description: "Compared to last month",
    icon: GraduationCap,
    iconStyle: "bg-blue-50 text-blue-600",
    chart: "students",
  },
  {
    title: "Total Teachers",
    value: "128",
    change: "+8.2%",
    positive: true,
    description: "Compared to last month",
    icon: Users,
    iconStyle: "bg-purple-50 text-purple-600",
    chart: "teachers",
  },
  {
    title: "Total Courses",
    value: "86",
    change: "+4.3%",
    positive: true,
    description: "Compared to last month",
    icon: BookOpen,
    iconStyle: "bg-amber-50 text-amber-600",
    chart: "courses",
  },
  {
    title: "Study Notes",
    value: "1,284",
    change: "+15.8%",
    positive: true,
    description: "Compared to last month",
    icon: FileText,
    iconStyle: "bg-green-50 text-green-600",
    chart: "notes",
  },
];

const enrollmentData = [
  { month: "Jan", value: 35 },
  { month: "Feb", value: 48 },
  { month: "Mar", value: 42 },
  { month: "Apr", value: 65 },
  { month: "May", value: 55 },
  { month: "Jun", value: 78 },
  { month: "Jul", value: 62 },
  { month: "Aug", value: 88 },
  { month: "Sep", value: 72 },
  { month: "Oct", value: 95 },
  { month: "Nov", value: 80 },
  { month: "Dec", value: 100 },
];

const activities = [
  {
    title: "New student registered",
    description: "Alex Johnson joined the platform",
    time: "10 minutes ago",
    icon: GraduationCap,
    style: "bg-blue-50 text-blue-600",
  },
  {
    title: "New course published",
    description: "Introduction to Web Development",
    time: "35 minutes ago",
    icon: BookOpen,
    style: "bg-green-50 text-green-600",
  },
  {
    title: "Teacher registration",
    description: "Sarah Williams requested approval",
    time: "1 hour ago",
    icon: Users,
    style: "bg-purple-50 text-purple-600",
  },
  {
    title: "New study notes uploaded",
    description: "Computer Networks - Chapter 3",
    time: "2 hours ago",
    icon: FileText,
    style: "bg-amber-50 text-amber-600",
  },
];

const popularCourses = [
  {
    name: "Web Development",
    category: "Programming",
    students: 450,
    progress: 85,
    color: "bg-primary",
  },
  {
    name: "Database Management",
    category: "Computer Science",
    students: 320,
    progress: 65,
    color: "bg-blue-500",
  },
  {
    name: "Data Structures",
    category: "Programming",
    students: 280,
    progress: 55,
    color: "bg-amber-500",
  },
];

const pendingApprovals = [
  {
    name: "Michael Anderson",
    type: "Teacher registration",
    date: "Today, 10:30 AM",
    initials: "MA",
    color: "bg-purple-100 text-purple-700",
  },
  {
    name: "Advanced Python Programming",
    type: "Course submission",
    date: "Today, 09:15 AM",
    initials: "PY",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Emily Roberts",
    type: "Teacher registration",
    date: "Yesterday",
    initials: "ER",
    color: "bg-amber-100 text-amber-700",
  },
];

function StatCard({ item }) {
  const Icon = item.icon;

  return (
    <div className="rounded-2xl border border-slate-100 bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.iconStyle}`}
        >
          <Icon size={23} />
        </div>

        <button className="rounded-lg p-1 text-muted hover:bg-background">
          <MoreHorizontal size={21} />
        </button>
      </div>

      <p className="mt-5 text-sm font-medium text-body">{item.title}</p>

      <div className="mt-2 flex flex-wrap items-end justify-between gap-2">
        <h3 className="text-3xl font-bold tracking-tight text-heading">
          {item.value}
        </h3>

        <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
          <TrendingUp size={13} />
          {item.change}
        </span>
      </div>

      <p className="mt-2 text-xs text-muted">{item.description}</p>
    </div>
  );
}

function EnrollmentChart() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-card p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-bold text-heading">Student Enrollment</h3>
          <p className="mt-1 text-xs text-muted">Monthly enrollment overview</p>
        </div>

        <select className="rounded-lg border border-slate-200 bg-card px-3 py-2 text-xs text-body outline-none focus:border-primary">
          <option>2026</option>
          <option>2025</option>
          <option>2024</option>
        </select>
      </div>

      <div className="mt-8 flex items-end justify-between gap-2">
        {enrollmentData.map((item) => (
          <div
            key={item.month}
            className="flex flex-1 flex-col items-center gap-3"
          >
            <div className="flex h-48 w-full items-end justify-center">
              <div
                className={`w-full max-w-8 rounded-t-md transition-all hover:opacity-70 ${
                  item.month === "Dec" ? "bg-primary" : "bg-primary/20"
                }`}
                style={{ height: `${item.value}%` }}
                title={`${item.value}%`}
              />
            </div>
            <span className="text-[10px] font-medium text-muted sm:text-xs">
              {item.month}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-5 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-2 text-xs text-body">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          Current month
        </div>
        <div className="flex items-center gap-2 text-xs text-body">
          <span className="h-2.5 w-2.5 rounded-full bg-primary/20" />
          Previous months
        </div>
      </div>
    </div>
  );
}

function ActivityCard() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-card p-5 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-heading">Recent Activities</h3>
          <p className="mt-1 text-xs text-muted">Latest platform updates</p>
        </div>
        <Link
          href="/admin/notifications"
          className="text-xs font-semibold text-primary hover:underline"
        >
          View all
        </Link>
      </div>

      <div className="space-y-5">
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div key={index} className="flex gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${activity.style}`}
              >
                <Icon size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-heading">
                  {activity.title}
                </p>
                <p className="mt-1 truncate text-xs text-muted">
                  {activity.description}
                </p>
                <p className="mt-2 flex items-center gap-1 text-[11px] text-muted">
                  <Clock size={12} />
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PopularCourses() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-card p-5 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-heading">Popular Courses</h3>
          <p className="mt-1 text-xs text-muted">Top enrolled courses</p>
        </div>
        <Link
          href="/admin/courses"
          className="text-xs font-semibold text-primary hover:underline"
        >
          View all
        </Link>
      </div>

      <div className="space-y-6">
        {popularCourses.map((course) => (
          <div key={course.name}>
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-heading">
                  {course.name}
                </p>
                <p className="mt-1 text-xs text-muted">{course.category}</p>
              </div>
              <p className="shrink-0 text-sm font-bold text-heading">
                {course.students}
                <span className="ml-1 text-xs font-normal text-muted">
                  students
                </span>
              </p>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${course.color}`}
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PendingApprovals() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-card p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-heading">Pending Approvals</h3>
          <p className="mt-1 text-xs text-muted">
            Items requiring your attention
          </p>
        </div>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">
          3 Pending
        </span>
      </div>

      <div className="space-y-4">
        {pendingApprovals.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-3 rounded-xl border border-slate-100 p-3"
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${item.color}`}
            >
              {item.initials}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-heading">
                {item.name}
              </p>
              <p className="mt-1 text-xs text-muted">{item.type}</p>
              <p className="mt-1 text-[11px] text-muted">{item.date}</p>
            </div>

            <AlertCircle size={18} className="shrink-0 text-amber-500" />
          </div>
        ))}
      </div>

      <Link
        href="/admin/teachers"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-primary/20 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
      >
        Review Approvals
        <ArrowUpRight size={16} />
      </Link>
    </div>
  );
}

const AdminDashboard = () => {
    const user = useAuthStore((state) => state.user)
  return (
    <div>
      <main className="mx-auto max-w-[1600px] space-y-6 p-0.5 sm:p-1 lg:p-2">
        {/* Welcome Section */}
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
              Welcome back, {`${user.full_name.split(" ")[0]}` || "Admin"}!
            </h1>
            <p className="mt-2 text-sm text-body">
              Here&apos;s what&apos;s happening with your e-learning platform
              today.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/courses"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-md shadow-primary/20 transition hover:bg-primary-hover"
            >
              <Plus size={17} />
              Add New Course
            </Link>

            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-card px-4 py-3 text-sm font-semibold text-body transition hover:bg-background">
              <CalendarDays size={17} />
              Last 30 Days
              <ChevronDown size={15} />
            </button>
          </div>
        </section>

        {/* Statistics */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-heading">Platform Overview</h2>
            <span className="text-xs text-muted">Updated just now</span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {statistics.map((item) => (
              <StatCard key={item.title} item={item} />
            ))}
          </div>
        </section>

        {/* Chart and Activities */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <EnrollmentChart />
          </div>
          <ActivityCard />
        </section>

        {/* Courses and Approvals */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <PopularCourses />
          <PendingApprovals />
        </section>
      </main>
    </div>
  );
};
export default AdminDashboard;
