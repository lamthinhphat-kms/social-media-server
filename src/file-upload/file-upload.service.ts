import { Injectable } from '@nestjs/common';
import { BufferedFile } from 'src/minio-client/file.model';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { FileUploadDto } from './file-upload.dto';

@Injectable()
export class FileUploadService {
  constructor(private minioClientService: MinioClientService) {}

  async uploadSingleFile(image: BufferedFile, fileUploadDto: FileUploadDto) {
    try {
      const uploadedFile = await this.minioClientService.upload(
        image,
        fileUploadDto,
      );
      return {
        ...uploadedFile,
        message: 'Successfully uploaded file to minio',
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
