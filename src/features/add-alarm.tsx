import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Button } from "react-native";
import { Day, DayPicker, TimePicker } from "../shared/ui";

export const AddAlarm = () => {
  const [selectedDays, setSelectedDays] = useState<Day[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <DayPicker onChange={({ days }) => setSelectedDays(days)} />
      <TimePicker onChange={setSelectedTime} />
      <Button title="Add" onPress={() => {}} />
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
