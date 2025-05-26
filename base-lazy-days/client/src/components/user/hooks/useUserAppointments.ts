import { useQuery } from "@tanstack/react-query";
import type { Appointment } from "@shared/types";

import { useLoginData } from "@/auth/AuthContext";
import { generateUserAppointmentsKey } from "@/react-query/key-factories";
import { axiosInstance, getJWTHeader } from "../../../axiosInstance";

// for when we need a query function for useQuery
async function getUserAppointments(
  userId: number,
  userToken: string
): Promise<Appointment[] | null> {
  const { data } = await axiosInstance.get(`/user/${userId}/appointments`, {
    headers: getJWTHeader(userToken),
  });
  return data.appointments;
}

export function useUserAppointments(): Appointment[] {
  // TODO replace with React Query
  const fallback: Appointment[] = [];
  const { userId, userToken } = useLoginData();
  const { data: userAppointments = fallback } = useQuery({
    enabled: !!userId,
    queryKey: generateUserAppointmentsKey(userId, userToken),
    queryFn: () => getUserAppointments(userId, userToken),
  });
  return userAppointments;
}
