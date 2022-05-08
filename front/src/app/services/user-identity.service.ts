import { Injectable } from '@angular/core';
import { emptyUser, User } from '../models/user';
import { stringifyUser } from '../utils/user-functions';
import * as O from 'fp-ts/Option';

@Injectable({
  providedIn: 'root',
})
export class UserIdentityService {
  constructor() {}

  doesCookieAndIdentityMatch(): void {
    const cookies = document.cookie.split(',');
  }

  setUserSession(user: User): void {
    window.localStorage.setItem(user.id, stringifyUser(user));
  }

  getSessionItemkeys(): string[] {
    return Object.keys({ ...window.localStorage });
  }

  getUserIdenty(key: string): User {
    const item = O.fromNullable(window.localStorage.getItem(key));
    const user = this.toUser(item);
    return user;
  }

  removeItem(key: string): void {
    window.localStorage.removeItem(key);
  }

  private toUser = O.fold(
    () => emptyUser,
    (user: string) => {
      const parsed: User = JSON.parse(user);
      parsed.vote.date = new Date(parsed.vote.date);
      return parsed;
    }
  );
}
