import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpService as Http } from './http.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DocumentService {
  baseUrl = 'http://localhost:3000';

  constructor(private http: Http) { }

  getDocuments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/documents`)
      .map((res: Response) => res.json())
      .catch(this.errorHandler);
  }

  getDocument(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/documents/${id}`)
      .map((res: Response) => res.json())
      .catch(this.errorHandler);
  }

  createDocument(data: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/documents`, data)
      .map((res: Response) => res.json())
      .catch(this.errorHandler);
  }

  editDocument(id: number, data: Object): Promise<any> {
    return this.http.put(`${this.baseUrl}/documents/${id}`, data)
      .map((res: Response) => res.json())
      .toPromise();
  }

  deleteDocument(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/documents/${id}`)
      .map(res => res.json())
      .catch(this.errorHandler);
  }

  errorHandler(error) {
    return Observable.throw(error.json() || 'Server Error');
  }
}
