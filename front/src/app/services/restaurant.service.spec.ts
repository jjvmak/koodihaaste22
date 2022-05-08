import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { RestaurantService } from './restaurant.service';
import { HttpClient } from '@angular/common/http';
import { RestaurantDTO } from '../DTOs/restaurant-dto';
import { RestaurantResponseDTO } from '../DTOs/restaurant-response-dto';

describe('RestaurantService', () => {
  let service: RestaurantService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(RestaurantService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get restaurants', () => {
    let result: RestaurantResponseDTO | undefined;
    service
      .getRestaurants('testikaupunki')
      .subscribe((value) => (result = value));
    httpTestingController
      .expectOne(`${service.url}testikaupunki`)
      .flush(restaurantResponse);
    expect(result).toEqual(restaurantResponse);
  });
});

const restaurants: RestaurantDTO[] = [
  {
    id: '123',
    name: 'testi-ravinteli-1',
    openingHours: '10-20',
    votes: 1,
    dishes: [{ name: 'kalakeitto', price: '10e', attributes: [] }],
  },
  {
    id: '456',
    name: 'testi-ravinteli-2',
    openingHours: '9-20',
    votes: 1,
    dishes: [{ name: 'purilainen', price: '12e', attributes: ['on hyvä'] }],
  },
];

const restaurantResponse: RestaurantResponseDTO = {
  alreadyVoted: '',
  date: '2022-05-07',
  restaurants: restaurants,
};
