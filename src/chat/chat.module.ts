import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatRoomModule } from 'src/chat-room/chat-room.module';

@Module({
  providers: [ChatGateway],
  imports: [ChatRoomModule],
})
export class ChatModule {}
