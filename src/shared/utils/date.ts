import { Day } from "../../type";

export const getNearestDate = (
  targetDayIndex: number,
  time: { hh: number; mm: number }
) => {
  const date = new Date();
  date.setHours(time.hh, time.mm, 0, 0);

  const targetDate = new Date();
  targetDate.setHours(time.hh, time.mm, 0, 0);

  const delta = targetDayIndex - date.getDay();

  if (delta >= 0) {
    targetDate.setDate(date.getDate() + delta);
  } else {
    targetDate.setDate(date.getDate() + 7 + delta);
  }
  return targetDate;
};

export const createDays = () => {
  return [
    {
      text: "П",
      key: "monday",
      index: 1,
    },
    {
      text: "В",
      key: "tuesday",
      index: 2,
    },
    {
      text: "С",
      key: "wednesday",
      index: 3,
    },
    {
      text: "Ч",
      key: "thursday",
      index: 4,
    },
    {
      text: "П",
      key: "friday",
      index: 5,
    },
    {
      text: "С",
      key: "saturday",
      index: 6,
    },
    {
      text: "В",
      key: "sunday",
      index: 0,
    },
  ] as Day[];
};

export const getDayByDate = (x: Date) => {
  const days = createDays().sort((a, b) => a.index - b.index);
  return days[x.getDay()];
};
