// People and groups listed in the directory. Names and links live here; the short
// description for each language lives under directory.entries in i18n/dictionaries.
// Only add public accounts, and only people who campaign publicly on these issues.

export type AdvocateId = "kerjaJalan" | "bikeCommute" | "transit" | "driving4dummies" | "ngSzeHan" | "miros";

export type AdvocateKind = "groups" | "creators" | "officials" | "research";

export type Topic = "walking" | "cycling" | "transit" | "roadSafety";

export type LinkType = "instagram" | "tiktok" | "x" | "website" | "news";

export type Advocate = {
  id: AdvocateId;
  name: string;
  kind: AdvocateKind;
  topics: Topic[];
  links: { type: LinkType; url: string }[];
};

export const kindOrder: AdvocateKind[] = ["groups", "creators", "officials", "research"];

export const advocates: Advocate[] = [
  {
    id: "kerjaJalan",
    name: "Kerja Jalan",
    kind: "groups",
    topics: ["walking"],
    links: [{ type: "instagram", url: "https://www.instagram.com/kerjajalan/" }],
  },
  {
    id: "bikeCommute",
    name: "Bike Commute Malaysia",
    kind: "groups",
    topics: ["cycling", "roadSafety"],
    links: [
      { type: "website", url: "https://bikecommute.my/" },
      { type: "instagram", url: "https://www.instagram.com/bikecommute.my/" },
    ],
  },
  {
    id: "transit",
    name: "TRANSIT Malaysia",
    kind: "groups",
    topics: ["transit"],
    links: [
      { type: "website", url: "https://transitmalaysia.com/" },
      { type: "x", url: "https://x.com/transitmy" },
    ],
  },
  {
    id: "driving4dummies",
    name: "driving4dummies",
    kind: "creators",
    topics: ["roadSafety"],
    links: [
      { type: "instagram", url: "https://www.instagram.com/driving4dummies/" },
      { type: "tiktok", url: "https://www.tiktok.com/@driving4dummies" },
    ],
  },
  {
    id: "ngSzeHan",
    name: "Ng Sze Han",
    kind: "officials",
    topics: ["walking", "transit"],
    links: [
      {
        type: "news",
        url: "https://www.thestar.com.my/metro/metro-news/2026/09/19/selangor-authorities-to-conduct-walking-audits-to-improve-pedestrian-routes",
      },
    ],
  },
  {
    id: "miros",
    name: "MIROS",
    kind: "research",
    topics: ["roadSafety"],
    links: [{ type: "website", url: "https://www.miros.gov.my/" }],
  },
];
