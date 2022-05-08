import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RestaurantDTO } from '../DTOs/restaurant-dto';
import { emptyUser, User } from '../models/user';
import { UserIdentityService } from '../services/user-identity.service';
import { VotingService } from '../services/voting.service';

import { RestaurantComponent } from './restaurant.component';

describe('RestaurantComponent', () => {
  let component: RestaurantComponent;
  let votingServiceSpy: jasmine.SpyObj<VotingService>;
  let identyServiceSpy: jasmine.SpyObj<UserIdentityService>;
  beforeEach(async () => {
    votingServiceSpy = jasmine.createSpyObj<VotingService>(['vote']);
    identyServiceSpy = jasmine.createSpyObj<UserIdentityService>([
      'notify',
      'currentUser$',
    ]);

    identyServiceSpy.currentUser$ = of(userWithVote);

    component = new RestaurantComponent(votingServiceSpy, identyServiceSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expand', () => {
    component.restaurant = openRestaurant;
    component.ngOnInit();
    expect(component.votingEnabled).toBeTruthy();
  });

  it('should collapse', () => {
    component.restaurant = closedRestaurant;
    component.ngOnInit();
    expect(component.votingEnabled).toBeFalse();
  });

  it('should have been voted', () => {
    component.restaurant = openRestaurant;
    component.ngOnInit();
    expect(component.restaurantVotedToday).toBeTrue();
  });
  it('should not have been voted', () => {
    component.restaurant = closedRestaurant;
    component.ngOnInit();
    expect(component.restaurantVotedToday).toBeFalse();
  });
});

const openRestaurant: RestaurantDTO = {
  id: '123',
  name: 'testi-ravinteli-1',
  openingHours: '10-20',
  votes: 1,
  dishes: [{ name: 'kalakeitto', price: '10e', attributes: [] }],
};

const closedRestaurant: RestaurantDTO = {
  id: '1234',
  name: 'testi-ravinteli-1',
  openingHours: '',
  votes: 1,
  dishes: [],
};

const userWithVote: User = {
  id: '1234',
  vote: {
    date: new Date(),
    restaurantId: '123',
    restaurantName: 'test',
  },
};

const userWithoutVote: User = emptyUser;
