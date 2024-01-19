export const slugify = (name: any) => {
  return name.replace(/\s+/g, "-").toLowerCase();
};
