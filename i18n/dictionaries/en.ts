import type { AdvocateId, AdvocateKind, LinkType, Topic } from "@/data/advocates";
import type { ChannelGroupId, ChannelId } from "@/data/report-channels";

const en = {
  meta: {
    description:
      "A community hub for safer streets, walkable sidewalks and better public transport in Malaysia.",
  },
  nav: {
    skip: "Skip to main content",
    main: "Main",
    report: "Report it",
    about: "About",
    directory: "Directory",
  },
  language: {
    label: "Language",
  },
  a11y: {
    label: "Display settings",
    textSize: "Text size",
    sizes: { normal: "Normal", large: "Large", larger: "Larger" },
    contrast: "High contrast",
  },
  footer: {
    disclaimer: "KakiLima is an independent community project. We are not affiliated with any government agency.",
  },
  home: {
    eyebrow: "For safer streets",
    title: "Streets that are safe to walk. Trains worth waiting for.",
    lead: "KakiLima brings together Malaysians who are tired of broken sidewalks, dangerous crossings and unreliable public transport, and helps turn that frustration into action.",
    ctaReport: "Report a problem",
    ctaAbout: "Why KakiLima",
    buildingTitle: "What we're building",
    pillars: [
      {
        title: "Report it properly",
        body: "Every official complaint channel in one place, so your pothole or broken walkway lands on the right desk.",
      },
      {
        title: "Find your people",
        body: "A directory of the NGOs and individuals already pushing for safer roads and better trains.",
      },
      {
        title: "Share what you face",
        body: "A public wall of the sidewalks, crossings and stations that fail us every day. Coming soon.",
      },
      {
        title: "Hold leaders to account",
        body: "Track what is reported in each constituency and keep elected representatives informed. Coming later.",
      },
    ],
  },
  report: {
    title: "Report it",
    lead: "A complaint on social media gets likes. A complaint in the official system gets a ticket number that someone has to close. Use both, but always file the official one.",
    tipsTitle: "Make your report count",
    tips: [
      "Take a clear photo, plus one wider shot that shows where it is.",
      "Drop an exact pin or note the nearest landmark and road name.",
      "Say who is at risk: wheelchair users, children walking to school, riders at night.",
      "Keep your reference number and follow up if nothing happens.",
    ],
    open: "Open",
    newTab: "(opens in a new tab)",
    feedback: "Spotted a wrong link or a channel we missed? Let us know so we can fix it.",
    groups: {
      roads: {
        title: "Roads, potholes and sidewalks",
        intro: "Broken roads, missing covers, bad drainage and damaged walkways.",
      },
      transit: {
        title: "Trains and buses",
        intro: "Breakdowns, unsafe stations, missing first and last mile links.",
      },
    } as Record<ChannelGroupId, { title: string; intro: string }>,
    channels: {
      myjalan: {
        runBy: "Ministry of Works (KKR)",
        use: "Report road defects with a photo and pin. Good for potholes, damaged signs and road furniture.",
      },
      responsRakyat: {
        runBy: "Public Complaints Bureau (BPA)",
        use: "One app for complaints to hundreds of government agencies, including local councils. Search “Respons Rakyat” in the App Store or Google Play.",
      },
      sispaa: {
        runBy: "Public Complaints Bureau (BPA)",
        use: "The web version of the government complaints system, if you prefer a browser to an app.",
      },
      prasarana: {
        runBy: "Prasarana Malaysia",
        use: "LRT, MRT, monorail and Rapid buses. Use the feedback or contact section on their site.",
      },
      ktmb: {
        runBy: "Keretapi Tanah Melayu Berhad",
        use: "KTM Komuter, ETS and intercity rail.",
      },
      apad: {
        runBy: "Land Public Transport Agency",
        use: "The regulator for land public transport in Peninsular Malaysia. Escalate here when an operator doesn't respond.",
      },
    } as Record<ChannelId, { runBy: string; use: string }>,
  },
  directory: {
    title: "Directory",
    lead: "The groups, creators and leaders already speaking up for safer streets and better public transport. Follow them, learn from them, and back their work.",
    kinds: {
      groups: "Groups and NGOs",
      creators: "Creators",
      officials: "Elected leaders and officials",
      research: "Research and data",
    } as Record<AdvocateKind, string>,
    topics: {
      walking: "Walking",
      cycling: "Cycling",
      transit: "Public transport",
      roadSafety: "Road safety",
    } as Record<Topic, string>,
    topicsLabel: "Topics",
    linkTypes: {
      instagram: "Instagram",
      tiktok: "TikTok",
      x: "X",
      website: "Website",
      news: "In the news",
    } as Record<LinkType, string>,
    newTab: "(opens in a new tab)",
    officialsNote: "Listing an elected leader or official records their public work on these issues. It is not an endorsement.",
    suggest: "Know someone who should be here? Tell us their public page and what they work on.",
    entries: {
      kerjaJalan: "Group walks that explore neighbourhoods on foot, looking at accessibility and heritage. They also help residents raise walkability issues with local councils.",
      bikeCommute: "Commuter cyclists and urbanists running bike kitchens, workshops, group rides and maps, and pushing councils for safer street design.",
      transit: "A long-running citizens' group that speaks up for public transport users in the Klang Valley and across Malaysia.",
      driving4dummies: "Friendly videos on everyday driving mistakes and how to get them right: merging, roundabouts, stopping for pedestrians and reading signs.",
      ngSzeHan: "Selangor state executive councillor for investment, trade and mobility. Has ordered walking audits by local councils and calls mobility a matter of social justice.",
      miros: "The government's road safety research institute. Publishes crash research and road safety data.",
    } as Record<AdvocateId, string>,
  },
  about: {
    title: "About KakiLima",
    lead: "A kaki lima is the five-foot walkway in front of Malaysian shophouses: a space meant for people on foot. Too often today it is broken, blocked or missing entirely.",
    body: "KakiLima is a community project for everyone who wants Malaysian streets to be safe to walk, cycle and wait on, and for public transport to be a real choice rather than a last resort.",
    beliefsTitle: "What we believe",
    beliefs: [
      "Road safety is a public responsibility, not just a driver's problem.",
      "Good sidewalks and reliable trains are basic infrastructure, not luxuries.",
      "Streets must work for everyone: children, older people, and people with disabilities (OKU).",
      "Problems get fixed faster when they are documented, visible and shared.",
      "Elected representatives work better when they know what their constituents face.",
    ],
    whereTitle: "Where we are",
    where:
      "We are just getting started. Right now you can find the official channels to report problems and a directory of people already speaking up. A public space to share what you face is on the way.",
  },
};

export type Dictionary = typeof en;

export default en;
