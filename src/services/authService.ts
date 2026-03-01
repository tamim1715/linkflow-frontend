import api from "../api/client";

export const requestMagicLink = async (email: string) => {
  return api.post("/api/auth/request-link", { email });
};

export const verifyToken = async (token: string) => {
  const response = await api.get(`/api/auth/verify?token=${token}`);
  return response.data.token;
};
