import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Session } from "../interfaces/SessionInterfaces";
import { fetchSession } from "../services/api";

const CalendarPage = () => {
  const { session_uuid } = useParams();
  const invalidSessionUUID = !session_uuid || typeof session_uuid !== "string";
  const navigate = useNavigate();

  useEffect(() => {
    if (invalidSessionUUID) {
      navigate("/");
      return;
    }
  }, [session_uuid, navigate]);

  const { data, isLoading } = useQuery<Session>({
    queryKey: ["session", session_uuid],
    queryFn: () => fetchSession(session_uuid!),
    enabled: !invalidSessionUUID,
  });

  const copyLink = () => {
    const shareUrl = `${window.location.origin}/calendar/${session_uuid}`;
    navigator.clipboard.writeText(shareUrl);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-10 px-4 text-gray-100">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="rounded-xl border border-gray-700/60 bg-zinc-900/60 shadow-lg backdrop-blur-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-400 uppercase tracking-wide">
                  Live Calendar
                </span>
              </div>
              {isLoading ? (
                <div className="h-8 bg-gray-700/50 rounded animate-pulse"></div>
              ) : (
                <h1 className="text-2xl md:text-3xl font-bold text-gray-100">
                  {data?.title || 'Loading...'}
                </h1>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={copyLink}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 shadow-sm"
              >
                Copy Link
              </button>

              <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors duration-200 shadow-sm">
                Add Availability
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Container */}
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
