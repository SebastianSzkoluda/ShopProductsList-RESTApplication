import {Component, TemplateRef, ViewChild} from '@angular/core';
import {UserService} from './services/user-manager/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private userService: UserService) {}
  title = 'app';
  loggedUser: string = null;

  isCollapsed = false;
  triggerTemplate = null;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }
  isLogged(): boolean {
    this.loggedUser = this.userService.getLoggedUser();
    return this.userService.getIsLogged();
  }
  logout(): void {
    this.userService.logout();
  }
}
