export const popularCategory = [
  { name: "food", noOfBlogs: 18 },
  { name: "travel", noOfBlogs: 18 },
  { name: "finance", noOfBlogs: 18 },
  { name: "entrepreneurship", noOfBlogs: 18 },
  { name: "technology", noOfBlogs: 18 },
];

export const popularTags = [
  "food",
  "travel",
  "finance",
  "culture",
  "technology",
  "health",
  "real estate",
  "education",
  "business",
  "sports",
];

export type BlogCategory = {
  FOOD: "FOOD";
  TRAVEL: "TRAVEL";
  FINANCE: "FINANCE";
  ENTREPRENEURSHIP: "ENTREPRENEURSHIP";
  TECHNOLOGY: "TECHNOLOGY";
  HEALTH: "HEALTH";
  REALESTATE: "REAL ESTATE";
  ECOMMERCE: "E-COMMERCE";
  HR: "HUMAN RESOURCE";
  MANUFACTURING: "MANUFACTURING";
  EDUCATION: "EDUCATION";
  BUSINESS: "BUSINESS";
  SPORTS: "SPORTS";
  ART: "ART";
  CULTURE: "CULTURE";
  OTHER: "OTHER";
};



export type CategoryType = {
  name: string;
  noOfBlogs: number;
};

export type BlogStatus = {
  PUBLISHED: "PUBLISHED";
  DRAFT: "DRAFT";
};
export type BlogAuthor = {
  _id: string;
  full_name: string;
};
export type AllBlogType = {
  title: string;
  slug: string;
  description: string;
  category: BlogCategory;
  cover: string;
  image: string[];
  tags: string[];
  author: BlogAuthor;
  status: BlogStatus;
  created_at: string;
};
