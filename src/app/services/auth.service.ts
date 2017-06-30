import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';
import { HttpService as Http } from './http.service';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {
  userId = null;
  userInfo;
  baseUrl = 'http://localhost:3000';
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http) { }

  /**
   * handles users login
   *
   * @param {Object} data
   * @return Response
   */
  login(data): Observable<Response> {
    const loginUrl = `${this.baseUrl}/login`;

    return this.http.post(loginUrl, data)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  /**
   * handles users signup
   *
   * @param {Object} data
   * @return Response
   */
  signUp(data): Observable<Response> {
    return this.http.post(`${this.baseUrl}/users`, data)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  /**
   * handles error if any
   *
   * @param  error
   */
  handleError(error: any) {
    return Observable.throw(error.json() || 'Server error');
  }

  /**
   * Decodes jwt
   */
  useJwtHelper() {
    const token = localStorage.getItem('token');
    this.userId = this.jwtHelper.decodeToken(token).userId;
  }

  /**
   * checks if the user is logged in
   *
   * @return {Boolean}
   */
  loggedIn() {
    if (!localStorage.getItem('token')) {
      return false;
    }
    return tokenNotExpired();
  }

  /**
   * Signs a user out of the app
   *
   * @return {Object}
   */
  logout() {
    return this.http.post(`${this.baseUrl}/logout`, {})
      .map(res => res.json())
      .catch(error => Observable.throw(error.json() || 'Server Error'));
  }

  getUserInfo() {
    return this.http.get(`${this.baseUrl}/users/${this.userId}`)
      .map(res => res.json())
      .catch(this.handleError);
  }
}
