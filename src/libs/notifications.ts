import * as Notifications from "expo-notifications";

export const removeNotificationsByChanelId = async (id: string) => {
  await Notifications.deleteNotificationChannelAsync(id);
  const notifi = await Notifications.getAllScheduledNotificationsAsync();
  await Promise.all(
    notifi
      .filter((x) => (x.trigger as any).channelId === id)
      .map((x) => Notifications.cancelScheduledNotificationAsync(x.identifier))
  );
  return id;
};

export const createGroupNotificationsByChanelId = async ({
  id,
  indexDays,
}: {
  id: string;
  indexDays: number[];
}) => {
  const createNotifications = (weekdayIndex: number) => {
    return Notifications.scheduleNotificationAsync({
      content: {
        title: "AWESOME ALARM!",
      },
      trigger: {
        channelId: id,
        seconds: 2,
        // repeats: true,
      },
    });
  };
  const ids = await Promise.all(
    indexDays.map((x) => createNotifications(x + 1))
  );
  return ids;
};
