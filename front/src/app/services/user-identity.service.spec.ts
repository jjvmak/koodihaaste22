import { TestBed } from '@angular/core/testing';
import { User } from '../models/user';

import { UserIdentityService } from './user-identity.service';

fdescribe('UserIdentityService', () => {
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
});

const user: User = {
  id: '1234',
  vote: {
    date: new Date('2022-01-01'),
    restaurantId: '1111',
    restaurantName: 'testi-ravinteli',
  },
};
