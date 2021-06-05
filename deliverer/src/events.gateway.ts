import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger = new Logger(EventsGateway.name);

  @SubscribeMessage('input_event')
  handleEvent(_: Socket, data: string): WsResponse<{ status: string }> {
    this.logger.log(data, 'input_event');
    this.server.emit('broadcast_event', { data });

    return { event: 'input_event', data: { status: 'ok' } };
  }

  @SubscribeMessage('broadcast_event')
  handleBroadcast(): WsResponse<{ status: string }> {
    return { event: 'broadcast_event', data: { status: 'OK' } };
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
