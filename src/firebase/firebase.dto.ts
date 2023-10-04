import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class FirebaseDto {
  @Expose()
  @IsNotEmpty()
  userId: string;

  @Expose()
  @IsNotEmpty()
  fcmToken: string;
}
