import React, { useMemo } from "react";
import { Text, StyleSheet, View, Button, Alert, Switch } from "react-native";
import { removeAlarmFx, toggleAlarmFx } from "../../models";
import { Alarm } from "../../type";

export interface AlarmItem {
  alarm: Alarm;
}

export const AlarmItem = ({ alarm }: AlarmItem) => {
  const { time, days: dateTimes, channelId, disable } = alarm;
  const days = useMemo(() => dateTimes.map((x) => x.text), [dateTimes]);

  const onRemove = () => {
    Alert.alert("Удалить?", "", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => removeAlarmFx(channelId) },
    ]);
  };

  const timeFormat = useMemo(() => {
    const [hh, mm] = time.split(":");
    return [hh, mm].join(":");
  }, [time]);

  return (
    <View style={styles.wrapper}>
      <View style={{ flex: 1 }}>
        <View style={styles.row}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={!disable ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              toggleAlarmFx(alarm);
            }}
            value={!disable}
          />
          <Text style={styles.time}>{timeFormat}</Text>
        </View>
        <View style={styles.row}>
          {days.map((x, i) => (
            <Text
              key={i}
              style={{ ...styles.day, marginLeft: i === 0 ? 0 : 5 }}
            >
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
