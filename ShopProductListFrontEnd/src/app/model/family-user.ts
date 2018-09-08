import {Family} from './family';

export class FamilyUser {

    userId: number;
    username: string;
    password: string;
    email: string;
    age: number;
    userFamilies: Array<Family>;

    constructor(user_id: number = null, username: string = null, password: string = null, email: string = null, age: number = null, isLogged: boolean = false, userFamilies= []) {
        this.userId = user_id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.age = age;
        this.userFamilies = userFamilies;
    }

}
