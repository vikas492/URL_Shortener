"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Total URLs</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-3xl font-bold">
            {stats.totalUrls}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Clicks</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-3xl font-bold">
            {stats.totalClicks}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Average Clicks</CardTitle>
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