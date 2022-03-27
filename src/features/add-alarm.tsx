import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Button } from "react-native";
import { addAlarmFx } from "../models/alarm-list";
import { DayPicker, TimePicker } from "../shared/ui";
import { Day } from "../type";

export const AddAlarm = ({ navigation }: { navigation: any }) => {
  const [selectedDays, setSelectedDays] = useState<Day[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const onSumbit = async () => {
    const [hh, mm] = selectedTime?.split(":").map(Number) as number[];
    await addAlarmFx({
      days: selectedDays,
      hh,
      mm,
    });
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
