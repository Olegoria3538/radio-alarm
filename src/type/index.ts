export interface Day {
  text: string;
  key: string;
  index: number;
}

export interface Alarm {
  days: Day[];
  channelId: string;
  time: string;
  soundUri: string;
  disable?: boolean;
}
