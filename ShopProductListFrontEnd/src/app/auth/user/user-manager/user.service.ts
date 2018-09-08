import { Injectable } from '@angular/core';
import {FamilyUser} from '../../../model/family-user';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = '/api/';
  constructor(private http: HttpClient, private store: Store<any>) { }

  getUser(email: string): Observable < FamilyUser > {
    const params = new HttpParams().set('email', email);
    return this.http.get < FamilyUser > (this.baseUrl + 'user', {params: params});
  }

  getAllUsers(): Observable < FamilyUser[] > {
    return this.http.get < FamilyUser[] > (this.baseUrl + 'listAllUsers');
  }
  getAllState() {
    return this.store.select('userReducer');
  }
  updateUserState(obj) {
    this.store.dispatch(
      {
        type: obj.action,
        payload: obj.payload
      }
    );
  }
}
