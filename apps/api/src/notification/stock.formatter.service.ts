import {
  IBaseStockFormatter,
  IStockFormatter,
  IStockFormatterFactory,
} from './interfaces/stock.formatter.interface';
import { Category, PricePeriod, Stock } from '../intrum/interfaces/stock';
import { ExtProperties } from '../intrum/interfaces/stock/extProperties';

class StockFormatter implements IBaseStockFormatter {
  protected stock: Stock;
  protected properties: ExtProperties;

  constructor(stock: Stock) {
    this.stock = stock;
    this.properties = this.stock.properties;
  }

  public getPrice(): string {
    const { value, period } = this.stock.price;
    let price = `${value.toLocaleString('ru-RU')} ₽`;

    if (period == PricePeriod.MONTH) {
      price += '/месяц';
    }

    return price;
  }

  public getFloor(): string {
    return `${this.properties.floor}/${this.properties.floorsTotal} этаж`;
  }

  public getSquare(): string {
    return `${this.properties.square} м²`;
  }

  public getLivingSpace(): string {
    return `${this.properties.livingSpace} м²`;
  }
}

class RoomFormatter extends StockFormatter implements IStockFormatter {
  public getCategory(): string {
    return 'комната';
  }

  public getShortInfo(): Array<number | string> {
    return [
      this.stock.properties.series,
      this.getLivingSpace(),
      this.getFloor(),
    ];
  }
}

class FlatFormatter extends StockFormatter implements IStockFormatter {
  public getCategory(): string {
    if (this.properties.studio) return 'студия';
    return `${this.properties.rooms}-комн. квартира`;
  }

  public getShortInfo(): Array<number | string> {
    return [this.stock.properties.series, this.getSquare(), this.getFloor()];
  }
}

class NewFlatFormatter extends FlatFormatter implements IStockFormatter {
  public getCategory(): string {
    if (this.properties.studio) return 'студия в новостройке';
    return `${this.properties.rooms}-комн. квартира в новостройке`;
  }

  getShortInfo(): Array<number | string> {
    return super.getShortInfo();
  }
}

export class StockFormatterFactory implements IStockFormatterFactory {
  get(stock: Stock): IStockFormatter {
    switch (stock.category) {
      case Category.ROOM:
        return new RoomFormatter(stock);
      case Category.FLAT:
        return new FlatFormatter(stock);
      case Category.NEW_FLAT:
        return new NewFlatFormatter(stock);
    }
  }
}
