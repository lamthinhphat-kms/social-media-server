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
import { NotificationService } from 'src/notification/notification.service';
import { FirebaseService } from 'src/firebase/firebase.service';

@WebSocketGateway(8001, {
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  constructor(
    private chatRoomService: ChatRoomService,
    private notificationService: NotificationService,
    private firebaseService: FirebaseService,
  ) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('chat')
  async create(
    @MessageBody() messageDto: MessageDto,
    @MessageBody('toUserId') toUserId: string,
    @MessageBody('name') name: string,
  ) {
    const message = await this.chatRoomService.create(messageDto);
    this.server.to(messageDto.roomId).emit('chat', message);
    const listTokens = await this.firebaseService.findAllTokens(toUserId);
    this.notificationService.sendMessageToTokens(
      messageDto,
      name,
      listTokens.map((item) => item.firebaseToken),
    );
  }

  @SubscribeMessage('hello')
  async testing(
    @MessageBody('roomId') roomId: string,
    @MessageBody('socketId') socketId: string,
  ) {
    if (socketId) {
      this.server.in(socketId).socketsJoin(roomId);
      return await this.chatRoomService.findAllMessage(roomId);
    }
  }
}
