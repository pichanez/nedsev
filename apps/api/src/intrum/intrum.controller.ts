import { Body, Controller, Post } from '@nestjs/common';
import { stockW } from '../app/webhook';
import { StockTransformerFactory } from './intrum.transformer.service';
import { IntrumWebHookService } from './intrum.webhook.service';
import { NotificationService } from '../notification/notification.service';
import { StockWebHookRequest } from './interfaces/webhook/intrum.webhook.interface';
import { Stock } from './interfaces/stock';

@Controller('intrum')
export class IntrumController {
  constructor(
    private webhook: IntrumWebHookService,
    private notify: NotificationService
  ) {}

  @Post('stock')
  stock(@Body() request: StockWebHookRequest) {
    let stock: Stock;
    const stockTransformer = new StockTransformerFactory();

    const webHook = this.webhook.prepareStockWebHook(request);

    try {
      stock = stockTransformer.get(webHook).format();
    } catch (error) {
      return; // TODO: Fix
    }

    const merge = webHook.snapshot.merge;

    this.notify.newStock(stock, merge);

    return { message: stock };
  }
}
