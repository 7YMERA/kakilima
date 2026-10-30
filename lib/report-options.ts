// Choices for the report form, shared by the form (client) and the server action.

export const categories = [
  "sidewalk",
  "crossing",
  "pothole",
  "drainage",
  "lighting",
  "accessibility",
  "transit",
  "other",
] as const;

export type Category = (typeof categories)[number];

// Official state and federal territory names, which read the same in every language on the site.
export const states = [
  "Johor",
  "Kedah",
  "Kelantan",
  "Melaka",
  "Negeri Sembilan",
  "Pahang",
  "Perak",
  "Perlis",
  "Pulau Pinang",
  "Sabah",
  "Sarawak",
  "Selangor",
  "Terengganu",
  "W.P. Kuala Lumpur",
  "W.P. Labuan",
  "W.P. Putrajaya",
] as const;
