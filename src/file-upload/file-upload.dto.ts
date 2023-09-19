import { IsNotEmpty } from 'class-validator';

export class FileUploadDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  pathName: string;
}
