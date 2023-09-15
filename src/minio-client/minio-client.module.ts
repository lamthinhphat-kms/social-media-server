import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MinioClientService } from './minio-client.service';
// import { NestMinioModule } from 'nestjs-minio';
import { MinioModule } from 'nestjs-minio-client';

@Module({
  imports: [
    MinioModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          endPoint: process.env.MINIO_ENDPOINT,
          port: parseInt(process.env.MINIO_PORT),
          accessKey: process.env.MINIO_ACCESSKEY,
          secretKey: process.env.MINIO_SECRETKEY,
          useSSL: false,
        };
      },
    }),
  ],
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class MinioClientModule {}
