export type Cat = "All" | "Games" | "Web" | "Mobile" | "AI" | "Software"|"Art";

export type MediaItem = {
  type: "video" | "image";
  thumb: string;
  label: string;
  embedUrl?: string;
};

export type Project = {
  id: number;
  name: string;
  cat: Cat[];
  role: string;
  period?: string;
  highlights: string[];
  tech: string[];
  repo?: string;
  liveUrl?: string; 
  media: MediaItem[];
  reportUrl?: string;
};

export type TimelineType = "edu" | "intern";
export type TimelineItem = {
  role: string;
  org: string;
  location: string;
  period: string;
  type: TimelineType;
  current?: boolean;
  highlights: string[];
  tech?: string[];
};

export type BlogPost = {
  id: number;
  date: string;
  title: string;
  snippet: string;
  body: string;
};

// 1. Types definition
export type Certification = {
  name: string;
  issuer: string;
  date: string;
  image?: string; // Point to local file like "/certs/my-cert.png"
};

export type Competition = {
  title: string;
  organizer: string;
  date: string;
  result: string; // e.g. "1st Place", "Finalist"
  description?: string;
};
