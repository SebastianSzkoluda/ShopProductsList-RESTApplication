import {Component, OnDestroy, OnInit} from '@angular/core';
import {TokenStorage} from '../../auth/token/token.storage';
import {NzMessageService} from 'ng-zorro-antd';
import {ACTION_LOGOUT, LogoutAction} from '../../store/actions/auth-actions';
import {AuthService} from '../../auth/auth-manager/auth.service';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs/internal/Observable';
import {selectIsAdmin, selectLoggedIn, selectLoggedUsername, selectTokenInfo, selectUserAvatar} from '../../store/reducers';
import {filter, map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/internal/Subject';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  loggedUser$: Observable<string>;
  loggedUserFullName$: Observable<string>;
  isAdmin$: Observable<boolean>;

  constructor(private authService: AuthService, private token: TokenStorage, private message: NzMessageService, private store: Store<any>) {
    this.isLoggedIn$ = this.store.pipe(select(selectLoggedIn));
    this.loggedUser$ = this.store.pipe(select(selectLoggedUsername));
    this.loggedUserFullName$ = this.store.pipe(select(selectTokenInfo));
    this.isAdmin$ = this.store.pipe(select(selectIsAdmin));
  }

  ngOnInit(): void {}

  logout(): void {
    this.store.dispatch(new LogoutAction());
    this.token.logout();
    this.createMessage('success', 'Logged out');
  }

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }
}
