import React from "react";
import { StyleSheet, TextInput, SafeAreaView, Button } from "react-native";
import { DateTimePicker } from "../shared/ui";

export const AddAlarm = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Button title="kek" onPress={() => {}} />
      <DateTimePicker value={new Date()} />
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
