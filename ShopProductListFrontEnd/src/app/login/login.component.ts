import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user-manager/user.service';
import { User } from '../services/user-manager/user';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) {
  }

  loading = false;
  public users: User[];
  public user = new User();
  localStorage: Storage;

  ngOnInit() {
    this
      .userService
      .getAllUsers().subscribe(users => this.users = users);
  }

  public login(): void {

    if (this.users.find(user => this.user.username === user.username && this.user.password === user.password)) {
      this.user.isLogged = true;
      this.userService.setLoggedUser(this.user);
      this.router.navigate(['user']);
    } else {
      alert('Invalid credentials');
    }
  }
}

