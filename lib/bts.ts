export type BtsItem = {
  id: string;
  kind: "video" | "photo";
  timecode: string;
  title: string;
  path: string;
  tone: "amber" | "rust" | "graphite" | "paper";
};

export const btsItems: BtsItem[] = [
  {
    id: "b1",
    kind: "photo",
    timecode: "00:00:01",
    title: "IMG_3366.JPG",
    path: "/bts/IMG_3366.JPG",
    tone: "rust",
  },
  {
    id: "b4",
    kind: "video",
    timecode: "00:00:04",
    title: "IMG_5020.mp4",
    path: "/bts/IMG_5020.mp4",
    tone: "paper",
  },
  {
    id: "b8",
    kind: "photo",
    timecode: "00:00:08",
    title: "IMG_5028.JPG",
    path: "/bts/IMG_5028.JPG",
    tone: "paper",
  },
  {
    id: "b9",
    kind: "video",
    timecode: "00:00:09",
    title: "IMG_5029.mp4",
    path: "/bts/IMG_5029.mp4",
    tone: "graphite",
  },
  {
    id: "b11",
    kind: "photo",
    timecode: "00:00:11",
    title: "IMG_5045.JPG",
    path: "/bts/IMG_5045.JPG",
    tone: "amber",
  },
  {
    id: "b13",
    kind: "photo",
    timecode: "00:00:13",
    title: "IMG_5067.JPG",
    path: "/bts/IMG_5067.JPG",
    tone: "graphite",
  },
  {
    id: "b26",
    kind: "video",
    timecode: "00:00:26",
    title: "IMG_5091.mp4",
    path: "/bts/IMG_5091.mp4",
    tone: "rust",
  },
  {
    id: "b31",
    kind: "photo",
    timecode: "00:00:31",
    title: "IMG_5100.JPG",
    path: "/bts/IMG_5100.JPG",
    tone: "amber",
  },
  {
    id: "b34",
    kind: "video",
    timecode: "00:00:34",
    title: "IMG_5109.mp4",
    path: "/bts/IMG_5109.mp4",
    tone: "rust",
  },
];
