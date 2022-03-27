import { createEvent, createStore } from "effector";
import { Alarm } from "../type";

export const $alarmList = createStore<Alarm[]>([]);

export const addAlarm = createEvent<Alarm>();
$alarmList.on(addAlarm, (s, x) => [...s, x]);

export const removeAlarm = createEvent<string>();
$alarmList.on(removeAlarm, (s, id) => s.filter((x) => x.id !== id));
