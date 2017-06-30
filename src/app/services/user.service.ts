import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpService as Http } from './http.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {
  baseUrl = 'http://localhost:3000';

  constructor(private http: Http) { }

  getUser(id): Observable<Response> {
    return this.http.get(`${this.baseUrl}/users/${id}`)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw(error.json || 'Server error'));
  }
}
