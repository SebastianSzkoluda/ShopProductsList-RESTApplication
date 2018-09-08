import {Family} from './family';

export class FamilyUser {

    user_id: number;
    username: string;
    password: string;
    email: string;
    age: number;
    userFamilies: Array<Family>;

    constructor(user_id: number = 0, username: string = null, password: string = null, email: string = null, age: number = null, isLogged: boolean = false, userFamilies= []) {
        this.user_id = user_id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.age = age;
        this.userFamilies = userFamilies;
    }

}
