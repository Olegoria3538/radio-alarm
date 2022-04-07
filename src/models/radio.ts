import {
  attach,
  createEffect,
  createEvent,
  createStore,
  forward,
} from "effector";
import { Audio, AVPlaybackStatus } from "expo-av";
import { triggerGetNotifictions } from "./alarm-list";
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
$radio.on(setRadio, (s, x) => (s?.radio ? s : x));

/**
 * флаг играет ли сейчас радио
 */
export const $radioPlayed = createStore(false);
export const setRadioPlayed = createEvent<boolean>();
$radioPlayed.on(setRadioPlayed, (_, x) => x);

const createRadioFx = <T, Q = void>(
  fn: (x: { radio: Radio; params: Q }) => Promise<T>
) => {
  const fx = attach({
    source: $radio,
    effect: createEffect({
      handler: async (x: { radio: Radio; params: Q }) => {
        return fn(x);
      },
    }),
    mapParams: (params: Q, radio) => ({ radio, params }),
  });
  $radio.on(fx.done, (s) => ({ ...s }));
  return fx;
};

/**
 * начать воспроизводить аудио
 */
export const playRadioFx = createRadioFx<AVPlaybackStatus, { uri: string }>(
  async ({ radio, params }) => {
    const { uri } = params;
    //TODO: страшно
    try {
      await radio.radio.stopAsync();
    } finally {
      try {
        await radio.radio.unloadAsync();
      } finally {
        await radio.radio.loadAsync({ uri });
        const res = await radio.radio.playAsync();
        return res;
      }
    }
  }
);
forward({ from: playRadioFx.doneData.map(() => true), to: setRadioPlayed });
playRadioFx.failData.watch((x) => console.log(x));
/**
 * остановить воспроизводения аудио
 */
export const stopRadioFx = createRadioFx(({ radio }) =>
  radio.radio.stopAsync()
);
forward({ from: stopRadioFx.doneData.map(() => false), to: setRadioPlayed });

/**
 * при получения уведомления вызываем радио
 */
forward({
  from: triggerGetNotifictions.map((x) => ({ uri: x.soundUri })),
  to: playRadioFx,
});

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
  const radio = new Audio.Sound();
  setRadio({ radio });
})();
