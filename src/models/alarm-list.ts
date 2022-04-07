import { createEffect, createEvent, createStore, sample } from "effector";
import { Alarm, Day } from "../type";
import * as Notifications from "expo-notifications";
import { customAlphabet } from "nanoid/non-secure";
import { getDayByIndex } from "../shared";
import * as SQLite from "expo-sqlite";
import { SQLResultSet, SQLTransaction } from "expo-sqlite";
import {
  createGroupNotificationsByChanelId,
  removeNotificationsByChanelId,
} from "../libs";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

/**
 * тригер на получение уведомления
 */
export const triggerNotifictionsGet = createEvent<Notifications.Notification>();
Notifications.addNotificationReceivedListener((notification) => {
  triggerNotifictionsGet(notification);
});

/**
 * подключение к бд
 */
const db = SQLite.openDatabase("awensomeAlarms");

/**
 * обертка промисом для транзакции
 */
const transactionBd = (query: string) => {
  return new Promise<{ transaction: SQLTransaction; result: SQLResultSet }>(
    (resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          query,
          undefined,
          (transaction, result) => resolve({ transaction, result }),
          (transaction, error) => {
            reject({ transaction, error });
            return true;
          }
        );
      });
    }
  );
};
/**
 * создание таблицы
 */
const TABEL_NAME = "ALARMS";
transactionBd(
  `create table if not exists ${TABEL_NAME}  (id string primary key not null, time text, days text, disable boolean);`
);

/**
 * получить все будильники из бд
 */
const getAllAlarms = async () => {
  const { result } = await transactionBd(`select * from ${TABEL_NAME}`);
  const rawAlarms = result.rows._array as {
    days: string;
    disable: 0 | 1;
    id: string;
    time: string;
  }[];
  const alarms = rawAlarms.map(
    (x): Alarm => ({
      disable: !!x?.disable,
      channelId: x.id,
      time: x.time,
      days: (x?.days?.split(",") || [])
        .map((x) => getDayByIndex(Number(x)))
        .filter(Boolean) as Day[],
    })
  );
  return alarms;
};

/**
 * добавлить будильник в бд и завсети нотификашки
 */
const addAlarm = async ({ time, days }: { time: string; days: number[] }) => {
  const id = nanoid();
  await transactionBd(
    `insert into ${TABEL_NAME} (id, time, days, disable) values ('${id}', '${time}', '${days.join()}', ${0})`
  );
  const [hh, mm] = time.split(":").map(Number);
  await createGroupNotificationsByChanelId({ id, indexDays: days, hh, mm });
  return id;
};

/**
 * удалить будильник из бд и отменить нотификашки
 */
const removeAlarm = async (id: string) => {
  await transactionBd(`delete from ${TABEL_NAME} where id = '${id}';`);
  await removeNotificationsByChanelId(id);
  return id;
};

/**
 * включить/выключить будильник
 */
const toggleAlarm = async (alarm: Alarm) => {
  const newDisable = !alarm?.disable;
  await transactionBd(
    `update ${TABEL_NAME} set disable = ${Number(newDisable)} where id = '${
      alarm.channelId
    }';`
  );
  if (newDisable) {
    await removeNotificationsByChanelId(alarm.channelId);
  } else {
    const [hh, mm] = alarm.time.split(":").map(Number);
    await createGroupNotificationsByChanelId({
      id: alarm.channelId,
      indexDays: alarm.days.map((x) => x.index),
      hh,
      mm,
    });
  }
};

/**
 * коллекция будильников
 */
export const $alarmList = createStore<Alarm[]>([]);

export const getAllAlarmsFx = createEffect({ handler: getAllAlarms });
$alarmList.on(getAllAlarmsFx.doneData, (_, x) => x);

export const addAlarmFx = createEffect({ handler: addAlarm });
sample({ clock: addAlarmFx.doneData, target: getAllAlarmsFx });

export const removeAlarmFx = createEffect({ handler: removeAlarm });
sample({ clock: removeAlarmFx.doneData, target: getAllAlarmsFx });

export const toggleAlarmFx = createEffect({ handler: toggleAlarm });
sample({ clock: toggleAlarmFx.doneData, target: getAllAlarmsFx });
