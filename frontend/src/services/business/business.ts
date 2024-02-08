import { api } from "../Api/Api";

export const getAllBusiness = async () => {
  const response = await api.get("/business/all");
  return response.data.businesses;
};

export const getSingleBusiness = async (slug: string | undefined) => {
  const response = await api.get(`/business/${slug}`);
  return await response.data.business;
};
