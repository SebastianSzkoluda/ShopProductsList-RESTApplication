import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {Notification} from '../../../model/notification';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs/internal/Subscription';
import {interval} from 'rxjs/internal/observable/interval';
import {filter, startWith, withLatestFrom} from 'rxjs/operators';
import * as notification from '../../../store/actions/notification-actions';
import {selectLoggedIn} from '../../../store/reducers/index';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  private notoficationUrl = '/api/notification';

  constructor(private http: HttpClient, private store: Store<any>) {
  }

  getNotificationsForLoggedUser(): Observable<Array<Notification>> {
    return this.http.get<Array<Notification>>(this.notoficationUrl);
  }

  getAllState() {
    return this.store.pipe(select('notificationReducer'));
  }

  updateNotificationState(obj) {
    this.store.dispatch(
      {
        type: obj.action,
        payload: obj.payload
      }
    );
  }

  startIntervalPollingForNotifications(): Subscription {
    const loggedIn$ = this.store.pipe(select(selectLoggedIn));

    return interval(30000).pipe(
      startWith(0),
      withLatestFrom(loggedIn$),
      filter(([, loggedIn]) => loggedIn === true)
    ).subscribe(() => {
      this.store.dispatch({type: notification.ACTION_NOTIFICATIONS_REFRESH});
    });
  }
}

