import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, now } from 'mongoose';

export type ChatRoomDocument = HydratedDocument<ChatRoom>;

@Schema()
export class ChatRoom {
  @Prop(String)
  roomId: string;

  @Prop(String)
  userId: string;

  @Prop(String)
  message: string;

  @Prop({ default: now() })
  createdAt: Date;
}

export const ChatRoomSchema = SchemaFactory.createForClass(ChatRoom);
