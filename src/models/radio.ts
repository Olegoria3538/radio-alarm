import {
  attach,
  createEffect,
  createEvent,
  createStore,
  forward,
} from "effector";
import { Audio } from "expo-av";
import { triggerNotifictionsGet } from "./alarm-list";
import { Radio } from "./types";

/**
 * флаг на инициализацию expo аудио
 */
export const $loadRadio = createStore(false);

/**
 * экземляр expo audio
 */
export const $radio = createStore<Radio>({} as Radio);
const setRadio = createEvent<Radio>();

$loadRadio.on(setRadio, () => true);
$radio.on(setRadio, (_, x) => x);

/**
 * флаг играет ли сейчас радио
 */
export const $radioPlayed = createStore(false);
export const setRadioPlayed = createEvent<boolean>();
$radioPlayed.on(setRadioPlayed, (_, x) => x);

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

/**
 * начать воспроизводить аудио
 */
export const playRadioFx = createRadioFx((radio) => radio.sound.playAsync());
forward({ from: playRadioFx.doneData.map(() => true), to: setRadioPlayed });

/**
 * остановить воспроизводения аудио
 */
export const stopRadioFx = createRadioFx((radio) => radio.sound.unloadAsync());
forward({ from: stopRadioFx.doneData.map(() => false), to: setRadioPlayed });

/**
 * при получения уведомления вызываем радио
 */
forward({ from: triggerNotifictionsGet, to: playRadioFx });

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
