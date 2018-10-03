import {Family} from './family';
import {Notification} from './notification';

export class FamilyUser {

    userId: number;
    username: string;
    password: string;
    email: string;
    age: number;
    userFamilies: Array<Family>;
    notificationsList: Array<Notification>;

    constructor(user_id: number = null,
                username: string = null,
                password: string = null,
                email: string = null,
                age: number = null,
                userFamilies = [],
                notificationsList = []) {
        this.userId = user_id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.age = age;
        this.userFamilies = userFamilies;
        this.notificationsList = notificationsList;
    }

}
