import { Body, Controller, Post } from '@nestjs/common';
import { stockW } from '../app/webhook';
import { StockTransformerFactory } from './intrum.transformer.service';
import { IntrumWebHookService } from './intrum.webhook.service';
import { NotificationService } from '../notification/notification.service';
import { StockWebHookRequest } from './interfaces/webhook/intrum.webhook.interface';

@Controller('intrum')
export class IntrumController {
  constructor(
    private webhook: IntrumWebHookService,
    private notify: NotificationService
  ) {}

  @Post('stock')
  stock(@Body() request: StockWebHookRequest) {
    const stockTransformer = new StockTransformerFactory();
    console.log(request);
    const webHook = this.webhook.prepareStockWebHook(request);
    const stock = stockTransformer.get(webHook).format();

    const merge = webHook.snapshot.merge;
    const message = this.notify.newStock(stock, merge);

    return { message: stock };
  }
}
