export interface CalendarEvent {
  sessionUUID: string | undefined;
  name: string;
  eventName: string;
  startDate: string;
  endDate: string | null;
}
