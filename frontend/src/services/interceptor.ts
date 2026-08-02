import api from "./api";

import { store } from "@/redux/store";
import {
  logout,
  setAccessToken,
} from "@/redux/authSlice";

export function setupInterceptors() {
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;

    // console.log("Interceptor running");
    // console.log("Token:", token);

    if (token) {
      config.headers.set(
        "Authorization",
        `Bearer ${token}`
      );
    }

    // console.log("Headers:", config.headers);

    return config;
  },
  (error) => Promise.reject(error)
);

  api.interceptors.response.use(
    (response) => response,

    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const response = await api.post("/auth/refresh");

          const { accessToken, user } = response.data.data;

          store.dispatch(
            setAccessToken({
              accessToken,
              user,
            })
          );

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          return api(originalRequest);
        } catch {
          store.dispatch(logout());

          window.location.href = "/login";
        }
      }

      return Promise.reject(error);
    }
  );
}