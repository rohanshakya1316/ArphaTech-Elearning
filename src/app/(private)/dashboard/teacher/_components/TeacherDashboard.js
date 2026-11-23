"use client";

import getTeacherPoints from "@/api/points";
import { TEACHER_NOTE_UPLOAD_ROUTE } from "@/constants/routes";
import { getCurrentDate } from "@/helpers/getDateUtilities";
import { useAuthStore } from "@/stores/authStore";
import {
  ArrowUpRight,
  Bell,
  BookOpen,
  CalendarDays,
  ChevronRight,
  CircleAlert,
  ClipboardList,
  FileText,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const stats = [
  {
    label: "Notes",
    value: "08",
    description: "2 published this month",
    icon: BookOpen,
  },
  {
    label: "Pending Reviews",
    value: "12",
    description: "Assignments to evaluate",
    icon: ClipboardList,
    alert: true,
  },
  {
    label: "Published Notes",
    value: "248",
    description: "+18 students this month",
    icon: Users,
    trend: "+12%",
  },
  {
    label: "Rejected Notes",
    value: "4",
    description: "Review and Resubmit",
    icon: Star,
  },
];

const courses = [
  {
    id: 1,
    title: "Modern JavaScript Development",
    category: "Web Development",
    students: 86,
    lessons: 32,
    progress: 78,
    status: "Published",
    initials: "JS",
    color: "bg-amber-100 text-amber-800",
  },
  {
    id: 2,
    title: "React.js Fundamentals",
    category: "Frontend Development",
    students: 64,
    lessons: 24,
    progress: 62,
    status: "Published",
    initials: "RE",
    color: "bg-sky-100 text-sky-800",
  },
  {
    id: 3,
    title: "Database Management with SQL",
    category: "Database",
    students: 48,
    lessons: 18,
    progress: 45,
    status: "Published",
    initials: "DB",
    color: "bg-emerald-100 text-emerald-800",
  },
  {
    id: 4,
    title: "Introduction to Node.js",
    category: "Backend Development",
    students: 0,
    lessons: 16,
    progress: 0,
    status: "Draft",
    initials: "ND",
    color: "bg-violet-100 text-violet-800",
  },
];

const activities = [
  {
    name: "Aarav Sharma",
    action: "submitted an assignment",
    course: "React.js Fundamentals",
    time: "10 minutes ago",
    initials: "AS",
    color: "bg-sky-100 text-sky-700",
  },
  {
    name: "Priya Karki",
    action: "enrolled in",
    course: "Modern JavaScript Development",
    time: "1 hour ago",
    initials: "PK",
    color: "bg-rose-100 text-rose-700",
  },
  {
    name: "Suman Thapa",
    action: "completed a lesson in",
    course: "Database Management with SQL",
    time: "3 hours ago",
    initials: "ST",
    color: "bg-emerald-100 text-emerald-700",
  },
];

const upcomingTasks = [
  {
    title: "Review React assignments",
    detail: "8 submissions waiting",
    date: "Today",
    type: "urgent",
  },
  {
    title: "Prepare JavaScript lecture",
    detail: "Module 5 · Async JavaScript",
    date: "Tomorrow",
    type: "normal",
  },
  {
    title: "Live class with students",
    detail: "React.js Fundamentals",
    date: "Nov 20, 11:00 AM",
    type: "normal",
  },
];

function StatCard({ stat }) {
  const Icon = stat.icon;

  return (
    <div className="rounded-xl border border-slate-200 bg-card p-5 transition-shadow hover:shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-body">{stat.label}</p>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-heading">
            {stat.value}
          </h3>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon size={20} strokeWidth={1.8} />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-1.5 text-xs">
        {stat.trend && (
          <span className="font-semibold text-success">{stat.trend}</span>
        )}
        {stat.alert && <CircleAlert size={14} className="text-amber-500" />}
        <span className="text-muted">{stat.description}</span>
      </div>
    </div>
  );
}

function CourseTable({ search }) {
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-162.5 text-left">
        <thead>
          <tr className="border-y border-slate-100 bg-background/70 text-xs font-semibold text-muted">
            <th className="px-5 py-3">Title</th>
            <th className="px-4 py-3">File Name</th>
            <th className="px-4 py-3">Subject</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-4 py-3">Class Level</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {filteredCourses.map((course) => (
            <tr
              key={course.id}
              className="transition-colors hover:bg-background/60"
            >
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${course.color}`}
                  >
                    {course.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-heading">
                      {course.title}
                    </p>
                    <p className="mt-1 text-xs text-muted">{course.category}</p>
                  </div>
                </div>
              </td>

              <td className="px-4 py-4 text-sm text-body">{course.students}</td>

              <td className="px-4 py-4 text-sm text-body">{course.lessons}</td>

              <td className="px-5 py-4">
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    course.status === "Published"
                      ? "bg-green-50 text-success"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {course.status}
                </span>
              </td>

              <td className="px-4 py-4">
                <button
                  type="button"
                  aria-label={`More options for ${course.title}`}
                  className="rounded-lg p-1.5 text-muted hover:bg-slate-100 hover:text-heading"
                >
                  <MoreHorizontal size={19} />
                </button>
              </td>
            </tr>
          ))}

          {filteredCourses.length === 0 && (
            <tr>
              <td
                colSpan="6"
                className="px-5 py-10 text-center text-sm text-muted"
              >
                No courses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function RecentActivity() {
  return (
    <div className="divide-y divide-slate-100">
      {activities.map((activity, index) => (
        <div key={index} className="flex gap-3 py-4 first:pt-1 last:pb-1">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${activity.color}`}
          >
            {activity.initials}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm leading-5 text-heading">
              <span className="font-semibold">{activity.name}</span>{" "}
              <span className="text-body">{activity.action}</span>{" "}
              <span className="font-medium text-primary">
                {activity.course}
              </span>
            </p>
            <p className="mt-1 text-xs text-muted">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function UpcomingTasks() {
  return (
    <div className="space-y-4">
      {upcomingTasks.map((task, index) => (
        <div key={index} className="flex gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-background text-primary">
            {task.type === "urgent" ? (
              <ClipboardList size={18} />
            ) : index === 1 ? (
              <FileText size={18} />
            ) : (
              <CalendarDays size={18} />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-heading">{task.title}</p>
            <p className="mt-1 text-xs text-muted">{task.detail}</p>
            <p
              className={`mt-2 text-xs font-medium ${
                task.type === "urgent" ? "text-error" : "text-body"
              }`}
            >
              {task.date}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

const TeacherDashboard = () => {
  const user = useAuthStore((state) => state.user);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");

  const currentDate = getCurrentDate();

  useEffect(() => {
    const fetchPoint = async () => {
      try {
        const response = await getTeacherPoints();
        console.log("Teacher Points:", response.data?.total_points);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPoint();
  }, []);

  return (
    <div className="bg-background text-heading">
      {/* Main area */}
      <main>
        {/* Dashboard content */}
        <div className="mx-auto max-w-[1600px] px-4">
          {/* Welcome section */}
          <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-medium text-muted">
                {" "}
                {`${currentDate}`}
              </p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-heading sm:text-3xl">
                Welcome back, {`${user.full_name.split(" ")[0]}!`}
              </h1>
              <p className="mt-2 text-sm text-body">
                Here&apos;s what&apos;s happening with your courses today.
              </p>
            </div>
          </section>

          {/* Stats */}
          <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </section>

          {/* Main dashboard grid */}
          <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            {/* Courses */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-card xl:col-span-2">
              <div className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-base font-bold text-heading">
                    Recent Notes
                  </h2>
                  <p className="mt-1 text-xs text-muted">
                    Manage and monitor your published notes.
                  </p>
                </div>

                <Link
                  href="/teacher/courses"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover"
                >
                  View all <ChevronRight size={16} />
                </Link>
              </div>

              <CourseTable search={search} />
            </div>

            {/* Activity */}
            <div className="rounded-xl border border-slate-200 bg-card p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-heading">
                    J vaye ni garaula
                  </h2>
                  <p className="mt-1 text-xs text-muted">
                    Latest student interactions
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Activity options"
                  className="rounded-lg p-1.5 text-muted hover:bg-background"
                >
                  <MoreHorizontal size={19} />
                </button>
              </div>

              <RecentActivity />

              <Link
                href="/teacher/activity"
                className="mt-5 flex items-center justify-center gap-1 border-t border-slate-100 pt-4 text-xs font-semibold text-primary hover:text-primary-hover"
              >
                View all activity <ArrowUpRight size={14} />
              </Link>
            </div>
          </section>

          {/* Bottom section */}
          <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Tasks */}
            <div className="rounded-xl border border-slate-200 bg-card p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-heading">
                    Published Blogs
                  </h2>
                  <p className="mt-1 text-xs text-muted">
                    Things that need your attention
                  </p>
                </div>
                <Link
                  href="/teacher/assignments"
                  className="text-xs font-semibold text-primary hover:text-primary-hover"
                >
                  View all
                </Link>
              </div>

              <UpcomingTasks />
            </div>

            {/* Quick actions */}
            <div className="rounded-xl border border-slate-200 bg-card p-5">
              <div className="mb-5">
                <h2 className="text-base font-bold text-heading">
                  Quick Actions
                </h2>
                <p className="mt-1 text-xs text-muted">
                  Common tasks for your teaching workflow
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/teacher/courses/create"
                  className="group rounded-lg border border-slate-200 p-4 transition-colors hover:border-primary/40 hover:bg-primary/3"
                >
                  <BookOpen
                    size={21}
                    className="text-primary transition-transform group-hover:scale-110"
                  />
                  <p className="mt-3 text-sm font-semibold text-heading">
                    Create Course
                  </p>
                  <p className="mt-1 text-xs text-muted">Add a new course</p>
                </Link>

                <Link
                  href="/teacher/assignments"
                  className="group rounded-lg border border-slate-200 p-4 transition-colors hover:border-primary/40 hover:bg-primary/3"
                >
                  <ClipboardList
                    size={21}
                    className="text-primary transition-transform group-hover:scale-110"
                  />
                  <p className="mt-3 text-sm font-semibold text-heading">
                    Review Work
                  </p>
                  <p className="mt-1 text-xs text-muted">Check submissions</p>
                </Link>

                <Link
                  href="/teacher/students"
                  className="group rounded-lg border border-slate-200 p-4 transition-colors hover:border-primary/40 hover:bg-primary/3"
                >
                  <Users
                    size={21}
                    className="text-primary transition-transform group-hover:scale-110"
                  />
                  <p className="mt-3 text-sm font-semibold text-heading">
                    Students
                  </p>
                  <p className="mt-1 text-xs text-muted">Manage enrollments</p>
                </Link>

                <Link
                  href="/teacher/messages"
                  className="group rounded-lg border border-slate-200 p-4 transition-colors hover:border-primary/40 hover:bg-primary/3"
                >
                  <MessageSquare
                    size={21}
                    className="text-primary transition-transform group-hover:scale-110"
                  />
                  <p className="mt-3 text-sm font-semibold text-heading">
                    Messages
                  </p>
                  <p className="mt-1 text-xs text-muted">Contact students</p>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
