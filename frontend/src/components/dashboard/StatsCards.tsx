"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, MousePointerClick, Link2 } from "lucide-react";

interface StatsProps {
  stats: {
    totalUrls: number;
    totalClicks: number;
    averageClicks: string;
  };
}

export default function StatsCards({
  stats,
}: StatsProps) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Card className="h-full transition-all hover:-translate-y-0.5 hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-muted-foreground">Total URLs</CardTitle>
          <Link2 className="h-5 w-5 text-blue-500" />
        </CardHeader>

        <CardContent>
          <p className="text-3xl font-bold">
            {stats.totalUrls}
          </p>
        </CardContent>
      </Card>

      <Card className="h-full transition-all hover:-translate-y-0.5 hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-muted-foreground">Total Clicks</CardTitle>
          <MousePointerClick className="h-5 w-5 text-emerald-500" />
        </CardHeader>

        <CardContent>
          <p className="text-3xl font-bold">
            {stats.totalClicks}
          </p>
        </CardContent>
      </Card>

      <Card className="h-full transition-all hover:-translate-y-0.5 hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-muted-foreground">Average Clicks</CardTitle>
          <BarChart3 className="h-5 w-5 text-violet-500" />
        </CardHeader>

        <CardContent>
          <p className="text-3xl font-bold">
            {stats.averageClicks}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
