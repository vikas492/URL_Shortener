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
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome, {user?.name} 👋
        </h1>

        <p className="text-muted-foreground mt-2">
          Manage your shortened URLs
        </p>
      </div>

      <div className="flex items-center gap-3">
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