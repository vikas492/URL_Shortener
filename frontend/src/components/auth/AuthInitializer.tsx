"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { refresh } from "@/services/auth.service";
import { loginSuccess } from "@/redux/authSlice";

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await refresh();

        dispatch(
          loginSuccess({
            accessToken: response.data.accessToken,
            user: response.data.user,
          })
        );
      } catch (error) {
        console.log("No active session");
      }
    };

    initializeAuth();
  }, [dispatch]);

  return null;
}