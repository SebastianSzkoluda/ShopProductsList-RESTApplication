import { Component, OnInit } from '@angular/core';
import {FamilyUser} from '../services/user-manager/familyUser';
import {UserService} from '../services/user-manager/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private fb: FormBuilder) { }

  familyUser: FamilyUser = new FamilyUser();
  validateForm: FormGroup;
  isVisible = false;
  isOkLoading = false;
  initialize(): void {
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      email: [ null, [ Validators.required ] ],
      age: [ null, [ Validators.required ] ],
      remember: [ true ]
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
    this.userService.register(this.familyUser).subscribe(value => {
      this.handleOk();
      console.log(value);
    });
}

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    this.register();
  }

  ngOnInit(): void {
    this.initialize();
  }

}
