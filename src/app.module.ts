import { Module } from '@nestjs/common';
import { MinioClientModule } from './minio-client/minio-client.module';
import { ConfigModule } from '@nestjs/config';
import { FileUploadModule } from './file-upload/file-upload.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MinioClientModule, FileUploadModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
