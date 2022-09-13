import { makeAutoObservable } from 'mobx';


export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    this._listUsers = [];
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }

  setUser(user) {
    this._user = user;
  }

  setListUsers(listUsers) {
    this._listUsers = listUsers;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }

  get listUsers() {
    return this._listUsers;
  }
}