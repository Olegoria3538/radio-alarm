import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Button } from "react-native";
import { addAlarmFx } from "../models/alarm-list";
import { DayPicker, TimePicker } from "../shared/ui";
import { Day } from "../type";

export const AddAlarm = ({ navigation }: { navigation: any }) => {
  const [selectedDays, setSelectedDays] = useState<Day[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [soundUri, setSoundUri] = useState<string>(
    "http://sc-classrock.1.fm:8200"
  );

  const onSumbit = async () => {
    await addAlarmFx({
      days: selectedDays.map((x) => x.index),
      time: selectedTime!,
      soundUri: soundUri,
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Picker
        selectedValue={soundUri || undefined}
        onValueChange={(x: string) => setSoundUri(x)}
      >
        <Picker.Item
          label="onair"
          value="http://onair.100fmlive.dk/100fm_live.mp3?ua=WEB"
        />
        <Picker.Item
          label="classic rock"
          value="http://sc-classrock.1.fm:8200"
        />
        <Picker.Item
          label="jazz"
          value="http://jazzradio.ice.infomaniak.ch/jazzradio-high.mp3"
        />
      </Picker>
      <DayPicker onChange={({ days }) => setSelectedDays(days)} />
      <TimePicker onChange={setSelectedTime} />
      <Button
        disabled={!selectedDays.length || !selectedTime || !soundUri}
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
