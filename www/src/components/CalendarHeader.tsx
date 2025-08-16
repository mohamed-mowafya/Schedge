import { useCopyLink } from "../hooks/useCopyLink";

type Props = { 
  title?: string; 
  isLoading?: boolean; 
  sessionUUID?: string;
  onAddAvailability?: () => void;
};

export const CalendarHeader = ({ title, isLoading, sessionUUID, onAddAvailability }: Props) => {
  const { copyLink } = useCopyLink(sessionUUID);

  return (
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
              {title || "Loading..."}
            </h1>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={copyLink}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 shadow-sm"
          >
            Share Calendar
          </button>

          <button 
            onClick={onAddAvailability}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors duration-200 shadow-sm"
          >
            Add Availability
          </button>
        </div>
      </div>
    </div>
  );
};
