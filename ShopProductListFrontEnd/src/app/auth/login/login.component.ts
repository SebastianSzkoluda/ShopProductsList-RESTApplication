import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../auth-manager/auth.service';
import {LoginUser} from '../../model/login-user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';
import {FamilyService} from '../../family/family-manager/family.service';
import {ACTION_LOGGEDIN} from '../../store/actions/auth-actions';
import {UserService} from '../../user/user-manager/user.service';
import {select, Store} from '@ngrx/store';
import {selectLoggedIn} from '../../store/reducers';
import {Observable} from 'rxjs/internal/Observable';
import {Subject} from 'rxjs/internal/Subject';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private destroyed$ = new Subject();
  isLoggedIn$: Observable<boolean>;
  loginUser: LoginUser = new LoginUser(null, null);
  validateForm: FormGroup;

  constructor(private router: Router,
              private authService: AuthService,
              private familyService: FamilyService,
              private userService: UserService,
              private zone: NgZone,
              private fb: FormBuilder,
              private message: NzMessageService,
              private store: Store<any>) {
    this.isLoggedIn$ = this.store.pipe(select(selectLoggedIn));
  }



  public login(): void {
    this.loginUser.username = this.validateForm.get('username').value;
    this.loginUser.password = this.validateForm.get('password').value;
    this.authService.login(this.loginUser).pipe(takeUntil(this.destroyed$)).subscribe(value => {
        console.log(value.token);
        this.zone.run(() => this.router.navigate(['productsList']));

        this.createMessage('success', 'Successfully logged in!');
      },
      err => {
        this.createMessage('error', `Wrong login or password! Please try login one more time.`);
      });
  }


  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.login();
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }


}

