import { StockWebHookRequest } from './webhook/intrum.webhook.interface';

export interface IStockTransformer {
  stock: any;
  format();
}

export interface IStockTransformerFactory {
  get(dryStock: StockWebHookRequest): IStockTransformer; // TODO: realize type Stock and result
}
