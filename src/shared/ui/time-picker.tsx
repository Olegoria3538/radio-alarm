import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import DateTimePickerFuck from "@react-native-community/datetimepicker";

export interface TimePicker {
  onChange?: (x: string | null) => void;
}

export const TimePicker = ({ onChange }: TimePicker) => {
  const [show, setShow] = useState(false);
  const [time, setTime] = useState<string | null>(null);

  const setTimeHangler = (x?: Date) => {
    const newTime = !x ? null : x.toLocaleTimeString();
    setTime(newTime);
    onChange?.(newTime);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setShow(true)}>
        <TextInput style={styles.input} value={time || ""} editable={false} />
      </TouchableOpacity>
      {show ? (
        <DateTimePickerFuck
          mode="time"
          value={new Date()}
          minimumDate={new Date()}
          onChange={(_: any, x?: Date) => {
            setShow(false);
            setTimeHangler(x);
          }}
        />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 20,
    fontSize: 20,
  },
});
