/* eslint-disable @typescript-eslint/no-explicit-any */
export type AllBusinesses = {
  image: string;
  logo: string;
  name: string;
  address: string;
  contact: string;
  id: string;
  category: string;
  is_online: boolean;
  is_popular: boolean;
  is_featured: boolean;
};

export type SingleBusiness = {
  business_location: string;
  name: string;
  description: string;
  logo: string;
  image: any[];
  phone_number: string;
  telephone: string;
  website: string;
  category: string;
  social_links: any[];
  address: string;
  is_featured: boolean;
  is_popular: boolean;
  is_online: boolean;
  is_verified: boolean;
  slug: string;
};

export type BusinessType = {
  businesses: AllBusinesses[];
  business: SingleBusiness;
};
// export type SingleBusinessType = {
// };
