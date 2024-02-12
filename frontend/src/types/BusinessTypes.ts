export type AllListings = {
  address: string;
  category: string;
  contact: string;
  id: string;
  image: string;
  is_featured: boolean;
  is_online: boolean;
  is_popular: boolean;
  logo: string;
  name: string;
  slug: string;
};

export type BusinessCoordinates = {
  coordinates: [number, number];
};

export type OpeningHours = {
  day: string;
  open: string;
  closes: string;
};

export type SingleListing = {
  business_location: BusinessCoordinates;
  name: string;
  email: string;
  description: string;
  logo: string;
  images: string[];
  phone_number: string;
  telephone: string;
  website: string;
  category: string;
  social_links: string[];
  address: string;
  is_featured: boolean;
  is_popular: boolean;
  is_online: boolean;
  is_verified: boolean;
  slug: string;
  amenities: string[];
  opening_hours: OpeningHours[];
};

// export const DAYS = [
//   "sunday",
//   "monday",
//   "tuesday",
//   "wednesday",
//   "thursday",
//   "friday",
//   "saturday",
// ];

export const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const opening_hours = {
  sun: { open: "10:00", closes: "18:00" },
  mon: { open: "10:00", closes: "18:00" },
  tue: { open: "10:00", closes: "18:00" },
  wed: { open: "10:00", closes: "18:00" },
  thu: { open: "10:00", closes: "18:00" },
  fri: { open: "10:00", closes: "18:00" },
  sat: { open: "closes", closes: "closes" },
};
