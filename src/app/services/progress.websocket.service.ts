import {Injectable} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {WebSocketService} from './websocket.service';
import {WebSocketOptions} from '../models/websocket.options';
import {FixedStompConfig} from "../FixedStompConfig";

export const progressStompConfig: FixedStompConfig = {
  webSocketFactory: () => {
    return new WebSocket('ws://localhost:8080/stomp');
  }
};

@Injectable()
export class ProgressWebsocketService extends WebSocketService {
  constructor(stompService: RxStompService) {
    super(
      stompService,
      progressStompConfig,
      new WebSocketOptions('/topic/progress')
    );
  }
}
