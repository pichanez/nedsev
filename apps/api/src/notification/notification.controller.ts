import { Controller } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor() {}
  webhook() {
    return { message: 'ok' };
  }
}
