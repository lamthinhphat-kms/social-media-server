import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ChatRoomService } from './chat-room.service';
import { ChatRoom, ChatRoomSchema } from 'src/schemas/chat-room.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChatRoom.name, schema: ChatRoomSchema },
    ]),
  ],
  providers: [ChatRoomService],
  exports: [ChatRoomService],
})
export class ChatRoomModule {}
