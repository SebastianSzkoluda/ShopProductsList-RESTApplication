import {Component, OnInit} from '@angular/core';
import {FamilyUser} from '../../model/family-user';
import {AuthService} from '../auth-manager/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: AuthService, private fb: FormBuilder, private message: NzMessageService) {
  }

  familyUser: FamilyUser = new FamilyUser();
  validateForm: FormGroup;
  isVisible = false;
  isOkLoading = false;

  initialize(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      email: [null, [Validators.required]],
      age: [null, [Validators.required]]
    });
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

  handleCancel(): void {
    this.isVisible = false;
  }

  register(): void {
    this.familyUser.username = this.validateForm.get('userName').value;
    this.familyUser.password = this.validateForm.get('password').value;
    this.familyUser.email = this.validateForm.get('email').value;
    this.familyUser.age = this.validateForm.get('age').value;
    this.userService.register(this.familyUser).subscribe(() => {
        this.handleOk();
        this.createMessage('success', 'You have successfully create your account!');
      },
      err => {
        this.createMessage('error', 'Something is wrong, please check all fields in register form!');
      });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.register();
  }

  ngOnInit(): void {
    this.initialize();
  }

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }

}
