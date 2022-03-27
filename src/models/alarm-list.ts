import { createEffect, createEvent, createStore } from "effector";
import { Alarm, Day } from "../type";
import * as Notifications from "expo-notifications";
import { customAlphabet } from "nanoid/non-secure";
import { getDayByIndex } from "../shared";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export const $alarmList = createStore<Alarm[]>([]);

/**
 * получает все заведённые натификашки
 */
export const getAllAlarmsFx = createEffect({
  handler: async () => {
    const notifi = await Notifications.getAllScheduledNotificationsAsync();
    const group: { [k: string]: Notifications.NotificationRequest[] } = {};
    notifi.forEach((x) => {
      if ((x?.trigger as any)?.channelId) {
        group[(x?.trigger as any)?.channelId] = [
          ...(group[(x?.trigger as any)?.channelId] || []),
          x,
        ];
      }
    });
    const alarms = Object.values(group).map((x): Alarm => {
      return {
        days: x
          .map((x) => getDayByIndex((x.trigger as any).weekday - 1))
          .filter(Boolean),
        channelId: (x[0].trigger as any).channelId,
        time: `${(x[0].trigger as any).hour}:${(x[0].trigger as any).minute}`,
      };
    });
    return alarms;
  },
});
$alarmList.on(getAllAlarmsFx.doneData, (_, x) => x);

/**
 * добавлить будильник - массив натификашек
 */
export const addAlarmFx = createEffect({
  handler: async ({
    hh,
    mm,
    days,
  }: {
    hh: number;
    mm: number;
    days: Day[];
  }): Promise<Alarm> => {
    const channelId = nanoid();
    const createNotifications = async (weekdayIndex: number) => {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "AWESOME ALARM!",
        },
        trigger: {
          channelId,
          weekday: weekdayIndex,
          hour: hh,
          minute: mm,
          repeats: true,
        },
      });
    };
    await Promise.all(days.map((x) => createNotifications(x.index + 1)));
    return { days, channelId, time: `${hh}:${mm}` };
  },
});
$alarmList.on(addAlarmFx.doneData, (s, x) => [...s, x]);

/**
 * удалить будильник, натификаки по channelId
 */
export const removeAlarmFx = createEffect({
  handler: async ({ channelId }: { channelId: string }) => {
    await Notifications.deleteNotificationChannelAsync(channelId);
    const notifi = await Notifications.getAllScheduledNotificationsAsync();
    await Promise.all(
      notifi
        .filter((x) => (x.trigger as any).channelId === channelId)
        .map((x) =>
          Notifications.cancelScheduledNotificationAsync(x.identifier)
        )
    );
    return channelId;
  },
});
$alarmList.on(removeAlarmFx.doneData, (s, channelId) =>
  s.filter((x) => x.channelId !== channelId)
);

/**
 * удаляет все будильники, натификашки
 */
export const removeAllAlarmsFx = createEffect({
  handler: async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    return true;
  },
});
$alarmList.on(removeAllAlarmsFx.doneData, () => []);
