import { HttpModule, Module } from '@nestjs/common';

import { AppController, WebhookController } from './app.controller';
import { AppService } from './app.service';
import { IntrumService } from '../intrum/intrum.service';
import { ConfigModule } from '@nestjs/config';
import { NotificationModule } from '../notification/notification.module';
import { IntrumModule } from '../intrum/intrum.module';
import { IntrumController } from '../intrum/intrum.controller';
import { StockTransformerFactory } from '../intrum/intrum.transformer.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    NotificationModule,
    IntrumModule,
  ],
  controllers: [AppController, WebhookController, IntrumController],
  providers: [AppService, IntrumService],
})
export class AppModule {}
