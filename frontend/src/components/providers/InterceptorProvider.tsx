"use client";

import { useEffect } from "react";
import { setupInterceptors } from "@/services/interceptor";

export default function InterceptorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    setupInterceptors();
  }, []);

  return <>{children}</>;
}