export class Notification {

  notificationId: number;
  notificationInfo: string;
  familyUserNameFrom: string;
  familyNameFromFamilyUser: string;

  constructor(notificationId: number = null,
              notificationInfo: string = null,
              familyUserNameFrom: string = null,
              familyNameFromFamilyUser: string = null) {
    this.notificationId = notificationId;
    this.notificationInfo = notificationInfo;
    this.familyUserNameFrom = familyUserNameFrom;
    this.familyNameFromFamilyUser = familyNameFromFamilyUser;
  }
}
