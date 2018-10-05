import { Component, OnInit } from '@angular/core';
import {NotificationService} from './notification-manager/notification.service';
import {Notification} from '../../model/notification';
import {UserService} from '../../auth/user/user-manager/user.service';
import {ACTION_CREATE} from '../../store/actions/family-actions';
import {FamilyService} from '../../family/family-manager/family.service';
import {Family} from '../../model/family';
import {
  ACTION_INITIAL_NOTIFICATION,
  ACTION_NOTIFICATION_ACCEPT,
  ACTION_NOTIFICATION_DECLINE
} from '../../store/actions/notification-actions';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private notificationService: NotificationService, private userService: UserService, private familyService: FamilyService) { }
  notifications = new Array<Notification>();
  family: Family;
  ngOnInit() {
    this.updateNotificationDrawer();
  }

  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  getNotifications() {
    this.notificationService.getNotificationsForLoggedUser().subscribe(value => {
      this.notifications = value;
    })
  }
  decline(notification: Notification) {
    this.userService.declineInviteToFamily(notification).subscribe(() => {
      this.notificationService.updateNotificationState({
        action: ACTION_NOTIFICATION_DECLINE,
        payload: notification
      });
      this.notifications = this.notifications.filter(item => item != notification);
    });
  }
  accept(notification: Notification) {
    console.log(notification);
    this.familyService.getFamilyByName(notification.familyNameFromFamilyUser).subscribe(value => {
      this.family = value;
      this.userService.acceptInviteToFamily(notification).subscribe(() => {
        this.notificationService.updateNotificationState({
          action: ACTION_NOTIFICATION_ACCEPT,
          payload: notification
        });
        this.notifications = this.notifications.filter(item => item != notification);
      });
      this.familyService.updateFamiliesState({
        action: ACTION_CREATE,
        payload: this.family,
      });
    });
  }
  updateNotificationDrawer() {
    this.getNotifications();
    this.notificationService.startIntervalPolling();
    this.notificationService.getAllState().subscribe(state => {
      if(state.received == true) {
        this.notifications = state.notifications;
        this.notificationService.updateNotificationState({
          action: ACTION_INITIAL_NOTIFICATION
        })
      }
    })
  }

}
