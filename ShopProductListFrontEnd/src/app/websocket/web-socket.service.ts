import { Injectable } from '@angular/core';
import SockJs from 'sockjs-client';

import {Stomp} from 'stompjs/lib/stomp.js';
import {TokenStorage} from '../auth/token/token.storage';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  stompClient: any;
  constructor(private tokenStorage: TokenStorage) { }


  connect() {
    let socket = new SockJs(`/socket/`);
    this.stompClient = Stomp.over(socket);
    this.stompClient.heartbeat.incoming = 0;
    this.stompClient.heartbeat.outgoing = 0;
    return this.stompClient;
  }

  getStompClient() {
    return this.stompClient;
  }
}
