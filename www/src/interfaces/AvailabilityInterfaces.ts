export interface CalendarEventRequest {
  sessionUUID: string | undefined;
  name: string;
  eventName: string;
  startDate: string;
  endDate: string | null;
}

export interface CalendarEventResponse {
  name: string;
  eventName: string;
  startDate: string;
  endDate: string | null;
}
