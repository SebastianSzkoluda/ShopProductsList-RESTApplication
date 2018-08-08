import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/user-manager/user.service';
import {User} from '../services/user-manager/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {
  }
  public users: User[];
  sortName = null;
  sortValue = null;
  searchValue = '';
  searchAddress = [];
  ngOnInit() {
    this
      .userService
      .getAllUsers().subscribe(users => {
        this.users = users;
      console.log(this.users);
    });
  }


  sort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search(): void {
    /** sort data **/
    if (this.sortName) {
      const data = this.users.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
      this.users = [...data];
    }
  }


}
