"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import {
  LOGIN_ROUTE,
  STUDENT_DASHBOARD_ROUTE,
  TEACHER_DASHBOARD_ROUTE,
} from "@/constants/routes";
import { STUDENT_ROLE, TEACHER_ROLE } from "@/constants/roles";
import { AUTH_CHANNEL_NAME, AUTH_EVENTS } from "@/helpers/authChannel";

const getDashboardRoute = (user) => {
  if (user?.role === STUDENT_ROLE) {
    return STUDENT_DASHBOARD_ROUTE;
  }

  if (user?.role === TEACHER_ROLE) {
    return TEACHER_DASHBOARD_ROUTE;
  }

  return LOGIN_ROUTE;
};

export default function AuthProvider({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof BroadcastChannel === "undefined") return;

    const channel = new BroadcastChannel(AUTH_CHANNEL_NAME);

    channel.onmessage = async (event) => {
      const { type } = event.data || {};

      switch (type) {
        case AUTH_EVENTS.LOGIN: {
          // Synchronize Zustand with the latest persisted state
          await useAuthStore.persist.rehydrate();

          const { accessToken, profileCompleted, user } =
            useAuthStore.getState();

          if (accessToken && profileCompleted) {
            const dashboardRoute = getDashboardRoute(user);

            router.replace(dashboardRoute);
            router.refresh();
          }

          break;
        }

        case AUTH_EVENTS.LOGOUT: {
          // Clear authentication without calling the logout API again
          useAuthStore.getState().clearAuth();

          router.replace(LOGIN_ROUTE);
          router.refresh();

          break;
        }

        default:
          break;
      }
    };

    return () => {
      channel.close();
    };
  }, [router]);

  return children;
}
