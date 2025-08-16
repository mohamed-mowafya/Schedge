import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Session } from "../interfaces/SessionInterfaces";
import { fetchSession } from "../services/api";
import { useCopyLink } from "../hooks/useCopyLink";
import { CalendarHeader } from "../components/CalendarHeader";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-10 px-4 text-gray-100">
      <div className="max-w-7xl mx-auto space-y-6">
        <CalendarHeader
          title={data?.title}
          isLoading={isLoading}
          sessionUUID={session_uuid}
        />
        <div className="rounded-xl border border-gray-700/60 bg-zinc-900/60 shadow-lg backdrop-blur-sm">
          <div className="p-4 fc-theme-tailwind">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,dayGridWeek,dayGridDay",
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
