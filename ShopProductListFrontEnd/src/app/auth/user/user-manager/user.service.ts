import { Injectable } from '@angular/core';
import {FamilyUser} from '../../../model/family-user';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {Store} from '@ngrx/store';
import {Notification} from '../../../model/notification';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = '/api/';
  constructor(private http: HttpClient, private store: Store<any>) { }

  getUser(email: string): Observable < FamilyUser > {
    const params = new HttpParams().set('email', email);
    return this.http.get < FamilyUser > (this.baseUrl + 'user', {params: params});
  }

  getAllUsers(): Observable < FamilyUser[] > {
    return this.http.get < FamilyUser[] > (this.baseUrl + 'listAllUsers');
  }
  sendInviteToFamily(familyName: string, invitedUserName: string): Observable<boolean> {
    let httpParams = new HttpParams()
      .set("familyName", familyName)
      .set("invitedUserName", invitedUserName);
    return this.http.get<boolean>(this.baseUrl + 'user/sendInviteToFamily', {params: httpParams})
  }
  acceptInviteToFamily(notification: Notification) {
    return this.http.post(this.baseUrl + 'user/acceptInviteToFamily', notification)
  }
  declineInviteToFamily(notification: Notification) {
    return this.http.post(this.baseUrl + 'user/declineInviteToFamily', notification)
  }
  getAllState() {
    return this.store.select('userReducer');
  }
  updateUserState(obj) {
    this.store.dispatch(
      {
        type: obj.action,
        payload: obj.payload
      }
    );
  }
}
