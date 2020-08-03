const _datetimeStr = (dateSeparator = '-', timeSeparator = ':') => {
  let o = new Date();
  let padZero = (n) => (n > 0 && n < 10 ? '0' + n : n + '');
  var hour = o.getHours() - (o.getHours() >= 12 ? 12 : 0);
  return [
    [padZero(o.getDate()), padZero(o.getMonth() + 1), o.getFullYear()].join(dateSeparator),
    [padZero(hour), padZero(o.getMinutes()), padZero(o.getSeconds()), padZero(o.getMilliseconds())].join(timeSeparator),
    o.getHours() >= 12 ? 'PM' : 'AM',
  ].join(' ');
};

const _log = (type = 'log', args = []) => {
  __DEV__ && console[type] && console[type](...args);
};

const _toArray = obj => Array.prototype.slice.call(obj);

const Log = {};

Log.info = function () {
  _log('info', _toArray(arguments));
};

Log.warn = function () {
  _log('warn', _toArray(arguments));
};

Log.error = function () {
  _log('error', _toArray(arguments));
};

Log.track = function () {
  this.info('[' + _datetimeStr() + ']', ..._toArray(arguments));
};

export default Log;
