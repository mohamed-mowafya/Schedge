import { useMutation } from "@tanstack/react-query";
import { SessionModal } from "./SessionModal";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import type { Session } from "../interfaces/SessionInterfaces";

const LandingPage = () => {
  const navigate = useNavigate();
  const createSessionMutation = useMutation({
    mutationFn: async (sessionData: { title: string }): Promise<Session> => {
      const { data } = await axios.post<Session>(
        `${import.meta.env.VITE_API_URL}/sessions/`,
        sessionData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    },
    onSuccess: (session) => {
      toast.success("Session created successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      redirectToCalendar(session);
    },
    onError: (error) => {
      toast.error("Error creating session: " + error.message, {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });

  const redirectToCalendar = (session: Session) => {
    navigate(`/calendar/${session?.session_uuid}`, { state: { session } });
  };

  const handleSubmit = (values: { title: string }, close: () => void) => {
    createSessionMutation.mutate({ ...values });
    close();
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 font-sans">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 space-y-8">
            <h1 className="leading-20 text-8xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
              Plan Together. Meet Easier.
            </h1>
            <p className="text-xl text-gray-300">
              Skedgly makes group scheduling fast, simple, and beautiful.
            </p>
            <SessionModal onSubmit={handleSubmit} />
          </div>

          <div className="relative w-32 h-32 flex-shrink-0">
            <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
            <svg
              className="w-full h-full text-purple-400 relative animate-[pulse_2s_ease-in-out_infinite]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M12 6v6l4 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
