import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import {LoginUser} from './loginUser';
import {AuthToken} from '../../token/authToken';
import {FamilyUser} from './familyUser';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  private helper = new JwtHelperService();
  private loggedUser: string;
  private isLogged = false;

  private baseUrl = '/api/user/';
  private tokenUrl = '/api/token/';
    constructor(private http: HttpClient) {}

    getUser(email: string): Observable < FamilyUser > {
      const params = new HttpParams().set('email', email);
        return this.http.get < FamilyUser > (this.baseUrl + 'user', {params: params});
    }

    getAllUsers(): Observable < FamilyUser[] > {
      return this.http.get < FamilyUser[] > (this.baseUrl + 'listAllUsers');
    }
    login(loginUser: LoginUser): Observable < AuthToken > {
      return this.http.post < AuthToken > (this.tokenUrl + 'generate-token', loginUser).pipe(map(value => {
        const decodedUser = this.helper.decodeToken(value.token);
      if (value) {
        sessionStorage.setItem('currentUser', decodedUser.sub);
      }
      return value; }));
    }
    register(familyUser: FamilyUser): Observable < FamilyUser > {
     return this.http.post< FamilyUser >(this.baseUrl + 'signup', familyUser);
    }

}
