import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Family} from '../../model/family';
import {FamilyService} from '../../family/family-manager/family.service';
import {FamilyUser} from '../../model/family-user';
import {UserService} from '../user-manager/user.service';
import {NzMessageService} from 'ng-zorro-antd';
import {NotificationService} from '../../page-content/notification/notification-manager/notification.service';
import {SendNotificationAction} from '../../store/actions/notification-actions';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/internal/Subject';
import {Observable} from 'rxjs/internal/Observable';
import {select, Store} from '@ngrx/store';
import {selectSendInvitationFailed, selectSendInvitationSuccess} from '../../store/reducers';

@Component({
  selector: 'app-user-invite',
  templateUrl: './user-invite.component.html',
  styleUrls: ['./user-invite.component.css']
})
export class UserInviteComponent implements OnInit, OnDestroy {
  families: Array<Family>;
  users: Array<FamilyUser>;
  options: Array<FamilyUser>;
  validateForm: FormGroup;
  isVisible = false;
  isOkLoading = false;
  private destroyed$ = new Subject();

  constructor(private fb: FormBuilder,
              private familyService: FamilyService,
              private userService: UserService,
              private message: NzMessageService,
              private notificationService: NotificationService,
              private store: Store<any>) {
  }

  initialize(): void {
    this.validateForm = this.fb.group({
      familyId: [null, [Validators.required]],
      userInput: [null, [Validators.required]]
    });
    this.onInput();
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
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.sendInvite();
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  getFamilies() {
    return this.familyService.loggedUserFamilies().pipe(takeUntil(this.destroyed$)).subscribe(value => {
      this.families = value;
    });
  }

  getAllUsers() {
    return this.userService.getAllUsers().pipe(takeUntil(this.destroyed$)).subscribe(value => this.users = value);
  }

  onInput() {
    this.validateForm
      .get('userInput')
      .valueChanges.subscribe(
      term => {
        if (term != '') {
          this.userService.getAllUsersLikePartOfUsername(term).pipe(takeUntil(this.destroyed$)).subscribe(
            data => {
              this.options = data as any[];
            });
        }
      });
  }

  sendInvite() {
    console.log(this.validateForm.get('familyId').value, this.validateForm.get('userInput').value);
    this.store.dispatch(new SendNotificationAction(
      {'familyId': this.validateForm.get('familyId').value, 'invitedUser': this.validateForm.get('userInput').value})
    );
    this.handleOk();
  }

  updateFamilyState() {
    this.familyService.getAllState().pipe(takeUntil(this.destroyed$)).subscribe(state => {
      if (state.family !== null && (state.createFinish === true || state.join === true)) {
        this.families.push(state.family);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
