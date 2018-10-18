import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs/internal/Observable';
import {debounceTime, map, switchMap} from 'rxjs/operators';
import {AuthService} from '../../auth/auth-manager/auth.service';
import * as auth from '../actions/auth-actions'

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private authService: AuthService) {
  }

  @Effect()
  renewToken$: Observable<Action> = this.actions$
    .pipe(
      ofType(auth.ACTION_RENEW_TOKEN),
      debounceTime(300),
      switchMap(() => {
        return this.authService.renewToken(localStorage.getItem('currentUser'))
          .pipe(map(value => {
            console.log('dotarlem')
            if (value.token.length > 0) {
              return new auth.ReceivedTokenAction(value.token)
            } else {
              return new auth.ReceivedTokenAction(null)
            }
          }));
      }));
}
