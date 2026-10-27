// Official places to report problems. Names and links live here; the descriptions
// for each language live under i18n/dictionaries (report.groups and report.channels).

export type ChannelId = "myjalan" | "responsRakyat" | "sispaa" | "prasarana" | "ktmb" | "apad";

export type ChannelGroupId = "roads" | "transit";

export type ReportChannel = {
  id: ChannelId;
  name: string;
  url: string;
};

export const channelGroups: { id: ChannelGroupId; channels: ReportChannel[] }[] = [
  {
    id: "roads",
    channels: [
      { id: "myjalan", name: "MyJalan", url: "https://www.kkr.gov.my/en/myjalan-app" },
      {
        id: "responsRakyat",
        name: "Respons Rakyat",
        url: "https://www.malaysia.gov.my/my/feedback/sistem-pengurusan-aduan-bersepadu-sispaa",
      },
      {
        id: "sispaa",
        name: "SiSPAA",
        url: "https://pcb.spab.gov.my/eApps/sdmscasepool/SdmsCasePool/add.do?aplCode=ms",
      },
    ],
  },
  {
    id: "transit",
    channels: [
      { id: "prasarana", name: "Prasarana / Rapid KL", url: "https://myrapid.com.my" },
      { id: "ktmb", name: "KTMB", url: "https://www.ktmb.com.my" },
      { id: "apad", name: "APAD", url: "https://www.apad.gov.my" },
    ],
  },
];
