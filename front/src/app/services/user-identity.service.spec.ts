import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from '../models/user';

import { UserIdentityService } from './user-identity.service';

describe('UserIdentityService', () => {
  let service: UserIdentityService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(UserIdentityService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    service.removeItem();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have only one session stored', () => {
    service.notify(oldUser); // This should be removed and represents some old session
    service.notify(user);
    const sessions = service.getSessionItemkeys();
    expect(sessions.length).toBe(1);
    const currentUserSession = service.getUserIdentyStore();
    expect(currentUserSession).toEqual(user);
  });
});

const user: User = {
  id: '1234',
  vote: {
    date: new Date('2022-01-01'),
    restaurantId: '1111',
    restaurantName: 'testi-ravinteli',
  },
};

const oldUser: User = {
  id: '4444',
  vote: {
    date: new Date('2022-01-01'),
    restaurantId: '1111',
    restaurantName: 'testi-ravinteli',
  },
};
