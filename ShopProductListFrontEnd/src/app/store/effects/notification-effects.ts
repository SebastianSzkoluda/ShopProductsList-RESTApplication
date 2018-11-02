import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, debounceTime, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import * as notification from '../actions/notification-actions';
import {
  ReceivedNotificationFailedAction,
  RemoveNotificationSuccessAction,
  SendNotificationFailedAction,
  SendNotificationSuccessAction
} from '../actions/notification-actions';
import {NotificationService} from '../../page-content/notification/notification-manager/notification.service';
import {of} from 'rxjs/internal/observable/of';
import {UserService} from '../../user/user-manager/user.service';
import {selectInvitation, selectNotification} from '../reducers';
import {NzMessageService} from 'ng-zorro-antd';

@Injectable()
export class NotificationEffects {

  constructor(private actions$: Actions,
              private notificationService: NotificationService,
              private userService: UserService,
              private store: Store<any>,
              private message: NzMessageService) {
  }

  @Effect()
  loadAllNotifications$: Observable<Action> = this.actions$
    .pipe(
      ofType(notification.ACTION_NOTIFICATIONS_REFRESH),
      debounceTime(300),
      switchMap(() => {
        return this.notificationService.getNotificationsForLoggedUser()
          .pipe(map(notifications => {
            if (notifications.length > 0) {
              return new notification.ReceivedNotificationAction(notifications);
            } else {
              return new notification.ReceivedNotificationAction([]);
            }
          }), catchError(() => of(new ReceivedNotificationFailedAction(null))));
      }));

  @Effect()
  sendInviteToFamily$: Observable<Action> = this.actions$
    .pipe(
      ofType(notification.ACTION_NOTIFICATION_SEND),
      debounceTime(300),
      withLatestFrom(this.store.pipe(select(selectInvitation))),
      switchMap(([, invitation]) => {
        return this.userService.sendInviteToFamily(invitation.familyId, invitation.invitedUser)
          .pipe(map(() => new SendNotificationSuccessAction(invitation))
            ,catchError(() => of(new SendNotificationFailedAction({familyId: null,invitedUser: null}))));
      }));

  @Effect()
  declineInviteToFamily$: Observable<Action> = this.actions$
    .pipe(
      ofType(notification.ACTION_NOTIFICATION_DECLINE),
      debounceTime(300),
      withLatestFrom(this.store.pipe(select(selectNotification))),
      switchMap(([, notification]) => {
        return this.userService.declineInviteToFamily(notification)
          .pipe(map(() => new RemoveNotificationSuccessAction(null)));
      }));

  @Effect()
  acceptInviteToFamily$: Observable<Action> = this.actions$
    .pipe(
      ofType(notification.ACTION_NOTIFICATION_ACCEPT),
      debounceTime(300),
      withLatestFrom(this.store.pipe(select(selectNotification))),
      switchMap(([, notification]) => {
        return this.userService.acceptInviteToFamily(notification)
          .pipe(map(() => new RemoveNotificationSuccessAction(null)));
      }));

  @Effect({dispatch: false})
  notificationSendSuccessMessage$ = this.actions$
    .pipe(
      ofType(notification.ACTION_NOTIFICATION_SEND_SUCCESS),
      debounceTime(300),
      tap(() => {
        return this.message.create('success', 'Invite sent successfully!');
      })
    );

  @Effect({dispatch: false})
  notificationSendFailedMessage$ = this.actions$
    .pipe(
      ofType(notification.ACTION_NOTIFICATION_SEND_FAILED),
      debounceTime(300),
      tap(() => {
        return this.message.create('error', 'Somethig goes wrong! Maybe this user is in your family, or your input is incorrect?');
      })
    );
}
