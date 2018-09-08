import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth-manager/auth.service';
import {TokenStorage} from '../../auth/token/token.storage';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private token: TokenStorage, private message: NzMessageService) {
  }
  loggedUser: string;

  isLogged(): boolean {
    if (sessionStorage.getItem('currentUser') != null) {
      return true;
    } else {
      return false;
    }
  }
  logout(): void {
    this.token.logout();
    this.createMessage('success');
  }
  createMessage(type: string): void {
    this.message.create(type, `Logged out`);
  }

  ngOnInit() {
    this.authService.getAllState().subscribe(state => {
      console.log(state);
      // this.loggedUser = state.user;
    });
  }

}
