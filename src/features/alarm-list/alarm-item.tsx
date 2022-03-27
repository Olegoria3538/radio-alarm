import { useMemo } from "react";
import { Text, StyleSheet, View, Button, Alert } from "react-native";
import { removeAlarm } from "../../models";
import { getDayByDate } from "../../shared";
import { Alarm } from "../../type";

export interface AlarmItem {
  alarm: Alarm;
}

export const AlarmItem = ({ alarm }: AlarmItem) => {
  const { time, dateTimes, id } = alarm;
  const days = useMemo(
    () => dateTimes.map((x) => getDayByDate(x).text),
    [dateTimes]
  );

  const onRemove = () => {
    Alert.alert("Удалить?", "", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => removeAlarm(id) },
    ]);
  };

  return (
    <View style={styles.wrapper}>
      <View style={{ flex: 1 }}>
        <Text style={styles.time}>{time}</Text>
        <View style={styles.row}>
          {days.map((x, i) => (
            <Text style={{ ...styles.day, marginLeft: i === 0 ? 0 : 5 }}>
              {x}
            </Text>
          ))}
        </View>
      </View>
      <View>
        <Button title="remove" color={"red"} onPress={onRemove} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  row: {
    flexDirection: "row",
  },
  day: {
    backgroundColor: "gray",
    fontSize: 15,
    color: "white",
    padding: 5,
    width: 30,
    height: 30,
    textAlign: "center",
    borderRadius: 100,
  },
  time: {
    fontSize: 30,
    marginBottom: 5,
  },
});
