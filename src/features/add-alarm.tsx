import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Button } from "react-native";
import { addAlarm } from "../models/alarm-list";
import { DayPicker, TimePicker } from "../shared/ui";
import { getNearestDate } from "../shared/utils";
import { Day } from "../type";

export const AddAlarm = ({ navigation }: { navigation: any }) => {
  const [selectedDays, setSelectedDays] = useState<Day[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const onSumbit = () => {
    const [hh, mm] = selectedTime?.split(":").map(Number) as number[];
    const dateTimes = selectedDays.map((x) => {
      return getNearestDate(x.index, { hh, mm });
    });
    addAlarm({ dateTimes, id: Math.random().toFixed(4), time: `${hh}:${mm}` });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <DayPicker onChange={({ days }) => setSelectedDays(days)} />
      <TimePicker onChange={setSelectedTime} />
      <Button
        disabled={!selectedDays.length || !selectedTime}
        title="Add"
        onPress={onSumbit}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },
});
