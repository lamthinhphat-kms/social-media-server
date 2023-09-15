import {
  Injectable,
  Logger,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { Stream } from 'stream';
import { BufferedFile } from './file.model';
import * as crypto from 'crypto';

@Injectable()
export class MinioClientService {
  private readonly logger: Logger;
  private readonly baseBucket = process.env.MINIO_BUCKET;

  public get client() {
    return this.minio.client;
  }

  constructor(private readonly minio: MinioService) {
    this.logger = new Logger('MinioStorageService');
  }

  public async upload(
    file: BufferedFile,
    baseBucket: string = this.baseBucket,
  ) {
    try {
      if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
        throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
      }
      //   let temp_filename = Date.now().toString();
      //   let hashedFileName = crypto
      //     .createHash('md5')
      //     .update(temp_filename)
      //     .digest('hex');
      let ext = file.originalname.substring(
        file.originalname.lastIndexOf('.'),
        file.originalname.length,
      );
      const metaData = {
        'Content-Type': file.mimetype,
        'X-Amz-Meta-Testing': 1234,
      };
      //   let filename = hashedFileName + ext;
      const fileName: string = `avatar/${'testing'}${ext}`;
      const fileBuffer = file.buffer;
      await this.client.putObject(baseBucket, fileName, fileBuffer, metaData);
      return {
        url: `${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET}/${fileName}`,
      };
    } catch (error) {
      throw error;
    }
  }

  async delete(objetName: string, baseBucket: string = this.baseBucket) {
    this.client.removeObject(baseBucket, objetName, function (err, res) {
      if (err)
        throw new HttpException(
          'Oops Something wrong happend',
          HttpStatus.BAD_REQUEST,
        );
    });
  }
}
