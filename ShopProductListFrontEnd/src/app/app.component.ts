import {Component} from '@angular/core';
import {UserService} from './services/user-manager/user.service';
import {TokenStorage} from './token/token.storage';
import {FamilyService} from './services/family-manager/family.service';
import {Family} from './services/family-manager/family';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private userService: UserService, private token: TokenStorage, private message: NzMessageService) {
}
 loggedUser: string;

  isLogged(): boolean {
    if (sessionStorage.getItem('currentUser') != null) {
      this.loggedUser = sessionStorage.getItem('currentUser');
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
}
