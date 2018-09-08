import { Component, OnInit } from '@angular/core';
import {TokenStorage} from '../../auth/token/token.storage';
import {NzMessageService} from 'ng-zorro-antd';
import {ACTION_LOGOUT} from '../../store/actions/user-actions';
import {UserService} from '../../auth/user/user-manager/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService, private token: TokenStorage, private message: NzMessageService) {
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
    this.userService.updateUserState({
      action: ACTION_LOGOUT,
      payload: null
    });
    this.token.logout();
    this.createMessage('success');
  }
  createMessage(type: string): void {
    this.message.create(type, `Logged out`);
  }

  ngOnInit() {
    this.userService.getAllState().subscribe(state => {
      // console.log(state);
      this.loggedUser = state.user;
    });
  }

}
