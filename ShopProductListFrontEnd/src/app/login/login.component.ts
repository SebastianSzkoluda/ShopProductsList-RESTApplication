import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {UserService} from '../services/user-manager/user.service';
import {LoginUser} from '../services/user-manager/loginUser';
import {TokenStorage} from '../token/token.storage';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';
import {error} from 'util';
import {FamilyService} from '../services/family-manager/family.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private familyService: FamilyService, private zone: NgZone, private token: TokenStorage, private fb: FormBuilder, private message: NzMessageService) {
  }

  loginUser: LoginUser = new LoginUser(null, null);
  validateForm: FormGroup;

  public login(): void {
    this.loginUser.username = this.validateForm.get('userName').value;
    this.loginUser.password = this.validateForm.get('password').value;
    this.userService.login(this.loginUser).subscribe(value => {
      console.log(value.token);
      this.token.saveToken(value.token);
      this.zone.run(() => this.router.navigate(['productsList']));
    },
    error => {
      this.createMessage('error');
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

  createMessage(type: string): void {
    this.message.create(type, `Wrong login or password!\nPlease try log in one more time.`);
  }
}

