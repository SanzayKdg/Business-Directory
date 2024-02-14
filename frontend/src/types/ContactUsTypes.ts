export type ContactMessage = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
};

export type ContactUsResponse = {
  success: boolean | undefined;
  message: string;
};
