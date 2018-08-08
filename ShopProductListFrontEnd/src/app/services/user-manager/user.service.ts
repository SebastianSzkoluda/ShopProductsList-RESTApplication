import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  private loggedUser: string;
  private isLogged = false;

  private baseUrl = '/api/';
    constructor(private http: HttpClient) {}

    getUser(email: string): Observable < User > {
      const params = new HttpParams().set('email', email);
        return this.http.get < User > (this.baseUrl + 'user', {params: params});
    }

    getAllUsers(): Observable < User[] > {
      return this.http.get < User[] > (this.baseUrl + 'listAllUsers');
    }

    setLoggedUser(user: User): void {
      this.loggedUser = user.username;
      this.isLogged = user.isLogged;

    }

    getLoggedUser(): string {
      return this.loggedUser;
    }

    getIsLogged(): boolean {
      return this.isLogged;
    }

    logout(): void {
      this.isLogged = false;
    }

}
