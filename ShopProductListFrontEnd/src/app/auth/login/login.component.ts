import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../auth-manager/auth.service';
import {LoginUser} from '../../model/login-user';
import {TokenStorage} from '../token/token.storage';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';
import {FamilyService} from '../../family/family-manager/family.service';
import {ACTION_LOGIN} from '../../store/actions/auth-actions';
import {UserService} from '../../user/user-manager/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthService,
              private familyService: FamilyService,
              private userService: UserService,
              private zone: NgZone,
              private fb: FormBuilder,
              private message: NzMessageService) {
  }

  loginUser: LoginUser = new LoginUser(null, null);
  validateForm: FormGroup;

  public login(): void {
    this.loginUser.username = this.validateForm.get('userName').value;
    this.loginUser.password = this.validateForm.get('password').value;
    this.authService.login(this.loginUser).subscribe(value => {
        console.log(value.token);
        this.zone.run(() => this.router.navigate(['productsList']));
        this.authService.updateUserState({
          action: ACTION_LOGIN,
          payload: this.loginUser.username
        });
        this.createMessage('success', 'Successfully logged in!');
      },
      error => {
        this.createMessage('error', `Wrong login or password! Please try log in one more time.`);
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
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }


}

