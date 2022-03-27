import { createEvent, createStore } from "effector";
import React from "react";
import { StyleSheet } from "react-native";
import "./src/models";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddAlarm, AlarmList } from "./src/features";

const $counter = createStore(0);
const add = createEvent<number>();
$counter.on(add, (s, x) => s + x);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Alarm list" component={AlarmList} />
        <Stack.Screen name="Add alarm" component={AddAlarm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
