import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FamilyUser} from '../../model/family-user';
import {UserService} from '../user-manager/user.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/internal/Subject';
import {select, Store} from '@ngrx/store';
import {selectIsAdmin} from '../../store/reducers';
import {Observable} from 'rxjs/internal/Observable';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private userService: UserService) {
  }

  users: Array<FamilyUser>;
  sortName = null;
  sortValue = null;
  private destroyed$ = new Subject();

  ngOnInit() {
    this
      .userService
      .getAllUsers().pipe(takeUntil(this.destroyed$)).subscribe(users => {
      this.users = users;
      console.log(this.users);
    });
  }

  checkIfUserHaveRoleAdmin(userId: number): boolean {
    return !(this.users.find(user => user.userId === userId)
      .authorities.filter(auth => auth.name === 'ROLE_ADMIN').length > 0);
  }

  sort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search(): void {
    /** sort data **/
    if (this.sortName) {
      const data = this.users.sort((a, b) =>
        (this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
      this.users = [...data];
    }
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).pipe(takeUntil(this.destroyed$)).subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
