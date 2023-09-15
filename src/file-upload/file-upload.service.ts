import { Injectable } from '@nestjs/common';
import { BufferedFile } from 'src/minio-client/file.model';
import { MinioClientService } from 'src/minio-client/minio-client.service';

@Injectable()
export class FileUploadService {
  constructor(private minioClientService: MinioClientService) {}

  async uploadSingleFile(image: BufferedFile) {
    try {
      const uploadedFile = await this.minioClientService.upload(image);
      console.log('after');
      return {
        image_url: uploadedFile,
        message: 'Successfully uploaded file to minio',
      };
    } catch (error) {
      throw error;
    }
  }
}
