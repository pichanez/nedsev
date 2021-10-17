import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { ConfigService } from '@nestjs/config';

interface EnvironmentVariables {
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_COMPANY_CHANNEL_ID: string;
}

@Injectable()
export class TelegramService {
  constructor(
    @InjectBot() private bot: Telegraf,
    private config: ConfigService<EnvironmentVariables>
  ) {}

  sendToChannel(message: string): void {
    const chatId = this.config.get('TELEGRAM_COMPANY_CHANNEL_ID');

    this.bot.telegram
      .sendMessage(chatId, message)
      .catch((error) => console.log(error));
  }
}
