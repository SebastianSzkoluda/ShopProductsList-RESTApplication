export class User {

    user_id: number;
    username: string;
    password: string;
    email: string;
    age: number;

    constructor(user_id: number = 0, username: string = null, password: string = null, email: string = null, age: number = null) {
        this.user_id = user_id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.age = age;
    }

}
