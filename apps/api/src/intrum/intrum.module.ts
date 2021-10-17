import { forwardRef, HttpModule, HttpService, Module } from '@nestjs/common';
import { IntrumService } from './intrum.service';
import { NotificationModule } from '../notification/notification.module';
import { IntrumController } from './intrum.controller';
import { IntrumWebHookService } from './intrum.webhook.service';

@Module({
  imports: [forwardRef(() => NotificationModule), HttpModule],
  providers: [IntrumService, IntrumController, IntrumWebHookService],
  exports: [IntrumWebHookService, IntrumService],
})
export class IntrumModule {}
