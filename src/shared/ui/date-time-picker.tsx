import React, { SyntheticEvent, useEffect, useState } from "react";
import DateTimePickerFuck from "@react-native-community/datetimepicker";

export interface DateTimePicker {
  value: Date;
  show: boolean;
}

type Event = SyntheticEvent<
  Readonly<{
    timestamp: number;
  }>
>;

export const DateTimePicker = ({ value, show: showProps }: DateTimePicker) => {
  const [show, setShow] = useState(showProps ?? true);
  useEffect(() => {
    setShow(showProps ?? false);
  }, [showProps]);

  if (!show) return null;
  return (
    <>
      <DateTimePickerFuck
        mode="date"
        value={value}
        minimumDate={new Date()}
        onChange={(x: Event) => console.log(x)}
      />
      <DateTimePickerFuck
        mode="time"
        value={value}
        minimumDate={new Date()}
        onChange={(x: Event) => console.log(x)}
      />
    </>
  );
};
