import React, { useMemo, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export interface Day {
  text: string;
  key: string;
}

const createDays = () => {
  return [
    {
      text: "П",
      key: "monday",
    },
    {
      text: "В",
      key: "tuesday",
    },
    {
      text: "С",
      key: "wednesday",
    },
    {
      text: "Ч",
      key: "thursday",
    },
    {
      text: "П",
      key: "friday",
    },
    {
      text: "С",
      key: "saturday",
    },
    {
      text: "В",
      key: "sunday",
    },
  ] as Day[];
};

interface DayPicker {
  onChange?: (x: {
    days: Day[];
    daysHashMap: { [key: string]: boolean };
  }) => void;
}

export const DayPicker = ({ onChange }: DayPicker) => {
  const days = useMemo(createDays, []);
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  const toggleSelect = (key: string) => {
    const newValue = { ...selected, [key]: !selected?.[key] };
    setSelected(newValue);
    const daysSelected = Object.entries(newValue)
      .filter(([_, isCheck]) => isCheck)
      .map(([key]) => days.find((x) => x.key === key)) as Day[];
    onChange?.({ days: daysSelected, daysHashMap: newValue });
  };

  return (
    <View style={styles.container}>
      {days.map((x, i) => (
        <TouchableOpacity
          style={{
            ...styles.btn,
            marginLeft: i === 0 ? 0 : 5,
            backgroundColor: selected?.[x.key] ? "orange" : "gray",
          }}
          onPress={() => toggleSelect(x.key)}
        >
          <Text>{x.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 20,
  },
  btn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
});
