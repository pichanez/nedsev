import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { TelegramService } from './platform/telegram.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IntrumModule } from '../intrum/intrum.module';
import { IntrumService } from '../intrum/intrum.service';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        token: config.get('TELEGRAM_BOT_TOKEN'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    IntrumModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationService, TelegramService],
  exports: [NotificationService],
})
export class NotificationModule {}
