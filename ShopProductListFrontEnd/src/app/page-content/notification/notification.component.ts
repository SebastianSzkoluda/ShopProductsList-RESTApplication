import { Component, OnInit } from '@angular/core';
import {NotificationService} from './notification-manager/notification.service';
import {Notification} from '../../model/notification';
import {UserService} from '../../auth/user/user-manager/user.service';
import {ACTION_CREATE} from '../../store/actions/family-actions';
import {FamilyService} from '../../family/family-manager/family.service';
import {Family} from '../../model/family';

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
    this.getNotifications();
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
    this.userService.declineInviteToFamily(notification).subscribe();
  }
  accept(notification: Notification) {
    console.log(notification);
    this.familyService.getFamilyByName(notification.familyNameFromFamilyUser).subscribe(value => {
      this.family = value;
      this.userService.acceptInviteToFamily(notification).subscribe();
      this.familyService.updateFamiliesState({
        action: ACTION_CREATE,
        payload: this.family,
      });
    });
  }
}
