import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FirebaseDocument = HydratedDocument<Firebase>;

@Schema()
export class Firebase {
  @Prop()
  userId: string;

  @Prop()
  firebaseToken: string;
}

export const FirebaseSchema = SchemaFactory.createForClass(Firebase);
