import { Injectable } from '@nestjs/common';
import {
  StockWebHookRequest,
  WebHookMerge,
} from './interfaces/webhook/intrum.webhook.interface';
import { plainToClass } from 'class-transformer';
import { pickProperties, processExtProperties } from './intrum.utils';

@Injectable()
export class IntrumWebHookService {
  constructor() {}

  prepareStockWebHook(request: object): [StockWebHookRequest, WebHookMerge[]] {
    const result = plainToClass(StockWebHookRequest, request);
    let merge = result.snapshot.merge;

    processExtProperties(result.snapshot.extproperty);
    processExtProperties(merge);

    return [result, merge];
  }
}
