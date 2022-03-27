export interface Day {
  text: string;
  key: string;
  index: number;
}

export interface Alarm {
  dateTimes: Date[];
  id: string;
  time: string;
}
