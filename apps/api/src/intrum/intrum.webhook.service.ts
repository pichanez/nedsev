import { Injectable } from '@nestjs/common';
import { StockWebHookRequest } from './interfaces/webhook/intrum.webhook.interface';
import { plainToClass } from 'class-transformer';
import { processExtProperties } from './intrum.utils';

@Injectable()
export class IntrumWebHookService {
  constructor() {}

  prepareStockWebHook(request: object): StockWebHookRequest {
    const result = plainToClass(StockWebHookRequest, request);

    processExtProperties(result.snapshot.extproperty);
    processExtProperties(result.snapshot.merge);

    return result;
  }
}
