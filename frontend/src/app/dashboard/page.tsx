"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { RootState } from "@/redux/store";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import CreateUrlCard from "@/components/dashboard/CreateUrlCard";
import EmptyState from "@/components/dashboard/EmptyState";
import UrlTable from "@/components/dashboard/UrlTable";
import StatsCards from "@/components/dashboard/StatsCards";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { logout } from "@/services/auth.service";
import { logout as logoutAction } from "@/redux/authSlice";
import {
  getMyUrls,
  getStats,
} from "@/services/url.service";

import { Url } from "@/types/url";

interface Stats {
  totalUrls: number;
  totalClicks: number;
  averageClicks: string;
}

export default function DashboardPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { accessToken, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const [urls, setUrls] = useState<Url[]>([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [stats, setStats] = useState<Stats>({
    totalUrls: 0,
    totalClicks: 0,
    averageClicks: "0",
  });

  const fetchDashboard = async () => {
    try {
      const [urlResponse, statsResponse] =
        await Promise.all([
          getMyUrls(currentPage, 5, search),
          getStats(),
        ]);

      setUrls(urlResponse.data);

      setTotalPages(
        urlResponse.pagination.totalPages
      );

      setStats(statsResponse);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && accessToken) {
      fetchDashboard();
    }
  }, [
    isAuthenticated,
    accessToken,
    currentPage,
    search,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handleLogout = async () => {
    try {
      await logout();

      dispatch(logoutAction());

      toast.success("Logged out successfully");

      router.replace("/login");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ??
          "Logout Failed"
      );
    }
  };

  return (
    <ProtectedRoute>
      <main className="max-w-6xl mx-auto py-10 px-6">
        <DashboardHeader
          onLogout={handleLogout}
        />

        <StatsCards stats={stats} />

        <CreateUrlCard
          onUrlCreated={fetchDashboard}
        />

        <div className="mb-6">
          <Input
            placeholder="Search by Original URL or Short Code..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        {urls.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <UrlTable
              urls={urls}
              onDelete={fetchDashboard}
            />

            <div className="flex justify-between items-center mt-6">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(
                    (prev) => prev - 1
                  )
                }
              >
                Previous
              </Button>

              <span className="font-medium">
                Page {currentPage} of{" "}
                {totalPages}
              </span>

              <Button
                variant="outline"
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    (prev) => prev + 1
                  )
                }
              >
                Next
              </Button>
            </div>
          </>
        )}
      </main>
    </ProtectedRoute>
  );
}