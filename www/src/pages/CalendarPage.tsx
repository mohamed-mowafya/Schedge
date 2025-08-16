import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Session } from "../interfaces/SessionInterfaces";
import { fetchSession } from "../services/api";
import { CalendarHeader } from "../components/CalendarHeader";
import { AvailabilityModal } from "../components/AvailabilityModal";

interface CalendarEvent {
  title: string;
  start: string;
  end?: string;
  allDay?: boolean;
}

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

  // const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddAvailability = (values: { name: string; timeSlot: string;}) => {
    // Create a new event from the form data
    const newEvent: CalendarEvent = {
      title: `${values.name} available`,
      start: values.timeSlot,
    };

    console.log(newEvent);
    
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
              height="75vh"
              expandRows
              navLinks
              dayMaxEvents
              editable={true}
              selectable={true}
              // initialEvents={events}
            />
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
