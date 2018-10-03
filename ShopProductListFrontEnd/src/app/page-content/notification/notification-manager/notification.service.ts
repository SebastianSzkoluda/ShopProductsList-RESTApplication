import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Product} from '../../../model/product';
import {Observable} from 'rxjs/internal/Observable';
import {Notification} from '../../../model/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notoficationUrl = '/api/notification';
  constructor(private http: HttpClient) { }

  getNotificationsForLoggedUser(): Observable<Array<Notification>> {
    return this.http.get< Array<Notification> >(this.notoficationUrl);
  }
}
