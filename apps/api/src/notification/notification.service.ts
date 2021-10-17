import { Injectable } from '@nestjs/common';
import { TelegramService } from './platform/telegram.service';
import { Stock } from '../intrum/interfaces/stock';
import { StockMessageBuilder } from './notification.builder';
import { IntrumService } from '../intrum/intrum.service';
import { map, retry, skip } from 'rxjs/operators';
import { WebHookMerge } from '../intrum/interfaces/webhook/intrum.webhook.interface';

@Injectable()
export class NotificationService {
  manager: object;
  builder: StockMessageBuilder;
  message: string;

  constructor(
    private telegram: TelegramService,
    private intrum: IntrumService
  ) {}

  newStock(stock: Stock, merge: WebHookMerge[]): string {
    const builder = new StockMessageBuilder(stock);

    builder.produceNewTitle();
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
