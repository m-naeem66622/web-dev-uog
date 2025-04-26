import { useState, useEffect } from "react";
import { Calendar, Clock, Edit, Trash2, Star, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

// Types
type AppointmentStatus = "upcoming" | "completed" | "cancelled";

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface Appointment {
  id: string;
  service: string;
  provider: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  review?: Review;
}

// Mock data - would be fetched from API in a real application
const mockAppointments: Appointment[] = [
  {
    id: "1",
    service: "Haircut",
    provider: "John Doe",
    date: "2025-04-28",
    time: "10:00 AM",
    status: "upcoming",
  },
  {
    id: "2",
    service: "Massage Therapy",
    provider: "Jane Smith",
    date: "2025-04-22",
    time: "2:30 PM",
    status: "completed",
    review: {
      id: "r1",
      rating: 4,
      comment: "Great service, very professional",
      createdAt: "2025-04-23",
    },
  },
  {
    id: "3",
    service: "Dental Checkup",
    provider: "Dr. Williams",
    date: "2025-04-10",
    time: "9:15 AM",
    status: "completed",
  },
  {
    id: "4",
    service: "Eye Examination",
    provider: "Dr. Johnson",
    date: "2025-03-15",
    time: "11:30 AM",
    status: "cancelled",
  },
];

// Star Rating Component
const StarRating = ({
  rating,
  onChange,
  editable = false,
}: {
  rating: number;
  onChange?: (rating: number) => void;
  editable?: boolean;
}) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => editable && onChange && onChange(star)}
          className={`${editable ? "cursor-pointer" : "cursor-default"}`}
          disabled={!editable}
        >
          <Star
            className={`h-6 w-6 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

// Review Form Component
const ReviewForm = ({
  appointment,
  initialReview,
  onSubmit,
  onCancel,
}: {
  appointment: Appointment;
  initialReview?: Review;
  onSubmit: (appointmentId: string, rating: number, comment: string) => void;
  onCancel: () => void;
}) => {
  const [rating, setRating] = useState(initialReview?.rating || 0);
  const [comment, setComment] = useState(initialReview?.comment || "");

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Rating</label>
        <StarRating rating={rating} onChange={setRating} editable={true} />
      </div>

      <div className="space-y-2">
        <label htmlFor="comment" className="text-sm font-medium">
          Your Review
        </label>
        <Textarea
          id="comment"
          placeholder="Share your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-24"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={() => onSubmit(appointment.id, rating, comment)}
          disabled={rating === 0}
        >
          Submit Review
        </Button>
      </div>
    </div>
  );
};

// Main component
export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewMode, setReviewMode] = useState<"add" | "edit">("add");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    // Simulate API fetch
    const fetchAppointments = async () => {
      try {
        // In a real app, you would fetch from your API
        await new Promise((resolve) => setTimeout(resolve, 800));
        setAppointments(mockAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleAddReview = (
    appointmentId: string,
    rating: number,
    comment: string
  ) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === appointmentId
          ? {
              ...appointment,
              review: {
                id: `r${Date.now()}`,
                rating,
                comment,
                createdAt: new Date().toISOString(),
              },
            }
          : appointment
      )
    );
    setReviewDialogOpen(false);
  };

  const handleEditReview = (
    appointmentId: string,
    rating: number,
    comment: string
  ) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === appointmentId && appointment.review
          ? {
              ...appointment,
              review: {
                ...appointment.review,
                rating,
                comment,
              },
            }
          : appointment
      )
    );
    setReviewDialogOpen(false);
  };

  const handleDeleteReview = (appointmentId: string) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === appointmentId
          ? {
              ...appointment,
              review: undefined,
            }
          : appointment
      )
    );
  };

  const filteredAppointments = appointments.filter((appointment) => {
    if (activeTab === "all") return true;
    return appointment.status === activeTab;
  });

  const openReviewDialog = (appointment: Appointment, mode: "add" | "edit") => {
    setSelectedAppointment(appointment);
    setReviewMode(mode);
    setReviewDialogOpen(true);
  };

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <h1 className="text-2xl font-bold mb-6">My Appointments</h1>

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-6"
      >
        <TabsList className="grid grid-cols-3 md:w-auto md:inline-flex">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="w-full">
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-9 w-24" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : filteredAppointments.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredAppointments.map((appointment) => (
            <Card key={appointment.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      {appointment.service}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {appointment.provider}
                    </CardDescription>
                  </div>
                  <Badge
                    className={`${getStatusColor(
                      appointment.status
                    )} border-none capitalize`}
                  >
                    {appointment.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-col space-y-1 text-sm">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>
                      {format(new Date(appointment.date), "MMMM d, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{appointment.time}</span>
                  </div>
                </div>

                {appointment.review && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium text-sm">Your Review</div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => openReviewDialog(appointment, "edit")}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-red-500 hover:text-red-600"
                          onClick={() => handleDeleteReview(appointment.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <StarRating rating={appointment.review.rating} />
                    <p className="text-sm mt-2 text-gray-600 line-clamp-2">
                      {appointment.review.comment}
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="pt-2">
                {appointment.status === "completed" && !appointment.review && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => openReviewDialog(appointment, "add")}
                  >
                    <Star className="mr-2 h-4 w-4" />
                    Add Review
                  </Button>
                )}

                {appointment.status === "upcoming" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full">
                        Manage Appointment
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Reschedule</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500">
                        Cancel
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Alert>
          <AlertDescription>
            No appointments found for the selected filter.
          </AlertDescription>
        </Alert>
      )}

      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {reviewMode === "add" ? "Add Review" : "Edit Review"}
            </DialogTitle>
            <DialogDescription>
              Share your experience with this service
            </DialogDescription>
          </DialogHeader>

          {selectedAppointment && (
            <ReviewForm
              appointment={selectedAppointment}
              initialReview={selectedAppointment.review}
              onSubmit={
                reviewMode === "add" ? handleAddReview : handleEditReview
              }
              onCancel={() => setReviewDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
