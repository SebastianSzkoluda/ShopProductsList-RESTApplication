import {Family} from './family';
import {Notification} from './notification';
import {Authority} from './authority';

export class FamilyUser {

  userId: number;
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
  age: number;
  userFamilies: Array<Family>;
  authorities: Array<Authority>
  notificationsList: Array<Notification>;

  constructor(user_id: number = null,
              username: string = null,
              password: string = null,
              email: string = null,
              firstname: string = null,
              lastname: string = null,
              age: number = null,
              userFamilies = [],
              authorities= [],
              notificationsList = []) {
    this.userId = user_id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
    this.userFamilies = userFamilies;
    this.authorities = authorities;
    this.notificationsList = notificationsList;
  }

}
