import { useStore } from "effector-react";
import React, { useEffect } from "react";
import { Button, StyleSheet, View, ScrollView } from "react-native";
import { $alarmList, getAllAlarmsFx, removeAllAlarmsFx } from "../../models";
import { AlarmItem } from "./alarm-item";

export const AlarmList = ({ navigation }: { navigation: any }) => {
  const alarmList = useStore($alarmList);
  useEffect(() => {
    // removeAllAlarmsFx();
    getAllAlarmsFx();
  }, []);
  return (
    <View style={styles.container}>
      <Button
        title="add new alarm"
        onPress={() => navigation.navigate("Add alarm")}
      />
      <ScrollView style={styles.containerText}>
        {alarmList.map((x) => (
          <AlarmItem key={x.channelId} alarm={x} />
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
