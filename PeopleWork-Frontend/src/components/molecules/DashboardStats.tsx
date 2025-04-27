import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarClock, CheckCircle, AlertCircle, Star } from "lucide-react";

interface DashboardStatsProps {
  pendingCount: number;
  confirmedCount: number;
  completedCount: number;
  averageRating: number;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  pendingCount,
  confirmedCount,
  completedCount,
  averageRating,
}) => {
  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-3xl font-bold">{pendingCount}</p>
            </div>
            <div className="p-2 bg-yellow-100 rounded-full">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Upcoming</p>
              <p className="text-3xl font-bold">{confirmedCount}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <CalendarClock className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-3xl font-bold">{completedCount}</p>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Average Rating
              </p>
              <div className="flex items-center">
                <p className="text-3xl font-bold mr-1">
                  {formatRating(averageRating)}
                </p>
                <Star
                  className="h-5 w-5 text-yellow-500 mt-1"
                  fill="currentColor"
                />
              </div>
            </div>
            <div className="p-2 bg-purple-100 rounded-full">
              <Star className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
