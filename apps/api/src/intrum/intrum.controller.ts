import { Body, Controller, Post } from '@nestjs/common';
import { StockTransformerFactory } from './intrum.transformer.service';
import { IntrumWebHookService } from './intrum.webhook.service';
import { NotificationService } from '../notification/notification.service';
import {
  EventType,
  StockWebHookRequest,
} from './interfaces/webhook/intrum.webhook.interface';
import { Stock } from './interfaces/stock';
import { stockProperties } from './constants';
import { FlatStatuses } from '../app/constants';

enum WebHookType {
  NEW,
  PREPAYMENT,
}

@Controller('intrum')
export class IntrumController {
  constructor(
    private webhook: IntrumWebHookService,
    private notify: NotificationService
  ) {}

  @Post('stock')
  stock(@Body() request: StockWebHookRequest) {
    let stock: Stock;
    let type: WebHookType;

    const stockTransformer = new StockTransformerFactory();

    const [webHook, merge] = this.webhook.prepareStockWebHook(request);

    try {
      stock = stockTransformer.get(webHook).format();
    } catch (error) {
      return; // TODO: Fix
    }

    const { ACTIVE, PREPAYMENT } = FlatStatuses;

    // TODO: Добавить проверку на publish
    if (webHook.event == EventType.CREATE) {
      type = WebHookType.NEW;
    }

    if (stockProperties.status in merge) {
      // TODO: Move status to common properties
      switch (stock.properties.status) {
        case ACTIVE:
          type = WebHookType.NEW;
          break;
        case PREPAYMENT:
          type = WebHookType.PREPAYMENT;
          break;
      }
    } else return;

    this.notify.stock(stock, type);

    return { message: stock };
  }
}
