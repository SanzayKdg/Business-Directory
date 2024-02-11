export const Teams = [
  {
    avatar: "/users/user1.jpg",
    name: "Sarah Connor",
    designation: "project manager",
    social_links: [
      {
        name: "twitter",
        url: "https://www.twitter.com",
      },
      {
        name: "instagram",
        url: "https://www.instagram.com",
      },
      {
        name: "linkedin",
        url: "https://www.linkedin.com",
      },
    ],
  },
  {
    avatar: "/users/user2.jpg",
    name: "John Constantine",
    designation: "fullstack developer",
    social_links: [
      {
        name: "twitter",
        url: "https://www.twitter.com",
      },
      {
        name: "instagram",
        url: "https://www.instagram.com",
      },
      {
        name: "linkedin",
        url: "https://www.linkedin.com",
      },
    ],
  },
  {
    avatar: "/users/user3.jpg",
    name: "Darius Kincaid",
    designation: "qa tester",
    social_links: [
      {
        name: "twitter",
        url: "https://www.twitter.com",
      },
      {
        name: "instagram",
        url: "https://www.instagram.com",
      },
      {
        name: "linkedin",
        url: "https://www.linkedin.com",
      },
    ],
  },
  {
    avatar: "/users/user4.jpg",
    name: "Alan Turing",
    designation: "ui/ux designer",
    social_links: [
      {
        name: "twitter",
        url: "https://www.twitter.com",
      },
      {
        name: "instagram",
        url: "https://www.instagram.com",
      },
      {
        name: "linkedin",
        url: "https://www.linkedin.com",
      },
    ],
  },
];

export type SocialLinks = {
  name: string;
  url: string;
};

export type OurTeamsType = {
  avatar: string;
  name: string;
  designation: string;
  social_links: SocialLinks[];
};
