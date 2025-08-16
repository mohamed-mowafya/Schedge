import axios from "axios";
import type { Session } from "../interfaces/SessionInterfaces";
import type { CalendarEventRequest } from "../interfaces/AvailabilityInterfaces";
import { convertKeysToSnakeCase, convertKeysToCamelCase } from "../utils/caseConversion";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  if (["post", "put", "patch"].includes(config.method || "") && config.data) {
    config.data = convertKeysToSnakeCase(config.data);
  }
  return config;
});

apiClient.interceptors.response.use((response) => {
  if (response.data) {
    response.data = convertKeysToCamelCase(response.data);
  }
  return response;
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
  eventPayload: CalendarEventRequest
): Promise<void> => {
  if (!eventPayload.endDate) eventPayload.endDate = null;
  await apiClient.post<void>("/availability", eventPayload);
};
