import { Module } from '@nestjs/common';
import { MinioClientModule } from './minio-client/minio-client.module';
import { ConfigModule } from '@nestjs/config';
import { FileUploadModule } from './file-upload/file-upload.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatRoomModule } from './chat-room/chat-room.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: 'mongodb://sankar007:sankar007@localhost:27017',
        dbName: 'social_media',
      }),
    }),
    MinioClientModule,
    FileUploadModule,
    ChatRoomModule,
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
