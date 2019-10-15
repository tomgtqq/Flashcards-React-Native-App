import { AsyncStorage } from "react-native";
import { Notifications } from "expo";
import { getInitialData } from "./_DATA"
import * as Permissions from 'expo-permissions'

const DECKS_STORAGE_KEY = "MobileFlashCards:Decks";
const STUDY_REMINDER_KEY = "MobileFlashCards:Reminder";

export async function getDecks() {
  let data = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
  if(data === null){
    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(getInitialData()));
    data = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
  }

  return JSON.parse(data);
}

export async function saveNewDeck ( newDeck ) {
  await AsyncStorage.mergeItem( DECKS_STORAGE_KEY, JSON.stringify(newDeck) );
}

export async function saveCardToDeck( deckTitle, newCard ) {

  const data = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

  const decks = JSON.parse(data);

  decks[deckTitle] = {
    ...decks[deckTitle],
    questions: [...decks[deckTitle].questions, newCard]
  };

  await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
}

export async function clearQuizTimeNotification() {

  await AsyncStorage.removeItem(STUDY_REMINDER_KEY);
  Notifications.cancelAllScheduledNotificationsAsync();
}

export async function setQuizTimeNotification() {

  const dataRaw = await AsyncStorage.getItem(STUDY_REMINDER_KEY);
  const data = JSON.parse(dataRaw);

  if (data === null) {

    const permissionsNotifications = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (permissionsNotifications.status === "granted") {

      Notifications.cancelAllScheduledNotificationsAsync();

      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(13);
      tomorrow.setMinutes(40);

      Notifications.scheduleLocalNotificationAsync(notification(), {
        time: tomorrow,
        repeat: "day"
      });

      AsyncStorage.setItem(STUDY_REMINDER_KEY, JSON.stringify(true));
    }
  }

  function notification() {

    return {
      title: "mobile-flashcards",
      body: "Study Time!",
      android: {
        priority: "high",
        sound: false,
        sticky: false,
        vibrate: false
      }
    };
  }
}