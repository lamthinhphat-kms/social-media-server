import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server } from 'socket.io';
import { ChatRoom } from 'src/schemas/chat-room.schema';
import { ChatRoomService } from 'src/chat-room/chat-room.service';
import { MessageDto } from 'src/chat-room/message.dto';

@WebSocketGateway(8001, {
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  constructor(private chatRoomService: ChatRoomService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('chat')
  async create(@MessageBody() messageDto: MessageDto) {
    const message = await this.chatRoomService.create(messageDto);
    this.server.to(messageDto.roomId).emit('chat', message);
  }

  @SubscribeMessage('hello')
  async testing(
    @MessageBody('roomId') roomId: string,
    @MessageBody('socketId') socketId: string,
  ) {
    if (socketId) {
      console.log(roomId);
      this.server.in(socketId).socketsJoin(roomId);
      return await this.chatRoomService.findAllMessage(roomId);
    }
  }
}
