import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { stopRadioFx } from "../models";

export const StopRadio = () => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.btn} onPress={() => stopRadioFx()}>
        <Text style={{ fontSize: 50 }}>Stop</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: 300,
    height: 300,
    borderRadius: 300,
    backgroundColor: "red",
  },
});
