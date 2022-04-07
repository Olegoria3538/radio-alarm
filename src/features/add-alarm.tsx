import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Button } from "react-native";
import { addAlarmFx } from "../models/alarm-list";
import { DayPicker, TimePicker } from "../shared/ui";
import { Day } from "../type";

export const AddAlarm = ({ navigation }: { navigation: any }) => {
  const [selectedDays, setSelectedDays] = useState<Day[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const onSumbit = async () => {
    await addAlarmFx({
      days: selectedDays.map((x) => x.index),
      time: selectedTime!,
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Picker onValueChange={(x: string) => x}>
        <Picker.Item
          label="radio 1"
          value="http://onair.100fmlive.dk/100fm_live.mp3?ua=WEB"
        />
      </Picker>
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
