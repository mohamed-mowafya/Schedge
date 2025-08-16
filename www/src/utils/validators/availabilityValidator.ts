import type { CalendarEventRequest } from "../../interfaces/AvailabilityInterfaces";

export const validateName = (value: string): string | null => {
  if (!value || value.trim().length === 0) {
    return "Name is required";
  }
  if (value.trim().length < 2) {
    return "Name must be at least 2 characters long";
  }
  return null;
};

export const validateEventName = (value: string): string | null => {
  if (!value || value.trim().length === 0) {
    return "Event name is required";
  }
  if (value.trim().length < 3) {
    return "Event name must be at least 3 characters long";
  }
  return null;
};

export const validateStartDate = (value: string): string | null => {
  if (!value) {
    return "Start date is required";
  }
  const startDate = new Date(value);
  const now = new Date();
  if (startDate < now) {
    return "Start date cannot be in the past";
  }
  return null;
};

export const validateEndDate = (
  value: string | null,
  values: CalendarEventRequest
): string | null => {
  if (value) {
    const endDate = new Date(value);
    const startDate = new Date(values.startDate);

    if (endDate <= startDate) {
      return "End date must be after start date";
    }
  }
  return null;
};

export const availabilityValidation = {
  name: validateName,
  eventName: validateEventName,
  startDate: validateStartDate,
  endDate: validateEndDate,
};
