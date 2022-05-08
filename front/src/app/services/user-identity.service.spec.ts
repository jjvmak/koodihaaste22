import { TestBed } from '@angular/core/testing';
import { User } from '../models/user';

import { UserIdentityService } from './user-identity.service';

describe('UserIdentityService', () => {
  let service: UserIdentityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserIdentityService);
  });

  afterEach(() => {
    service.removeItem('1234');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store user', () => {
    service.setUserSession(user);
    const keys = service.getSessionItemkeys();
    expect(keys).toEqual(['1234']);
  });

  it('should get user typed item', () => {
    service.setUserSession(user);
    const identity = service.getUserIdenty('1234');
    expect(identity).toEqual(user);
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
