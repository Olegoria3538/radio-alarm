import { Day } from "../../type";

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

export const getDayByIndex = (x: number) => {
  return createDays().find((d) => d.index === x);
};
