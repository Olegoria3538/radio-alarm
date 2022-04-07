import { Audio } from "expo-av";

export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

export type Radio = { radio: Audio.Sound };

export type Screens = "addAlarm" | "alarms-list";
