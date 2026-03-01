import api from "../api/client";

export const sendFeedback = async (message: string) => {
  return api.post("/api/feedback", { message });
};
