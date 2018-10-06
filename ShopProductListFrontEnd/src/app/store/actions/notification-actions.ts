import {Action} from '@ngrx/store';

export const ACTION_NOTIFICATION_CREATE = 'ACTION_NOTIFICATION_CREATE';
export const ACTION_NOTIFICATION_ACCEPT = 'ACCEPT_NOTIFICATION';
export const ACTION_NOTIFICATION_DECLINE = 'DECLINE_NOTIFICATION';
export const ACTION_NOTIFICATIONS_REFRESH = 'REFRESH_NOTIFICATIONS';
export const ACTION_NOTIFICATIONS_RECEIVED = 'RECEIVED_NOTIFICATIONS';
export const ACTION_INITIAL_NOTIFICATION = 'NOTIFICATION_INITIAL_STATE';

export class CreateNotificationAction implements Action {
  readonly type = ACTION_NOTIFICATION_CREATE;

  constructor(public payload: any) { }
}
export class AcceptNotificationAction implements Action {
  readonly type = ACTION_NOTIFICATION_ACCEPT;

  constructor(public payload: any) { }
}
export class DeclineNotificationAction implements Action {
  readonly type = ACTION_NOTIFICATION_DECLINE;

  constructor(public payload: any) { }
}
export class RefreshNotificationAction implements Action {
  readonly type = ACTION_NOTIFICATIONS_REFRESH;

  constructor(public payload: any) { }
}
export class ReceivedNotificationAction implements Action {
  readonly type = ACTION_NOTIFICATIONS_RECEIVED;

  constructor(public payload: any) { }
}
export class InitialNotificationAction implements Action {
  readonly type = ACTION_INITIAL_NOTIFICATION;

  constructor(public payload: any) { }
}

export type NotificationActionsUnion
  = CreateNotificationAction
  | AcceptNotificationAction
  | DeclineNotificationAction
  | RefreshNotificationAction
  | ReceivedNotificationAction
  | InitialNotificationAction;
