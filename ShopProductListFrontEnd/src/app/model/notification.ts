export class Notification {

  notificationId: number;
  notificationInfo: string;
  familyUserNameFrom: string;
  familyNameFromFamilyUser: string;
  familyIdFromFamilyUser: number;

  constructor(notificationId: number = null,
              notificationInfo: string = null,
              familyUserNameFrom: string = null,
              familyNameFromFamilyUser: string = null,
              familyIdFromFamilyUser: number = null) {
    this.notificationId = notificationId;
    this.notificationInfo = notificationInfo;
    this.familyUserNameFrom = familyUserNameFrom;
    this.familyNameFromFamilyUser = familyNameFromFamilyUser;
    this.familyIdFromFamilyUser = familyIdFromFamilyUser;
  }
}
