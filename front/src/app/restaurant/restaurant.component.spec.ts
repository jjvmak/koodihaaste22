import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RestaurantDTO } from '../DTOs/restaurant-dto';
import { UserIdDTO } from '../DTOs/user-id-dto';
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
      'getIdentityFromCookie',
      'currentUser$',
      'getUserIdentyStore',
    ]);

    votingServiceSpy.vote.and.returnValue(of([]));

    identyServiceSpy.currentUser$ = of(userWithVote);
    identyServiceSpy.getIdentityFromCookie.and.returnValue(of(userIdDto));
    identyServiceSpy.getUserIdentyStore.and.returnValue(userWithVote);

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

  it('should have lunch', () => {
    const open = component.hasLunch(openRestaurant);
    expect(open).toBeTrue();
  });

  it('should not have lunch', () => {
    const open = component.hasLunch(closedRestaurant);
    expect(open).toBeFalse();
  });

  it('should create', () => {
    component.restaurant = openRestaurant;
    component.vote();
    expect(votingServiceSpy.vote).toHaveBeenCalledWith('123');
    expect(identyServiceSpy.notify).toHaveBeenCalled();
  });

  it('should be non valid dish with empty array', () => {
    const isValid = component.isValidDishes(closedRestaurant);
    expect(isValid).toBeFalse();
  });

  it('should be non valid dish with no name', () => {
    const isValid = component.isValidDishes(noDishName);
    expect(isValid).toBeFalse();
  });

  it('should be valid dish', () => {
    const isValid = component.isValidDishes(openRestaurant);
    expect(isValid).toBeTrue();
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

const noDishName: RestaurantDTO = {
  id: '1234',
  name: 'testi-ravinteli-1',
  openingHours: '',
  votes: 1,
  dishes: [
    {
      attributes: [],
      name: '',
      price: '',
    },
  ],
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

const userIdDto: UserIdDTO = {
  id: '112233',
};
