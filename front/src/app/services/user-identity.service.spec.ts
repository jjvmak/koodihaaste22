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
    service.removeItem('1234');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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
