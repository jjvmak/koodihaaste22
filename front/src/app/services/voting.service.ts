import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VotingService {
  url = `${environment.apiPath}vote/`;

  constructor(private http: HttpClient) {}

  vote(restaurantId: string): Observable<any> {
    return this.http.post(`${this.url}${restaurantId}`, []);
  }
}
