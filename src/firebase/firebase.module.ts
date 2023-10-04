import { Module } from '@nestjs/common';
import { FirebaseController } from './firebase.controller';
import { FirebaseService } from './firebase.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Firebase, FirebaseSchema } from 'src/schemas/firebase.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Firebase.name, schema: FirebaseSchema },
    ]),
  ],
  controllers: [FirebaseController],
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
