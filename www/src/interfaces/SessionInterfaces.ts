import type { CalendarEventResponse } from "./AvailabilityInterfaces";

export interface Session {
  id: number;
  title: string;
  sessionUUID: string;
  createdAt: string;
  updatedAt: string;
  availabilities: Array<CalendarEventResponse>;
}
