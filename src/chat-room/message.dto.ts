import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class MessageDto {
  @Expose()
  @IsNotEmpty()
  roomId: string;

  @Expose()
  @IsNotEmpty()
  userId: string;

  @Expose()
  @IsNotEmpty()
  message: string;
}
