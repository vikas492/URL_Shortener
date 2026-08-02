"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import { Button } from "@/components/ui/button";

import ThemeToggle from "@/components/layout/ThemeToggle";

interface DashboardHeaderProps {
  onLogout: () => void;
}

export default function DashboardHeader({
  onLogout,
}: DashboardHeaderProps) {
  const { user } = useSelector(
    (state: RootState) => state.auth
  );

  return (
    <div className="mb-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Welcome, {user?.name} 👋
        </h1>

        <p className="text-muted-foreground mt-2">
          Manage your shortened URLs
        </p>
      </div>

      <div className="flex w-full items-center gap-3 sm:w-auto">
        <ThemeToggle />

        <Button
          variant="destructive"
          onClick={onLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
