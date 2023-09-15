import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BufferedFile } from 'src/minio-client/file.model';
import { FileUploadService } from './file-upload.service';

@Controller('file-upload')
export class FileUploadController {
  constructor(private fileUploadService: FileUploadService) {}

  @Post('single')
  @UseInterceptors(FileInterceptor('image'))
  async uploadSingleImage(@UploadedFile() image: BufferedFile) {
    return await this.fileUploadService.uploadSingleFile(image);
  }
}
