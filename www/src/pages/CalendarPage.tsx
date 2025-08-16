import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Session } from "../interfaces/SessionInterfaces";
import { createEvent, fetchSession } from "../services/api";
import { CalendarHeader } from "../components/CalendarHeader";
import { AvailabilityModal } from "../components/AvailabilityModal";
import type { CalendarEvent } from "../interfaces/AvailabilityInterfaces";

const CalendarPage = () => {
  const { session_uuid } = useParams();
  const invalidSessionUUID = !session_uuid || typeof session_uuid !== "string";
  const navigate = useNavigate();

  useEffect(() => {
    if (invalidSessionUUID) {
      navigate("/");
      return;
    }
  }, [session_uuid, navigate, invalidSessionUUID]);

  const { data, isLoading } = useQuery<Session>({
    queryKey: ["session", session_uuid],
    queryFn: () => fetchSession(session_uuid!),
    enabled: !invalidSessionUUID,
  });

  const createAvailabilityMutation = useMutation({
    mutationFn: async (eventData: CalendarEvent) => createEvent(eventData),
  });

  // const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddAvailability = (values: {
    name: string;
    eventName: string;
    startDate: string;
    endDate: string;
  }) => {
    const newEvent: CalendarEvent = {
      sessionUUID: session_uuid,
      name: values.name,
      eventName: values.eventName,
      startDate: values.startDate,
      endDate: values.endDate,
    };

    createAvailabilityMutation.mutate(newEvent);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-10 px-4 text-gray-100">
      <div className="max-w-7xl mx-auto space-y-6">
        <CalendarHeader
          title={data?.title}
          isLoading={isLoading}
          sessionUUID={session_uuid}
          onAddAvailability={() => setIsModalOpen(true)}
        />
        <div className="rounded-xl border border-gray-700/60 bg-zinc-900/60 shadow-lg backdrop-blur-sm">
          <div className="p-4 fc-theme-tailwind">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              buttonText={{
                today: "Today",
                month: "Month",
                week: "Week",
                day: "Day",
              }}
              height="70vh"
              expandRows
              navLinks
              dayMaxEvents
              editable={true}
              selectable={true}
              // initialEvents={events}
            />
          </div>
        </div>

        <div className="flex justify-center items-center mt-8 mb-4">
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative bg-gray-800/80 backdrop-blur-sm border border-gray-700/60 rounded-lg px-6 py-3 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-gray-300 text-sm font-medium">
                  Powered by{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent font-bold tracking-wide">
                    Skedgly
                  </span>
                </span>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse delay-300"></div>
              </div>
            </div>
          </div>
        </div>

        <AvailabilityModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddAvailability}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
