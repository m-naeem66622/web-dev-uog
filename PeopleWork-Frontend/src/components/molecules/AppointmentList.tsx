import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, User, FileText } from "lucide-react";
import { Appointment } from "@/types/user";
import { format } from "date-fns";

interface AppointmentListProps {
  appointments: Appointment[];
  onAction: (
    appointmentId: string,
    action: "accept" | "reject" | "complete"
  ) => void;
}

const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
  onAction,
}) => {
  // Group appointments by status
  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "pending"
  );
  const confirmedAppointments = appointments.filter(
    (appointment) => appointment.status === "confirmed"
  );
  const pastAppointments = appointments.filter((appointment) =>
    ["completed", "cancelled"].includes(appointment.status)
  );

  const renderAppointmentCard = (appointment: Appointment) => {
    const getStatusBadge = () => {
      switch (appointment.status) {
        case "pending":
          return <Badge className="bg-yellow-500">Pending</Badge>;
        case "confirmed":
          return <Badge className="bg-blue-500">Confirmed</Badge>;
        case "completed":
          return <Badge className="bg-green-600">Completed</Badge>;
        case "cancelled":
          return <Badge variant="destructive">Cancelled</Badge>;
        default:
          return null;
      }
    };

    return (
      <Card key={appointment.id} className="mb-4">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-start gap-2 flex-wrap">
                <h3 className="font-semibold text-lg">{appointment.service}</h3>
                {getStatusBadge()}
              </div>

              <div className="flex items-center gap-2">
                <User size={16} className="text-gray-500" />
                <span>{appointment.customerName}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-500" />
                <span>{format(appointment.date, "MMM dd, yyyy")}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-500" />
                <span>{format(appointment.date, "h:mm a")}</span>
              </div>

              {appointment.notes && (
                <div className="flex items-start gap-2">
                  <FileText size={16} className="text-gray-500 mt-1" />
                  <span className="text-gray-600">{appointment.notes}</span>
                </div>
              )}
            </div>

            <div className="flex flex-row md:flex-col gap-2 mt-2 md:mt-0">
              {appointment.status === "pending" && (
                <>
                  <Button
                    onClick={() => onAction(appointment.id, "accept")}
                    className="w-full"
                  >
                    Accept
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => onAction(appointment.id, "reject")}
                    className="w-full"
                  >
                    Reject
                  </Button>
                </>
              )}

              {appointment.status === "confirmed" && (
                <Button
                  onClick={() => onAction(appointment.id, "complete")}
                  className="w-full"
                >
                  Mark Completed
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Tabs defaultValue="pending">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="pending">
          Pending ({pendingAppointments.length})
        </TabsTrigger>
        <TabsTrigger value="confirmed">
          Upcoming ({confirmedAppointments.length})
        </TabsTrigger>
        <TabsTrigger value="past">Past ({pastAppointments.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="pending">
        {pendingAppointments.length > 0 ? (
          pendingAppointments.map(renderAppointmentCard)
        ) : (
          <p className="text-center py-6 text-gray-500">
            No pending appointment requests
          </p>
        )}
      </TabsContent>

      <TabsContent value="confirmed">
        {confirmedAppointments.length > 0 ? (
          confirmedAppointments.map(renderAppointmentCard)
        ) : (
          <p className="text-center py-6 text-gray-500">
            No upcoming appointments
          </p>
        )}
      </TabsContent>

      <TabsContent value="past">
        {pastAppointments.length > 0 ? (
          pastAppointments.map(renderAppointmentCard)
        ) : (
          <p className="text-center py-6 text-gray-500">No past appointments</p>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default AppointmentList;
