import { attach, createEffect, createEvent, createStore } from "effector";
import { Audio } from "expo-av";
import { Radio } from "./types";

export const $loadRadio = createStore(false);
export const $radio = createStore<Radio>({} as Radio);

const setRadio = createEvent<Radio>();

$loadRadio.on(setRadio, () => true);
$radio.on(setRadio, (_, x) => x);

const createRadioFx = <T>(fn: (x: Radio) => Promise<T>) => {
  const fx = attach({
    source: $radio,
    effect: createEffect({
      handler: async (radio: Radio) => {
        return fn(radio);
      },
    }),
    mapParams: (_: void, x) => x,
  });
  $radio.on(fx.done, (s) => ({ ...s }));
  return fx;
};

export const playRadioFx = createRadioFx((radio) => radio.sound.playAsync());
export const stopRadioFx = createRadioFx((radio) => radio.sound.unloadAsync());

(async () => {
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: true,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
    playThroughEarpieceAndroid: false,
  });
  const radio = await Audio.Sound.createAsync({
    uri: "http://onair.100fmlive.dk/100fm_live.mp3?ua=WEB",
  });
  setRadio(radio);
})();
