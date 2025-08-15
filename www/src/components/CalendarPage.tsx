import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const CalendarPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-10 px-4 text-gray-100">
      <div className="max-w-7xl mx-auto rounded-xl border border-gray-700/60 bg-zinc-900/60 shadow-lg backdrop-blur-sm">
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
  );
};

export default CalendarPage;
