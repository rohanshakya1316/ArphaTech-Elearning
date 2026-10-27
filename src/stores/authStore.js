import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const AUTH_STATES = {
  GUEST: "guest",
  SIGNUP_PENDING: "signup_pending",
  OTP_VERIFIED: "otp_verified",
  AUTHENTICATED: "authenticated",
};

const getAuthState = (state) => {
  if (state.accessToken && state.profileCompleted) {
    return AUTH_STATES.AUTHENTICATED;
  }

  if (state.signupToken && state.otpVerified) {
    return AUTH_STATES.OTP_VERIFIED;
  }

  if (state.signupToken) {
    return AUTH_STATES.SIGNUP_PENDING;
  }

  return AUTH_STATES.GUEST;
};

export const useAuthStore = create(
  persist(
    (set) => ({
      // Authentication data
      signupToken: null,
      otpVerified: false,

      accessToken: null,
      refreshToken: null,

      user: null,
      profileCompleted: false,

      // Current authentication state
      authState: AUTH_STATES.GUEST,

      // For handling zustand hydration
      hasHydrated: false,

      setHasHydrated: (value) =>
        set({
          hasHydrated: value,
        }),

      // Set signup information
      setSignupData: ({ signupToken, user }) =>
        set((state) => {
          const newState = {
            ...state,
            signupToken,
            otpVerified: false,
            user,
            accessToken: null,
            refreshToken: null,
            profileCompleted: false,
          };

          return {
            ...newState,
            authState: getAuthState(newState),
          };
        }),

      // Mark OTP as verified
      verifyOTP: () =>
        set((state) => {
          const newState = {
            ...state,
            otpVerified: true,
          };

          return {
            ...newState,
            authState: getAuthState(newState),
          };
        }),

      // Update user information
      setUser: (user) =>
        set((state) => {
          const newState = {
            ...state,
            user,
          };

          return {
            ...newState,
            authState: getAuthState(newState),
          };
        }),

      // Complete registration
      setAuthenticated: ({ accessToken, refreshToken, user }) =>
        set((state) => {
          const newState = {
            ...state,

            accessToken,
            refreshToken,
            user,

            profileCompleted: true,

            signupToken: null,
            otpVerified: false,
          };

          return {
            ...newState,
            authState: getAuthState(newState),
          };
        }),

      // Logout
      logout: () =>
        set({
          signupToken: null,
          otpVerified: false,

          accessToken: null,
          refreshToken: null,

          user: null,
          profileCompleted: false,

          authState: AUTH_STATES.GUEST,
        }),
    }),

    {
      name: "auth-storage",

      storage: createJSONStorage(() => localStorage),

      // Persist only the required state
      partialize: (state) => ({
        signupToken: state.signupToken,
        otpVerified: state.otpVerified,

        accessToken: state.accessToken,
        refreshToken: state.refreshToken,

        user: state.user,
        profileCompleted: state.profileCompleted,

        authState: state.authState,
      }),

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
