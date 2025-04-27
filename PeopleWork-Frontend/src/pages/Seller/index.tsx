// Main Dashboard Component
// src/pages/SellerDashboard.tsx

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, User as UserIcon, Settings, LogOut } from "lucide-react";
import { Appointment, Review, User } from "../../types/user";
import DashboardStats from "@/components/molecules/DashboardStats";
import AppointmentList from "@/components/molecules/AppointmentList";
import VerificationStatus from "@/components/molecules/VerificationStatus";
import ReviewsList from "@/components/molecules/ReviewList";

const SellerDashboard: React.FC = () => {
  const [seller, setSeller] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch data from your API
    const fetchData = async () => {
      try {
        // Mock data - replace with actual API calls
        const mockSeller: User = {
          id: "1",
          name: "Jane Smith",
          email: "jane.smith@example.com",
          isVerified: false,
          profileImage: "/api/placeholder/150/150",
          createdAt: new Date("2023-01-15"),
        };

        const mockAppointments: Appointment[] = [
          {
            id: "1",
            customerId: "101",
            customerName: "John Doe",
            date: new Date("2025-05-01T10:00:00"),
            status: "pending",
            service: "Home Cleaning",
            notes: "Need deep cleaning for 2-bedroom apartment",
          },
          {
            id: "2",
            customerId: "102",
            customerName: "Sarah Johnson",
            date: new Date("2025-04-28T14:30:00"),
            status: "confirmed",
            service: "Window Cleaning",
            notes: "All windows in first floor",
          },
          {
            id: "3",
            customerId: "103",
            customerName: "Michael Brown",
            date: new Date("2025-04-25T09:00:00"),
            status: "completed",
            service: "Carpet Cleaning",
            notes: "Living room and hallway",
          },
          {
            id: "4",
            customerId: "104",
            customerName: "Emily Wilson",
            date: new Date("2025-04-22T16:00:00"),
            status: "cancelled",
            service: "Furniture Assembly",
            notes: "New desk and bookshelf",
          },
        ];

        const mockReviews: Review[] = [
          {
            id: "1",
            appointmentId: "3",
            customerId: "103",
            customerName: "Michael Brown",
            rating: 5,
            comment: "Excellent service! My carpets look brand new.",
            date: new Date("2025-04-25T17:30:00"),
          },
          {
            id: "2",
            appointmentId: "5",
            customerId: "105",
            customerName: "Lisa Garcia",
            rating: 4,
            comment: "Very professional and thorough.",
            date: new Date("2025-04-20T14:00:00"),
          },
        ];

        setSeller(mockSeller);
        setAppointments(mockAppointments);
        setReviews(mockReviews);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAppointmentAction = (
    appointmentId: string,
    action: "accept" | "reject" | "complete"
  ) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) => {
        if (appointment.id === appointmentId) {
          if (action === "accept")
            return { ...appointment, status: "confirmed" };
          if (action === "reject")
            return { ...appointment, status: "cancelled" };
          if (action === "complete")
            return { ...appointment, status: "completed" };
        }
        return appointment;
      })
    );
  };

  const handleVerificationSubmit = () => {
    // In a real app, send verification data to your API
    // For now, just update the local state
    if (seller) {
      setSeller({ ...seller, isVerified: true });
    }
  };

  const handleLogout = () => {
    // In a real app, handle logout logic here
    console.log("User logged out");
    // Navigate to login page or clear authentication tokens
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Loading dashboard...</p>
      </div>
    );
  }

  // Count stats
  const pendingAppointments = appointments.filter(
    (a) => a.status === "pending"
  ).length;
  const confirmedAppointments = appointments.filter(
    (a) => a.status === "confirmed"
  ).length;
  const completedAppointments = appointments.filter(
    (a) => a.status === "completed"
  ).length;
  const averageRating = reviews.length
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  return (
    <div className="container mx-auto p-4 py-6 md:py-8">
      {/* Enhanced Profile Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            {seller?.profileImage ? (
              <AvatarImage src={seller.profileImage} alt={seller.name} />
            ) : (
              <AvatarFallback>
                {seller?.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{seller?.name}</h1>
            <div className="flex items-center mt-1 gap-2">
              <p className="text-gray-500">{seller?.email}</p>
              {seller?.isVerified ? (
                <Badge className="bg-green-600">Verified</Badge>
              ) : (
                <Badge variant="outline">Not Verified</Badge>
              )}
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              Account <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem className="cursor-pointer">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-red-600"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Dashboard Stats */}
      <DashboardStats
        pendingCount={pendingAppointments}
        confirmedCount={confirmedAppointments}
        completedCount={completedAppointments}
        averageRating={averageRating}
      />

      {/* Main Dashboard Content */}
      <Tabs defaultValue="appointments" className="mt-6">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Manage Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <AppointmentList
                appointments={appointments}
                onAction={handleAppointmentAction}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <VerificationStatus
                isVerified={seller?.isVerified || false}
                onSubmit={handleVerificationSubmit}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <ReviewsList reviews={reviews} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SellerDashboard;
