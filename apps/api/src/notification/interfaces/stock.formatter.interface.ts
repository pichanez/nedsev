import { Stock } from '../../intrum/interfaces/stock';
import { ExtProperties } from '../../intrum/interfaces/stock/extProperties';

export interface IStockFormatterFactory {
  get(stock: Stock): IStockFormatter;
}

export interface IBaseStockFormatter {
  getPrice(): string;
  getFloor(): string;
  getSquare(): string;
}

export interface IStockFormatter extends IBaseStockFormatter {
  getCategory(): string;
  getShortInfo(): Array<number | string>;
}
