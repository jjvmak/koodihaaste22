import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
  }
}
