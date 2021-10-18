import { Injectable } from '@nestjs/common';
import { TelegramService } from './platform/telegram.service';
import { Stock } from '../intrum/interfaces/stock';
import { StockMessageBuilder } from './notification.builder';
import { IntrumService } from '../intrum/intrum.service';
import { WebHookMerge } from '../intrum/interfaces/webhook/intrum.webhook.interface';

enum WebHookType {
  NEW,
  PREPAYMENT,
}

@Injectable()
export class NotificationService {
  manager: object;
  builder: StockMessageBuilder;
  message: string;

  constructor(
    private telegram: TelegramService,
    private intrum: IntrumService
  ) {}

  stock(stock: Stock, type: WebHookType): string {
    const builder = new StockMessageBuilder(stock);

    if (type == WebHookType.NEW) {
      builder.produceNewTitle();
    } else builder.producePrepaymentTitle();

    builder.produceShortInfo();
    builder.producePrice();

    this.intrum.getManager(stock.author).subscribe((response) => {
      builder.produceManager(response.data[stock.author]);
      this.message = builder.getMessage().content;
      this.sendToChannel(this.message);
    });

    return this.message;
  }

  sendToChannel(message: string): void {
    this.telegram.sendToChannel(message);
  }
}
