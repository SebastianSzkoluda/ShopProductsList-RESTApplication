import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginUser} from '../../model/login-user';
import {AuthToken} from '../../model/auth-token';
import {FamilyUser} from '../../model/family-user';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  private helper = new JwtHelperService();

  private tokenUrl = '/api/token/';
  private baseUrl = '/api/user/';
    constructor(private http: HttpClient) {}
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

}
