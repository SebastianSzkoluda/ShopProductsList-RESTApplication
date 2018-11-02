import {Injectable} from '@angular/core';
import {FamilyUser} from '../../model/family-user';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {Store} from '@ngrx/store';
import {Notification} from '../../model/notification';
import {debounceTime, map} from 'rxjs/operators';
import {WebSocketService} from '../../websocket/web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = '/api/';

  constructor(private http: HttpClient, private store: Store<any>, private webSocketService: WebSocketService) {
  }

  getLoggedUser(): Observable<FamilyUser> {
    return this.http.get <FamilyUser>(this.baseUrl + 'user');
  }

  deleteUser(userId: number): Observable<FamilyUser> {
    return this.http.delete <FamilyUser>(this.baseUrl + 'user' + `/${userId}`);
  }

  getAllUsers(): Observable<FamilyUser[]> {
    return this.http.get <FamilyUser[]>(this.baseUrl + 'listAllUsers');
  }

  getAllUsersLikePartOfUsername(username: string): Observable<FamilyUser[]> {
    const params = new HttpParams().set('username', username);
    return this.http.get <FamilyUser[]>(this.baseUrl + 'listSpecifiedUsers', {params: params}).pipe(
      debounceTime(500),  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
      map(
        (data: any) => {
          return (
            data.length != 0 ? data as any[] : [{'UserName': 'No Record Found'} as any]
          );
        }
      ));
  }

  sendInviteToFamily(familyId: number, invitedUserName: string): Observable<Notification> {
      if(familyId === null) familyId = -1;
    let httpParams = new HttpParams()
      .set('familyId', familyId.toString())
      .set('invitedUserName', invitedUserName);
    return this.http.get<Notification>(this.baseUrl + 'user/sendInviteToFamily', {params: httpParams});
  }

  // sendInviteToFamily(familyName: string, invitedUserName: string): Observable<boolean> {
  //   return this.webSocketService.getStompClient().sendPending(this.baseUrl + 'sendInviteToFamily'+ `/${familyName}`+ `/${invitedUserName}`,{}, 'sebek');
  // }

  acceptInviteToFamily(notification: Notification) {
    return this.http.post(this.baseUrl + 'user/acceptInviteToFamily', notification);
  }

  declineInviteToFamily(notification: Notification) {
    return this.http.post(this.baseUrl + 'user/declineInviteToFamily', notification);
  }
}

