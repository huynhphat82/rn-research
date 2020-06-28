export default class PushNotificationAbstract {

  model = null;

  requestPermission() {
    throw new Error('This method has not been implemented yet.');
  }

  getToken() {
    throw new Error('This method has not been implemented yet.');
  }

  onNotificationQuit() {
    throw new Error('This method has not been implemented yet.');
  }

  onNotificationBackground() {
    throw new Error('This method has not been implemented yet.');
  }

  onNotificationForeground() {
    throw new Error('This method has not been implemented yet.');
  }

  handleBackgroundAndQuit() {
    throw new Error('This method has not been implemented yet.');
  }
}
