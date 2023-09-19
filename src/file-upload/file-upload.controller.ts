import {
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BufferedFile } from 'src/minio-client/file.model';
import { FileUploadService } from './file-upload.service';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { IsNotEmpty } from 'class-validator';
import { FileUploadDto } from './file-upload.dto';

@Controller('file-upload')
export class FileUploadController {
  constructor(
    private fileUploadService: FileUploadService,
    private minioClientService: MinioClientService,
  ) {}

  @Post('single')
  @UseInterceptors(FileInterceptor('image'))
  async uploadSingleImage(
    @UploadedFile() image: BufferedFile,
    @Body() fileUploadDto: FileUploadDto,
  ) {
    console.log(image);
    return await this.fileUploadService.uploadSingleFile(image, fileUploadDto);
  }

  @Delete('single')
  async deleteSingleImage(@Body('imageName') imageName: string) {
    console.log(imageName);
    return await this.minioClientService.delete(imageName);
  }
}
