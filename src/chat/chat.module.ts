import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatRoomModule } from 'src/chat-room/chat-room.module';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { NotificationModule } from 'src/notification/notifcation.module';

@Module({
  providers: [ChatGateway],
  imports: [ChatRoomModule, FirebaseModule, NotificationModule],
})
export class ChatModule {}
