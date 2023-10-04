import { Provider } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as fs from 'fs';

export const NotificationProvider = 'lib:messaging';

export const notificationProvider: Provider = {
  provide: NotificationProvider,
  useFactory: async () => {
    const jsonString = fs.readFileSync('./admin-firebase.json', 'utf-8');
    const jsonData = JSON.parse(jsonString);
    await admin.initializeApp({
      credential: admin.credential.cert({
        projectId: jsonData.project_id,
        clientEmail: jsonData.client_email,
        privateKey: jsonData.private_key,
      }),
    });
    return admin.messaging(admin.app());
  },
};
