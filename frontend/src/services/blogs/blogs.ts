import { api } from "../Api/Api";

export const getAllBlogs = async () => {
  const response = await api.get("/blogs/all");
  return response.data.blogs;
};

export const getBlogDetails = async (slug: string | undefined) => {
  const response = await api.get(`/blogs/${slug}`);
  return response.data.blog;
};
