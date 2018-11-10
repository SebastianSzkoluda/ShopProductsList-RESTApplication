import {Action} from '@ngrx/store';

export const ACTION_NOTIFICATION_SEND = 'SEND_NOTIFICATION_PENDING';
export const ACTION_NOTIFICATION_SEND_SUCCESS = 'SEND_NOTIFICATION_SUCCESS';
export const ACTION_NOTIFICATION_SEND_FAILED = 'SEND_NOTIFICATION_FAILED';
export const ACTION_NOTIFICATION_ACCEPT = 'ACCEPT_NOTIFICATION';
export const ACTION_NOTIFICATION_DECLINE = 'DECLINE_NOTIFICATION';
export const ACTION_NOTIFICATION_REMOVE_SUCCESS = 'REMOVE_NOTIFICATION_SUCCESS';
export const ACTION_NOTIFICATIONS_REFRESH = 'REFRESH_NOTIFICATIONS';
export const ACTION_NOTIFICATIONS_RECEIVED = 'RECEIVED_NOTIFICATIONS';
export const ACTION_NOTIFICATIONS_RECEIVED_FAILED = 'RECEIVED_NOTIFICATIONS_FAILED';
export const ACTION_INITIAL_NOTIFICATION = 'NOTIFICATION_INITIAL_STATE';

export class SendNotificationAction implements Action {
  readonly type = ACTION_NOTIFICATION_SEND;

  constructor(public payload: any) {
  }
}

export class SendNotificationSuccessAction implements Action {
  readonly type = ACTION_NOTIFICATION_SEND_SUCCESS;

  constructor(public payload: any) {
  }
}

export class SendNotificationFailedAction implements Action {
  readonly type = ACTION_NOTIFICATION_SEND_FAILED;

  constructor(public payload: any) {
  }
}

export class AcceptNotificationAction implements Action {
  readonly type = ACTION_NOTIFICATION_ACCEPT;

  constructor(public payload: any) {
  }
}

export class DeclineNotificationAction implements Action {
  readonly type = ACTION_NOTIFICATION_DECLINE;

  constructor(public payload: any) {
  }
}

export class RemoveNotificationSuccessAction implements Action {
  readonly type = ACTION_NOTIFICATION_REMOVE_SUCCESS;

  constructor(public payload: any) {
  }
}

export class RefreshNotificationAction implements Action {
  readonly type = ACTION_NOTIFICATIONS_REFRESH;

  constructor(public payload: any) {
  }
}

export class ReceivedNotificationAction implements Action {
  readonly type = ACTION_NOTIFICATIONS_RECEIVED;

  constructor(public payload: any) {
  }
}

export class ReceivedNotificationFailedAction implements Action {
  readonly type = ACTION_NOTIFICATIONS_RECEIVED_FAILED;

  constructor(public payload: any) {
  }
}

export class InitialNotificationAction implements Action {
  readonly type = ACTION_INITIAL_NOTIFICATION;

  constructor() {
  }
}

export type NotificationActionsUnion
  = SendNotificationAction
  | SendNotificationSuccessAction
  | SendNotificationFailedAction
  | AcceptNotificationAction
  | DeclineNotificationAction
  | RemoveNotificationSuccessAction
  | RefreshNotificationAction
  | ReceivedNotificationAction
  | ReceivedNotificationFailedAction
  | InitialNotificationAction;
