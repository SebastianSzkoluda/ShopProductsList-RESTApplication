export class LoginUser {
  username: string;
  password: string;

  constructor(username: string = null,
              password: string = null) {
    this.username = username;
    this.password = password;
  }
}
