import { Audio } from "expo-av";

export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

export type Radio = Awaited<ReturnType<typeof Audio.Sound.createAsync>>;

export type Screens = "addAlarm" | "alarms-list";
