import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {Notification} from '../../../model/notification';
import {createFeatureSelector, createSelector, select, State, Store} from '@ngrx/store';
import {UserReducerState} from '../../../store/reducers/user-reducer';
import {Subscription} from 'rxjs/internal/Subscription';
import {interval} from 'rxjs/internal/observable/interval';
import {filter, map, withLatestFrom} from 'rxjs/operators';
import {ACTION_NOTIFICATIONS_REFRESH} from '../../../store/actions/notification-actions';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  private notoficationUrl = '/api/notification';
  constructor(private http: HttpClient, private store: Store<any>) { }

  getNotificationsForLoggedUser(): Observable<Array<Notification>> {
    return this.http.get< Array<Notification> >(this.notoficationUrl);
  }

  getAllState() {
    return this.store.select('notificationReducer');
  }
  updateNotificationState(obj) {
    this.store.dispatch(
      {
        type: obj.action,
        payload: obj.payload
      }
    );
  }
  startIntervalPolling(): Subscription {
    // const loggedIn$ = this.store.pipe(select(selectLoggedIn));

    return interval(30000).pipe(
      // withLatestFrom(loggedIn$),
      // filter(([,loggedIn]) => loggedIn === true)
    ).subscribe(() => {
      this.store.dispatch({type: ACTION_NOTIFICATIONS_REFRESH})
    })
  }
}

export const selectLoginState = createFeatureSelector<UserReducerState>('login');

export const selectLoggedIn = createSelector(
  selectLoginState, (state: UserReducerState) => state.login
);
