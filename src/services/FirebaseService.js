import Firebase from "./implements/Firebase";

export default class FirebaseService extends Firebase {

  constructor() {
    let rootPath = 'eaty';
    super(rootPath);
  }

  onUsers(callback) {
    this.onPath('users', 'value', callback);
  }

  onEaty(callback) {
    // this.onPath('eaty', 'value', callback);
    this.onPath('eaty', callback);
  }

  onChats(callback) {
    this.onPath('chats', callback);
  }

  onUsersBy(age = 0, callback) {
    let ref = this.ref('users');
    let query = ref.orderByChild('age').startAt(age);
    query.on('value', ...this.callbacks(callback));
  }

}
