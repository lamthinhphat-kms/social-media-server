import { Body, Controller, Delete, Post } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { FirebaseDto } from './firebase.dto';

@Controller('firebase')
export class FirebaseController {
  constructor(private firebaseService: FirebaseService) {}

  @Post()
  async insertFirebaseToke(@Body() firebaseBody: FirebaseDto) {
    console.log('insert', firebaseBody);
    return await this.firebaseService.insertFcmToken(firebaseBody);
  }

  @Delete()
  async deleteFirebaseToken(@Body('fcmToken') fcmToken: string) {
    console.log('delete', fcmToken);

    return await this.firebaseService.deleteFcmToken(fcmToken);
  }
}
