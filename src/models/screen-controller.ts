import { createEvent, createStore } from "effector";
import { Screens } from "./types";

export const $activeScreen = createStore<Screens>("addAlarm");
export const setActiveScreen = createEvent<Screens>();

$activeScreen.on(setActiveScreen, (_, x) => x);
