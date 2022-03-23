import { createEvent, createStore } from "effector";
import { useStore } from "effector-react";
import React from "react";
import { StyleSheet } from "react-native";
import { AddAlarm } from "./src/features/add-alarm";
import { $activeScreen } from "./src/models/screen-controller";

const $counter = createStore(0);
const add = createEvent<number>();
$counter.on(add, (s, x) => s + x);

export default function App() {
  const activeScreen = useStore($activeScreen);
  switch (activeScreen) {
    case "addAlarm":
      return <AddAlarm />;
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
