import messaging from '@react-native-firebase/messaging';
import PushNotificationAbstract from '../contracts/PushNotificationAbstract';

export default class PushNotificationFirebase extends PushNotificationAbstract {

  constructor() {
    super();
    if (!this.model) {
      this.model = messaging();
    }
  }

  responseJson(response, ok = true) {
    return {
      success: ok === true,
      error_message: ok === false ? response.error_message : null,
      notification: response.notification,
      data: response.data,
    };
  }

  isFn(fn) {
    return typeof fn === 'function';
  }

  /**
   * @implements
   *
   * Request permission
   */
  async requestPermission(callback) {
    try {
      let registerNotification = await this.model.registerForRemoteNotifications();
      console.log('registerNotification => ', registerNotification);
      let authorization = await this.model.requestPermission();
      console.log('authorization => ', authorization);
      return this.isFn(callback) ? callback(!!authorization, authorization) : !!authorization;
    } catch (err) {
      return this.isFn(callback) ? callback(false, err) : false;
    }
  }

  /**
   * @implements
   *
   * Get device token
   */
  async getToken(callback) {
    try {
      let token = await this.model.getToken();
      console.log('token => ', token);
      return this.isFn(callback) ? callback(true, token) : token;
    } catch (err) {
      return this.isFn(callback) ? callback(false, err) : false;
    }
  }

  /**
   * @implements
   *
   * Handle the remote message when app in quit state
   */
  async onNotificationQuit(callback) {
    try {
      let remoteMessage = await this.model.getInitialNotification();
      return this.isFn(callback) ? callback(true, remoteMessage) : remoteMessage;
    } catch (err) {
      return this.isFn(callback) ? callback(false, err) : false;
    }
  }

  /**
   * @implements
   *
   * Handle the remote message when app in background state
   */
  async onNotificationBackground(callback = () => {}) {
    try {
      let unsubscribe = this.model.onNotificationOpenedApp(async remoteMessage => {
        console.log('onNotificationBackground => ', remoteMessage);
        callback(true, remoteMessage, unsubscribe);
      });
    } catch (err) {
      callback(false, err);
    }
  }

  /**
   * @implements
   *
   * Handle the remote message when app in foreground state
   */
  async onNotificationForeground(callback = () => {}) {
    try {
      let unsubscribe = this.model.onMessage(async remoteMessage => {
        console.log('onNotificationForeground => ', remoteMessage);
        callback(true, remoteMessage, unsubscribe);
      });
    } catch (err) {
      callback(false, err);
    }
  }

  /**
   * @implements
   *
   * Handle the remote message when app in background or quit state
   */
  async handleBackgroundAndQuit(callback = () => {}) {
    try {
      let unsubscribe = this.model.setBackgroundMessageHandler(async remoteMessage => {
        console.log('handleBackgroundAndQuit => ', remoteMessage);
        callback(true, remoteMessage, unsubscribe);
      });
    } catch (err) {
      callback(false, err);
    }
  }
}
