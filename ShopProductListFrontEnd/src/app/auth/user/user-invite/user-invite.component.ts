import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Family} from '../../../model/family';
import {FamilyService} from '../../../family/family-manager/family.service';
import {FamilyUser} from '../../../model/family-user';
import {UserService} from '../user-manager/user.service';
import {ACTION_INITIAL_FAMILY} from '../../../store/actions/family-actions';
import {NzMessageService} from 'ng-zorro-antd';
import {NotificationService} from '../../../page-content/notification/notification-manager/notification.service';
import {ACTION_NOTIFICATION_CREATE} from '../../../store/actions/notification-actions';

@Component({
  selector: 'app-user-invite',
  templateUrl: './user-invite.component.html',
  styleUrls: ['./user-invite.component.css']
})
export class UserInviteComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private familyService: FamilyService,
              private userService: UserService,
              private message: NzMessageService,
              private notificationService: NotificationService) { }
  families = new Array<Family>();
  users = new Array<FamilyUser>();
  options = new Array<FamilyUser>();
  validateForm: FormGroup;
  isVisible = false;
  isOkLoading = false;
  initialize(): void {
    this.validateForm = this.fb.group({
      familyName: [ null, [ Validators.required ] ],
      userName: [ null, [ Validators.required ] ]
    });
  }
  ngOnInit(): void {
    this.updateFamilyState();
    this.getFamilies();
    this.getAllUsers();
    this.initialize();
  }

  showModal(): void {
    this.initialize();
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    window.setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 2000);
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    this.sendInvite();
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  getFamilies() {
    return this.familyService.loggedUserFamilies().subscribe(value => {
      this.families = value;
      console.log(this.families);
    });
  }

  getAllUsers() {
    return this.userService.getAllUsers().subscribe(value => this.users = value)
  }

  onInput(value: string): void {
    this.options = this.users
      .filter(user => user.username.toLowerCase().indexOf(value.toLowerCase()) === 0);
  }

  sendInvite() {
    this.userService.sendInviteToFamily(this.validateForm.get('familyName').value, this.validateForm.get('userName').value)
      .subscribe(value => {
        if(value) {
          this.createMessage('success','Invite sent successfully!');
          this.updateNotificationStateCreate();
        } else {
          this.createMessage('error', 'This user is in your family!')
        }
      });
    this.handleOk();
  }
  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }

  updateFamilyState() {
    this.familyService.getAllState().subscribe( state => {
      if (state.family != null && state.create == true) {
        this.families.push(state.family);
      }
    });
  }

  updateNotificationStateCreate() {
    this.notificationService.updateNotificationState({
      action: ACTION_NOTIFICATION_CREATE
    })
  }
}
