import { Module } from '@nestjs/common';
import { MinioClientModule } from './minio-client/minio-client.module';
import { ConfigModule } from '@nestjs/config';
import { FileUploadModule } from './file-upload/file-upload.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatRoomModule } from './chat-room/chat-room.module';
import { ChatModule } from './chat/chat.module';
import { FirebaseModule } from './firebase/firebase.module';
import { NotificationModule } from './notification/notifcation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.DB_HOST}:${process.env.MONGO_PORT}`,
        dbName: 'social_media',
      }),
    }),
    MinioClientModule,
    FileUploadModule,
    ChatRoomModule,
    ChatModule,
    FirebaseModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
