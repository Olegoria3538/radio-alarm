import { useStore } from "effector-react";
import React from "react";
import { Button, Text, StyleSheet, View, ScrollView } from "react-native";
import { $alarmList } from "../../models";
import { AlarmItem } from "./alarm-item";

export const AlarmList = ({ navigation }: { navigation: any }) => {
  const alarmList = useStore($alarmList);
  return (
    <View style={styles.container}>
      <Button
        title="add new alarm"
        onPress={() => navigation.navigate("Add alarm")}
      />
      <ScrollView style={styles.containerText}>
        {alarmList.map((x) => (
          <AlarmItem key={x.id} alarm={x} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  containerText: {
    marginTop: 20,
  },
});
