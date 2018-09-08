import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginUser} from '../../model/login-user';
import {AuthToken} from '../../model/auth-token';
import {FamilyUser} from '../../model/family-user';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Store} from '@ngrx/store';

@Injectable()
export class AuthService {

  private helper = new JwtHelperService();

  private baseUrl = '/api/user/';
  private tokenUrl = '/api/token/';
    constructor(private http: HttpClient, private store: Store<any>) {}

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
        console.log(decodedUser);
        if (value) {
        sessionStorage.setItem('currentUser', decodedUser.sub);
      }
      return value; }));
    }
    register(familyUser: FamilyUser): Observable < FamilyUser > {
     return this.http.post< FamilyUser >(this.baseUrl + 'signup', familyUser);
    }
    getAllState() {
      return this.store.select('appReducer');
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
