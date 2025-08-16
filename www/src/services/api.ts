import axios from "axios";
import type { Session } from "../interfaces/SessionInterfaces";

export const fetchSession = async (sessionUUID: string): Promise<Session> => {
  const response = await axios.get<Session>(
    `${import.meta.env.VITE_API_URL}/sessions/${sessionUUID}`
  );
  return response.data;
};
