import api from "./api";

export async function teste() {
  const response = await api.get("/");
  return response.data;
}
