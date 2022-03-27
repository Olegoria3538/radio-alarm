import React from "react";
import "./src/models";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddAlarm, AlarmList, StopRadio } from "./src/features";
import * as Notifications from "expo-notifications";
import { useStore } from "effector-react";
import { $loadRadio, $radioPlayed } from "./src/models";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Stack = createNativeStackNavigator();

export default function App() {
  const loadRadio = useStore($loadRadio);
  const playedRadio = useStore($radioPlayed);
  if (!loadRadio) return null;
  if (playedRadio) return <StopRadio />;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Alarm list" component={AlarmList} />
        <Stack.Screen name="Add alarm" component={AddAlarm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
