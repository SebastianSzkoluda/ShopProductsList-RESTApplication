///<reference path="../../store/actions/family-actions.ts"/>
import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationService} from './notification-manager/notification.service';
import {Notification} from '../../model/notification';
import {UserService} from '../../user/user-manager/user.service';
import {JoinFamilyAction} from '../../store/actions/family-actions';
import {FamilyService} from '../../family/family-manager/family.service';
import {Family} from '../../model/family';
import {AcceptNotificationAction, DeclineNotificationAction} from '../../store/actions/notification-actions';
import {Subject} from 'rxjs/internal/Subject';
import {takeUntil} from 'rxjs/operators';
import {WebSocketService} from '../../websocket/web-socket.service';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs/internal/Observable';
import {selectUserAvatar} from '../../store/reducers';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {

  constructor(private notificationService: NotificationService,
              private userService: UserService,
              private familyService: FamilyService,
              private webSocketService: WebSocketService,
              private store: Store<any>) {
    this.avatarUrl$ = this.store.pipe(select(selectUserAvatar));
  }


  avatarUrl$: Observable<boolean>;
  private destroyed$ = new Subject();
  notifications = [];
  family: Family;

  ngOnInit() {
    // this.notificationService.getNotificationsForLoggedUser().subscribe(value => this.notifications = value);
    this.updateNotificationDrawer();
  }

  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  decline(notification: Notification) {
    this.store.dispatch(new DeclineNotificationAction(notification));
    this.notifications = this.notifications.filter(item => item != notification);

  }

  accept(notification: Notification) {
    console.log(notification);
    this.familyService.getFamilyById(notification.familyIdFromFamilyUser).pipe(takeUntil(this.destroyed$)).subscribe(value => {
      this.family = value;
      this.store.dispatch(new AcceptNotificationAction(notification));
      this.store.dispatch(new JoinFamilyAction(this.family));
      this.notifications = this.notifications.filter(item => item != notification);
    });
  }

  updateNotificationDrawer() {
    // let stompClient = this.webSocketService.connect();
    // stompClient.connect({}, frame => {
    //   // Subscribe to notification topic
    //   // stompClient.subscribe('/user/queue/notify', notification => {
    //   stompClient.subscribe('/topic/notify', notification => {
    //     console.log('Websocket: => ' + notification.body );
    //     // Update notifications attribute with the recent messsage sent from the server
    //     this.notifications.push(JSON.parse(notification.body));
    //   })
    // });

    this.notificationService.startIntervalPollingForNotifications();
    this.notificationService.getAllState().pipe(takeUntil(this.destroyed$)).subscribe(state => {
      if (state.received == true) {
        this.notifications = state.notifications;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
