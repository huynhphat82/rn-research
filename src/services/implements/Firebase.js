import database from '@react-native-firebase/database';
import RealtimeAbstract from "../contracts/RealtimeAbstract";

export default class Firebase extends RealtimeAbstract {

  rootPath = undefined;

  constructor(rootPath) {
    super();
    if (!this.db) {
      this.db = database;
    }
    this.rootPath = rootPath;
  }

  ref(path = undefined) {
    return this.db().ref(path);
  }

  on(event, callback) {
    if (this.isFn(event)) {
      callback = event;
      event = 'value';
    }
    this.validateFn(callback);
    this.ref(this.rootPath).on(event, ...this.callbacks(callback));
  }

  onPath(path, event, callback) {
    switch (arguments.length) {
      case 2:
        if (this.isFn(event)) {
          callback = event;
          event = 'value';
        }
        break;
      case 3: break;
      default: throw new Error('Only accept two or three arguments.');
    }
    this.validateFn(callback);
    this.ref(path).on(event || 'value', ...this.callbacks(callback));
  }

  off(event, callback) {
    this.ref(this.rootPath).off(event, callback);
  }

  offPath(path, event, callback) {
    switch (arguments.length) {
      case 2:
        if (this.isFn(event)) {
          callback = event;
          event = 'value';
        }
        break;
      case 3: break;
      default: throw new Error('Only accept two or three arguments.');
    }
    this.validateFn(callback);
    this.ref(path).off(event, callback);
  }

  validateFn(fn) {
    if (!this.isFn(fn)) {
      throw new Error('It is not be a function.');
    }
    return true;
  }

  isFn = (fn) => typeof fn === 'function';

  callbackSuccess(callback) {
    return (data) => {
      data = data.val();
      if (Array.isArray(data)) {
        data = data.filter(row => row !== null);
      }
      return callback(true, data);
    };
  }

  callbackError(callback) {
    return (err) => callback(false, err);
  }

  callbacks = (callback) => [
    this.callbackSuccess(callback),
    this.callbackError(callback),
  ];
}
