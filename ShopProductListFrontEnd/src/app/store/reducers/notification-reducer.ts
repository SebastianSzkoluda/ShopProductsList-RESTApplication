import * as notification from '../actions/notification-actions';
import {Notification} from '../../model/notification';


export interface NotificationReducerState {
  sendPending: boolean;
  sendFinish: boolean;
  sendFailed: boolean;
  accept: boolean;
  decline: boolean;
  removed: boolean;
  refresh: boolean;
  received: boolean;
  invitation: any;
  notification: Notification;
  notifications: Array<Notification>;
}

const initialState: NotificationReducerState = {
  sendPending: false,
  sendFinish: false,
  sendFailed: false,
  accept: false,
  decline: false,
  removed: false,
  refresh: false,
  received: false,
  invitation: null,
  notification: null,
  notifications: []
};

export function notificationReducer(state = initialState, action: notification.NotificationActionsUnion): NotificationReducerState {
  switch (action.type) {
    case notification.ACTION_INITIAL_NOTIFICATION:
      return {
        ...initialState,
      };
    case notification.ACTION_NOTIFICATION_SEND:
      return {
        ...state,
        sendPending: true,
        sendFinish: false,
        sendFailed: false,
        accept: false,
        decline: false,
        refresh: false,
        received: false,
        invitation: action.payload
      };
    case notification.ACTION_NOTIFICATION_SEND_SUCCESS:
      return {
        ...state,
        sendPending: false,
        sendFinish: true,
        sendFailed: false,
        accept: false,
        decline: false,
        refresh: false,
        received: false,
        invitation: action.payload
      };
    case notification.ACTION_NOTIFICATION_SEND_FAILED:
      return {
        ...state,
        sendPending: false,
        sendFinish: false,
        sendFailed: true,
        accept: false,
        decline: false,
        refresh: false,
        received: false,
        invitation: action.payload
      };
    case notification.ACTION_NOTIFICATION_ACCEPT:
      return {
        ...state,
        sendPending: false,
        accept: true,
        decline: false,
        refresh: false,
        received: false,
        notification: action.payload
      };
    case notification.ACTION_NOTIFICATION_DECLINE:
      return {
        ...state,
        sendPending: false,
        accept: false,
        decline: true,
        refresh: false,
        received: false,
        notification: action.payload
      };
    case notification.ACTION_NOTIFICATION_REMOVE_SUCCESS:
      return {
        ...state,
        sendPending: false,
        accept: false,
        decline: false,
        removed: true,
        refresh: false,
        received: false,
        notification: action.payload
      };
    case notification.ACTION_NOTIFICATIONS_REFRESH:
      return {
        ...state,
        sendPending: false,
        accept: false,
        decline: false,
        refresh: true,
        received: false,
      };
    case notification.ACTION_NOTIFICATIONS_RECEIVED:
      return {
        ...state,
        sendPending: false,
        accept: false,
        decline: false,
        refresh: false,
        received: true,
        notifications: action.payload
      };
    case notification.ACTION_NOTIFICATIONS_RECEIVED_FAILED:
      return {
        ...state,
        sendPending: false,
        accept: false,
        decline: false,
        refresh: false,
        received: false,
        notifications: action.payload
      };
  }
  return state;
}
