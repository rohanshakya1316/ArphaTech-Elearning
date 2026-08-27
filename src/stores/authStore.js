import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      loginUser: ({ user }) => {
        set({
          user,
          isAuthenticated: true,
        });
        localStorage.setItem("authToken", user.access);
        localStorage.setItem("refreshToken", user.refresh);
      },

      registerUser: ({ user }) => {
        set({
          user,
          isAuthenticated: true,
        });
        localStorage.setItem("authToken", user.access);
        localStorage.setItem("refreshToken", user.refresh);
      },

      setUser: ({ user }) => {
        set({ user });
      },

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    { name: "elearning:auth-storage" },
  ),
);

export default useAuthStore;