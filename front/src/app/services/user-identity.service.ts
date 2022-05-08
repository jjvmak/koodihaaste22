import { Injectable } from '@angular/core';
import { emptyUser, User } from '../models/user';
import { stringifyUser } from '../utils/user-functions';
import * as O from 'fp-ts/Option';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsedIdDTO } from '../DTOs/user-id-dto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserIdentityService {
  private currentUser = new BehaviorSubject<User>(emptyUser);
  currentUser$: Observable<User> = this.currentUser.asObservable();
  identityUrl = `${environment.apiPath}identity`;
  constructor(private http: HttpClient) {}

  getIdentityFromCookie(): Observable<UsedIdDTO> {
    return this.http.get<UsedIdDTO>(this.identityUrl);
  }

  notify(user: User): void {
    const id = user.id ?? '';
    // If the current user id and new user id don't match
    // remove the old session.
    const currentUserSessionId = this.getUserIdentyStore(id).id;
    if (id !== currentUserSessionId) {
      this.removeItem(currentUserSessionId);
    }
    this.setUserSession(user);
    this.currentUser.next(user);
  }

  getUserIdentyStore(key: string): User {
    const item = O.fromNullable(window.localStorage.getItem(key));
    const user = this.toUser(item);
    return user;
  }

  private setUserSession(user: User): void {
    window.localStorage.setItem(user.id, stringifyUser(user));
  }

  private getSessionItemkeys(): string[] {
    return Object.keys({ ...window.localStorage });
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
