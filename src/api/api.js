import config from "@/config/config";
import { AUTH_EVENTS, broadcastAuthEvent } from "@/helpers/authChannel";
import { useAuthStore } from "@/stores/authStore";
import axios from "axios";

const api = axios.create({
  baseURL: config.apiUrl,
});

// Separate instance for refreshing tokens
const refreshApi = axios.create({
  baseURL: config.apiUrl,
});

// Attach access token
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Automatically refresh expired access tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = useAuthStore.getState().refreshToken;

      if (!refreshToken) {
        return Promise.reject(error);
      }

      try {
        const response = await refreshApi.post(
          "/api/v1/auth/token/refresh/",
          { refresh: refreshToken }
        );

        const { access, refresh } = response.data;

        // Update Zustand
        useAuthStore.setState({
          accessToken: access,
          ...(refresh ? { refreshToken: refresh } : {}),
        });

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${access}`;

        return api(originalRequest);

      } catch (refreshError) {
        // Refresh failed: clear authentication locally and in every other tab
        // so no tab keeps showing a session that no longer exists.
        useAuthStore.getState().clearAuth();

        broadcastAuthEvent(AUTH_EVENTS.LOGOUT);

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
