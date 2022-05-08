import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { VotingResultDTO } from '../DTOs/voting-result-dto';

import { VotingService } from './voting.service';

describe('VotingService', () => {
  let service: VotingService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(VotingService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get voting results', () => {
    expect(service).toBeTruthy();
    let result: VotingResultDTO | undefined;
    service.getResults().subscribe((value) => (result = value));
    httpTestingController.expectOne(service.resultUrl).flush(votingResult);
    expect(result).toEqual(votingResult);
  });
});

const votingResult: VotingResultDTO = {
  date: '2022-05-08',
  results: [
    { votes: 1, city: 'testi-1', name: 'ravinteli-1', restaurantId: '1234' },
    { votes: 3, city: 'testi-1', name: 'ravinteli-2', restaurantId: '4444' },
  ],
};
