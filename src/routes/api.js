const API_HOST = '';
const API_PREFIX = 'api';

const trimSlash = (s) => s.trim().split('/').filter(_ => _ !== '').join('/');

const url = (_url) => API_HOST + '/' + API_PREFIX + '/' + trimSlash(_url);

export const ApiRoute = {
  USERS: url('consumer/users'),
  USER_DETAIL: (id) => url(`consumer/users/${id}`),
};
