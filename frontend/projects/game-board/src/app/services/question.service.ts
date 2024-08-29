import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  apiRoot: string = 'https://opentdb.com/api.php?amount=1';
  constructor(private http: HttpClient) {}

  getQuestion(): Observable<any> {
    return this.http.get(this.apiRoot);
  }
}
