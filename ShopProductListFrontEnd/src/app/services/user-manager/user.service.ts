import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from './user';

@Injectable()
export class UserService {

  private baseUrl = '/api/';
    constructor(private http: HttpClient) {}

    getUser(email: string): Observable < User > {
      const params = new HttpParams().set('email', email)
        return this.http.get < User > (this.baseUrl + 'user',{params: params});
    }

    getAllUsers(): Observable < User[] > {
      return this.http.get < User[] > (this.baseUrl + 'listAllUsers');
    }

}
