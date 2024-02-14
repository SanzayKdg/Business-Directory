// /api/contact

import { ContactMessage } from "../../types/ContactUsTypes";
import { api } from "../Api/Api";

export const sendMessage = async (newMessage: ContactMessage) => {
  const response = await api.post("/contact/new", newMessage);
  return response.data;
};
