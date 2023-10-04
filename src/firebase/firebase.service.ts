import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Firebase } from 'src/schemas/firebase.schema';
import { FirebaseDto } from './firebase.dto';

@Injectable()
export class FirebaseService {
  constructor(
    @InjectModel(Firebase.name) private firebaseModel: Model<Firebase>,
  ) {}

  async insertFcmToken(firebaseDto: FirebaseDto) {
    const insertedToken = new this.firebaseModel({
      userId: firebaseDto.userId,
      firebaseToken: firebaseDto.fcmToken,
    });
    return await insertedToken.save();
  }

  async findAllTokens(userId: string) {
    return await this.firebaseModel
      .find({
        userId: userId,
      })
      .select('firebaseToken')
      .exec();
  }

  async deleteFcmToken(fcmToken: string) {
    const deleted = await this.firebaseModel.deleteOne({
      firebaseToken: fcmToken,
    });
    return deleted;
  }
}
