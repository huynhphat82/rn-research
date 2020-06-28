export default class RealtimeAbstract {
  db = null;
  on(event = 'value', callback = () => {}) {
    throw new Error('This method has not been implemented yet.');
  }
  off(event = 'value', callback = () => {}) {
    throw new Error('This method has not been implemented yet.');
  }
}
