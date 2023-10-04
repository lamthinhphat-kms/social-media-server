import { Module } from '@nestjs/common';
import { notificationProvider } from './notifcation.provider';
import { NotificationService } from './notification.service';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  providers: [notificationProvider, NotificationService],
  exports: [NotificationService],
  imports: [FirebaseModule],
})
export class NotificationModule {}
