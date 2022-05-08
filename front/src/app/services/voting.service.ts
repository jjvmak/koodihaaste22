import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UsedIdDTO } from '../DTOs/user-id-dto';
import { VotingResultDTO } from '../DTOs/voting-result-dto';

@Injectable({
  providedIn: 'root',
})
export class VotingService {
  voteUrl = `${environment.apiPath}vote/`;
  resultUrl = `${environment.apiPath}results`;

  constructor(private http: HttpClient) {}

  vote(restaurantId: string): Observable<any> {
    return this.http.post(`${this.voteUrl}${restaurantId}`, []);
  }

  getResults(): Observable<VotingResultDTO> {
    return this.http.get<VotingResultDTO>(this.resultUrl);
    // return of(fakeResults);
  }
}

const fakeResults: VotingResultDTO = {
  date: '2022-05-08',
  results: [
    { votes: 1, city: 'testi-1', name: 'Kurkkumopo', restaurantId: '1111' },
    { votes: 3, city: 'testi-1', name: 'Lyhyt', restaurantId: '2222' },
    {
      votes: 5,
      city: 'testi-1',
      name: 'Pitkä pitkä pitkä pitkä pitkä',
      restaurantId: '3333',
    },
    { votes: 6, city: 'testi-3', name: 'Keski pitkä', restaurantId: '4444' },
    { votes: 1, city: 'testi-3', name: 'A', restaurantId: '5555' },
    {
      votes: 3,
      city: 'testi-3',
      name: 'Joo joo ravinteli joo',
      restaurantId: '6666',
    },
  ],
};
