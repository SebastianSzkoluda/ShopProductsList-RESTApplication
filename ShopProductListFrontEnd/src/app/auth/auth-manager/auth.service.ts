import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginUser} from '../../model/login-user';
import {AuthToken} from '../../model/auth-token';
import {FamilyUser} from '../../model/family-user';
import {filter, map, startWith, withLatestFrom} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {select, Store} from '@ngrx/store';
import {interval} from 'rxjs/internal/observable/interval';
import * as auth from '../../store/actions/auth-actions';
import {selectLoggedIn} from '../../store/reducers';
import {Subscription} from 'rxjs/internal/Subscription';
import {TokenStorage} from '../token/token.storage';
import {decode} from 'punycode';
import {ACTION_LOGGEDIN} from '../../store/actions/auth-actions';

@Injectable()
export class AuthService {

  private helper = new JwtHelperService();

  private authUrl = '/api/auth/';

  constructor(private http: HttpClient,
              private token: TokenStorage,
              private store: Store<any>) {
  }

  login(loginUser: LoginUser): Observable<AuthToken> {
    return this.http.post <AuthToken>(this.authUrl + 'generateToken', loginUser).pipe(map(value => {

      const decodedToken = this.decodeToken(value.token);
      this.updateUserState({
        action: ACTION_LOGGEDIN,
        payload: decodedToken
      });
      return value;
    }));
  }

  renewToken(username: string) : Observable<AuthToken> {
    return this.http.post <AuthToken>(this.authUrl + 'renewToken', username).pipe(map(value => {
      return value;
    }));
  }

  decodeToken(token: string) {
    this.token.saveToken(token);
    const decodedToken = this.helper.decodeToken(token);
    console.log(decodedToken);
    if (decodedToken !== null) {
      localStorage.setItem('currentUser', decodedToken.sub);
      localStorage.setItem('token', JSON.stringify(decodedToken));
    }
    return decodedToken;
  }


  register(familyUser: FamilyUser): Observable<FamilyUser> {
    return this.http.post<FamilyUser>(this.authUrl + 'register', familyUser);
  }

  getAllState() {
    return this.store.pipe(select('authReducer'));
  }

  updateUserState(obj) {
    this.store.dispatch(
      {
        type: obj.action,
        payload: obj.payload
      }
    );
  }

  startIntervalPollingForRenewToken(): Subscription {
    const loggedIn$ = this.store.pipe(select(selectLoggedIn));

    return interval(((5 * 60 * 60) - 2) * 1000).pipe(
      startWith(0),
      withLatestFrom(loggedIn$),
      filter(([, loggedIn]) => loggedIn === true)
    ).subscribe(() => {
      this.store.dispatch({type: auth.ACTION_RENEW_TOKEN});
    });
  }
}
