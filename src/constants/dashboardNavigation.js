// * Navigation item for Dashboard Sidebar as per the roles

import {
  BarChart3,
  Bell,
  BookOpen,
  ClipboardCheck,
  ClipboardList,
  FileText,
  FolderOpen,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  School,
  Settings,
  UserRound,
  Users,
} from "lucide-react";
import { ADMIN_ROLE, STUDENT_ROLE, TEACHER_ROLE } from "./roles";
import {
  ADMIN_DASHBOARD_ROUTE,
  CHAPTER_MANAGEMENT_ROUTE,
  CLASSLEVEL_MANAGEMENT_ROUTE,
  FACULTY_MANAGEMENT_ROUTE,
  PROFILE_ROUTE,
  SCHOOL_MANAGEMENT_ROUTE,
  STUDENT_DASHBOARD_ROUTE,
  SUBJECT_MANAGEMENT_ROUTE,
  TEACHER_DASHBOARD_ROUTE,
  TEACHER_NOTE_ROUTE,
  USER_MANAGEMENT_ROUTE,
  VERIFY_TEACHER_ROUTE,
} from "./routes";
import {
  MdClass,
  MdFlightClass,
  MdOutlinePlayLesson,
  MdSubject,
} from "react-icons/md";
import { GrChapterPrevious } from "react-icons/gr";
import { FaGraduationCap } from "react-icons/fa";

export const roleLabels = {
  [STUDENT_ROLE]: "Student Portal",
  [TEACHER_ROLE]: "Teacher Portal",
  [ADMIN_ROLE]: "Administration",
};

export const dashboardRoutes = [
  STUDENT_DASHBOARD_ROUTE,
  TEACHER_DASHBOARD_ROUTE,
  ADMIN_DASHBOARD_ROUTE,
];

export const dashboardNavigation = {
  [STUDENT_ROLE]: [
    {
      title: "Overview",
      items: [
        {
          label: "Dashboard",
          href: STUDENT_DASHBOARD_ROUTE,
          icon: LayoutDashboard,
        },
        {
          label: "Explore Courses",
          href: "/student/courses",
          icon: BookOpen,
        },
        {
          label: "My Learning",
          href: "/student/my-learning",
          icon: GraduationCap,
        },
        {
          label: "Study Notes",
          href: "/student/notes",
          icon: FileText,
        },
      ],
    },
    {
      title: "Learning",
      items: [
        {
          label: "Assignments",
          href: "/student/assignments",
          icon: ClipboardList,
        },
        {
          label: "Messages",
          href: "/student/messages",
          icon: MessageSquare,
        },
        {
          label: "Notifications",
          href: "/student/notifications",
          icon: Bell,
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          label: "My Profile",
          href: PROFILE_ROUTE,
          icon: UserRound,
        },
        {
          label: "Settings",
          href: "/student/settings",
          icon: Settings,
        },
      ],
    },
  ],

  [TEACHER_ROLE]: [
    {
      title: "Overview",
      items: [
        {
          label: "Dashboard",
          href: TEACHER_DASHBOARD_ROUTE,
          icon: LayoutDashboard,
        },
        {
          label: "My Courses",
          href: "/teacher/courses",
          icon: BookOpen,
        },
        {
          label: "My Students",
          href: "/teacher/students",
          icon: Users,
        },
      ],
    },
    {
      title: "Teaching",
      items: [
        {
          label: "My Notes",
          href: TEACHER_NOTE_ROUTE,
          icon: FileText,
        },
        {
          label: "Assignments",
          href: "/teacher/assignments",
          icon: ClipboardList,
        },
        {
          label: "Messages",
          href: "/teacher/messages",
          icon: MessageSquare,
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          label: "My Profile",
          href: PROFILE_ROUTE,
          icon: UserRound,
        },
        {
          label: "Settings",
          href: "/teacher/settings",
          icon: Settings,
        },
      ],
    },
  ],

  [ADMIN_ROLE]: [
    {
      title: "Overview",
      items: [
        {
          label: "Dashboard",
          href: ADMIN_DASHBOARD_ROUTE,
          icon: LayoutDashboard,
        },
        {
          label: "Analytics",
          href: "/admin/analytics",
          icon: BarChart3,
        },
      ],
    },
    {
      title: "Management",
      items: [
        {
          label: "Users",
          href: USER_MANAGEMENT_ROUTE,
          icon: Users,
        },
        {
          label: "Verify Teacher",
          href: VERIFY_TEACHER_ROUTE,
          icon: UserRound,
        },
        {
          label: "Subjects",
          href: SUBJECT_MANAGEMENT_ROUTE,
          icon: MdSubject,
        },
        {
          label: "Chapters",
          href: CHAPTER_MANAGEMENT_ROUTE,
          icon: MdOutlinePlayLesson,
        },
        {
          label: "Class Levels",
          href: CLASSLEVEL_MANAGEMENT_ROUTE,
          icon: MdFlightClass,
        },
        {
          label: "Faculties",
          href: FACULTY_MANAGEMENT_ROUTE,
          icon: FaGraduationCap,
        },
        {
          label: "Schools",
          href: SCHOOL_MANAGEMENT_ROUTE,
          icon: School,
        },
        {
          label: "Study Notes",
          href: "/admin/notes",
          icon: FileText,
        },
      ],
    },
    {
      title: "Administration",
      items: [
        {
          label: "Assignments",
          href: "/admin/assignments",
          icon: ClipboardCheck,
        },
        {
          label: "Messages",
          href: "/admin/messages",
          icon: MessageSquare,
        },
        {
          label: "Notifications",
          href: "/admin/notifications",
          icon: Bell,
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          label: "My Profile",
          href: PROFILE_ROUTE,
          icon: UserRound,
        },
        {
          label: "Settings",
          href: "/admin/settings",
          icon: Settings,
        },
      ],
    },
  ],
};
