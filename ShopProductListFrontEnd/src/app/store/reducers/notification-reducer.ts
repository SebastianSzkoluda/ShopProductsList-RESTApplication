import * as notification from '../actions/notification-actions';
import {Notification} from '../../model/notification';


export interface NotificationReducerState {
  create: boolean;
  accept: boolean;
  decline: boolean;
  refresh: boolean;
  received: boolean;
  notification: Notification;
  notifications: Array<Notification>;
}

const initialState: NotificationReducerState = {
  create: false,
  accept: false,
  decline: false,
  refresh: false,
  received: false,
  notification: null,
  notifications: []
};

export function notificationReducer(state = initialState, action: notification.NotificationActionsUnion): NotificationReducerState {
  switch (action.type) {
    case notification.ACTION_INITIAL_NOTIFICATION:
      return {
        ...initialState,
      };
    case notification.ACTION_NOTIFICATION_CREATE:
      return {
        ...state,
        create: true,
        accept: false,
        decline: false,
        refresh: false,
        received: false,
        notification: action.payload
      };
    case notification.ACTION_NOTIFICATION_ACCEPT:
      return {
        ...state,
        create: false,
        accept: true,
        decline: false,
        refresh: false,
        received: false,
        notification: action.payload
      };
    case notification.ACTION_NOTIFICATION_DECLINE:
      return {
        ...state,
        create: false,
        accept: false,
        decline: true,
        refresh: false,
        received: false,
        notification: action.payload
      };
    case notification.ACTION_NOTIFICATIONS_REFRESH:
      return {
        ...state,
        create: false,
        accept: false,
        decline: false,
        refresh: true,
        received: false,
      };
    case notification.ACTION_NOTIFICATIONS_RECEIVED:
      return {
        ...state,
        create: false,
        accept: false,
        decline: false,
        refresh: false,
        received: true,
        notifications: action.payload
      };
  }
  return state;
}
