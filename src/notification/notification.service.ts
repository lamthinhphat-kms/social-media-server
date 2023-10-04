import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AndroidConfig } from 'firebase-admin/lib/messaging/messaging-api';
import { NotificationProvider } from './notifcation.provider';
import * as admin from 'firebase-admin';
import { MessageDto } from 'src/chat-room/message.dto';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(NotificationProvider)
    private readonly messaging: admin.messaging.Messaging,
    private firebaseService: FirebaseService,
  ) {}
  private android: AndroidConfig = {
    priority: 'high',
  };

  private apns = {
    payload: {
      aps: {
        contentAvailable: true,
      },
    },
    headers: {
      'apns-priority': '5', // Must be `5` when `contentAvailable` is set to true.
    },
  };

  async sendMessageToTokens(
    messageDto: MessageDto,
    name: string,
    fcmTokens: string[],
  ): Promise<string[]> {
    return await this.messaging
      .sendEachForMulticast({
        tokens: fcmTokens,
        data: {
          roomId: messageDto.roomId,
          userId: messageDto.userId,
        },
        notification: {
          title: `${name} sent a message`,
          body: messageDto.message,
        },
        android: this.android,
        apns: this.apns,
      })
      .then((response) => {
        if (response.failureCount > 0) {
          const failedTokens: string[] = [];
          response.responses.forEach((resp, idx) => {
            if (!resp.success) {
              failedTokens.push(fcmTokens[idx]);
              this.firebaseService.deleteFcmToken(fcmTokens[idx]);
            }
          });
          return failedTokens;
        } else {
          return [];
        }
      })
      .catch((err) => {
        throw new HttpException(
          `Error sending message: ${err.message}`,
          HttpStatus.NO_CONTENT,
        );
      });
  }
}
