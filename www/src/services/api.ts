import axios from "axios";
import type { Session } from "../interfaces/SessionInterfaces";
import type { CalendarEvent } from "../interfaces/AvailabilityInterfaces";
import { convertKeysToSnakeCase } from "../utils/caseConversion";

// Enhanced axios instance with automatic snake_case conversion for POST requests
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to convert POST request data keys to snake_case
apiClient.interceptors.request.use((config) => {
  if (config.method === "post" && config.data) {
    config.data = convertKeysToSnakeCase(config.data);
  }
  return config;
});

export const createSession = async (sessionData: {
  title: string;
}): Promise<Session> => {
  const { data } = await apiClient.post<Session>("/sessions", sessionData);
  return data;
};

export const fetchSession = async (sessionUUID: string): Promise<Session> => {
  const response = await apiClient.get<Session>(`/sessions/${sessionUUID}`);
  return response.data;
};

export const createEvent = async (
  eventPayload: CalendarEvent
): Promise<void> => {
  await apiClient.post<void>("/availability", eventPayload);
};
