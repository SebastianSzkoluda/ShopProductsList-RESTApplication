import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import {Actions, Effect, ofType } from '@ngrx/effects';
import {Observable} from 'rxjs/internal/Observable';
import {debounceTime, map, switchMap} from 'rxjs/operators';
import * as notification from '../actions/notification-actions';
import {NotificationService} from '../../page-content/notification/notification-manager/notification.service';

@Injectable()
export class NotificationEffects {

  constructor(private actions$: Actions,private notificationService: NotificationService) {}

  @Effect()
  loadAllNotifications$: Observable<Action> = this.actions$
    .pipe(
      ofType(notification.ACTION_NOTIFICATIONS_REFRESH),
      debounceTime(300),
      switchMap(() => {
        return this.notificationService.getNotificationsForLoggedUser()
          .pipe(map(notifications => {
            if(notifications.length > 0) {
              return new notification.ReceivedNotificationAction(notifications);
            } else {
              return new notification.ReceivedNotificationAction([]);
            }
          }))
      }))
}
