// Official places to report problems. Edit this list to add or update channels.

export type ReportChannel = {
  name: string;
  runBy: string;
  use: string;
  url: string;
};

export type ChannelGroup = {
  title: string;
  intro: string;
  channels: ReportChannel[];
};

export const channelGroups: ChannelGroup[] = [
  {
    title: "Roads, potholes and sidewalks",
    intro: "Broken roads, missing covers, bad drainage and damaged walkways.",
    channels: [
      {
        name: "MyJalan",
        runBy: "Ministry of Works (KKR)",
        use: "Report road defects with a photo and pin. Good for potholes, damaged signs and road furniture.",
        url: "https://www.kkr.gov.my/en/myjalan-app",
      },
      {
        name: "Respons Rakyat",
        runBy: "Public Complaints Bureau (BPA)",
        use: "One app for complaints to hundreds of government agencies, including local councils. Search “Respons Rakyat” in the App Store or Google Play.",
        url: "https://www.malaysia.gov.my/my/feedback/sistem-pengurusan-aduan-bersepadu-sispaa",
      },
      {
        name: "SiSPAA",
        runBy: "Public Complaints Bureau (BPA)",
        use: "The web version of the government complaints system, if you prefer a browser to an app.",
        url: "https://pcb.spab.gov.my/eApps/sdmscasepool/SdmsCasePool/add.do?aplCode=ms",
      },
    ],
  },
  {
    title: "Trains and buses",
    intro: "Breakdowns, unsafe stations, missing first and last mile links.",
    channels: [
      {
        name: "Prasarana / Rapid KL",
        runBy: "Prasarana Malaysia",
        use: "LRT, MRT, monorail and Rapid buses. Use the feedback or contact section on their site.",
        url: "https://myrapid.com.my",
      },
      {
        name: "KTMB",
        runBy: "Keretapi Tanah Melayu Berhad",
        use: "KTM Komuter, ETS and intercity rail.",
        url: "https://www.ktmb.com.my",
      },
      {
        name: "APAD",
        runBy: "Land Public Transport Agency",
        use: "The regulator for land public transport in Peninsular Malaysia. Escalate here when an operator doesn't respond.",
        url: "https://www.apad.gov.my",
      },
    ],
  },
];
