import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatRoom } from 'src/schemas/chat-room.schema';
import { MessageDto } from './message.dto';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectModel(ChatRoom.name) private chatRoomModel: Model<ChatRoom>,
  ) {}

  async create(messageDto: MessageDto) {
    const createdMessage = new this.chatRoomModel(messageDto);
    return await createdMessage.save();
  }

  async findAllMessage(roomId: string): Promise<ChatRoom[]> {
    return await this.chatRoomModel
      .find({
        roomId: roomId,
      })
      .exec();
  }
}
