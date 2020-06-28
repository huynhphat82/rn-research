import FirebaseService from "./FirebaseService";
import PushNotificationFirebase from "./implements/PushNotificationFirebase";

export const RealtimeService = new FirebaseService();

export const PushNotificationService = new PushNotificationFirebase();

export default {
  RealtimeService,
  PushNotificationService,
};
