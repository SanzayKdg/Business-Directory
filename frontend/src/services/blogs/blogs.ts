import { api } from "../Api/Api";

export const getAllBlogs = async () => {
  const response = await api.get("/blogs/all");
  return response.data.blogs;
};
