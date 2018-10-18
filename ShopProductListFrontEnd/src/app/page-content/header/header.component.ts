import {Component, OnInit} from '@angular/core';
import {TokenStorage} from '../../auth/token/token.storage';
import {NzMessageService} from 'ng-zorro-antd';
import {ACTION_LOGOUT} from '../../store/actions/auth-actions';
import {AuthService} from '../../auth/auth-manager/auth.service';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs/internal/Observable';
import {selectLoggedIn, selectLoggedUsername} from '../../store/reducers';
import {map, take} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  loggedUser$: Observable<string>;

  constructor(private authService: AuthService, private token: TokenStorage, private message: NzMessageService, private store: Store<any>) {
    this.isLoggedIn$ = this.store.pipe(select(selectLoggedIn));
    this.loggedUser$ = this.store.pipe(select(selectLoggedUsername));
  }



  ngOnInit(): void {
  }

  logout(): void {
    this.authService.updateUserState({
      action: ACTION_LOGOUT,
      payload: null
    });
    this.token.logout();
    this.createMessage('success');
  }

  createMessage(type: string): void {
    this.message.create(type, `Logged out`);
  }
}
