import { Stock, Type } from '../intrum/interfaces/stock';
import { IStockFormatter } from './interfaces/stock.formatter.interface';
import { IStockNotificationBuilder } from './interfaces/notification.builder.interface';
import { StockFormatterFactory } from './stock.formatter.service';

class StockMessage {
  public content: string = '';
}

export class StockMessageBuilder implements IStockNotificationBuilder {
  private readonly stock: Stock;
  private message: StockMessage;

  private formatterFactory: StockFormatterFactory;
  private formatter: IStockFormatter;

  constructor(stock: Stock) {
    this.stock = stock;

    this.formatterFactory = new StockFormatterFactory();
    this.formatter = this.formatterFactory.get(this.stock);

    this.reset();
  }

  public reset(): void {
    this.message = new StockMessage();
  }

  public produceNewTitle(): void {
    switch (this.stock.type) {
      case Type.SALE:
        this.produceSaleTitle();
        break;
      case Type.RENT:
        this.produceRentTitle();
        break;
    }
  }

  public producePrepaymentTitle(): void {
    switch (this.stock.type) {
      case Type.SALE:
        this.produceSalePrepaymentTitle();
        break;
      case Type.RENT:
        this.produceRentPrepaymentTitle();
        break;
    }
  }

  public produceManager(manager: object): void {
    this.message.content += `Ответственный: ${manager.name} ${manager.surname}`;
  }

  private produceSaleTitle(): void {
    this.message.content +=
      '✅ В продаже ' + this.formatter.getCategory() + this.getAddress();
  }

  public produceSalePrepaymentTitle(): void {
    this.message.content +=
      '⚠️ Закрепился покупатель за объектом' +
      '«' +
      this.formatter.getCategory() +
      this.getAddress() +
      '»';
  }

  public produceRentPrepaymentTitle(): void {
    this.message.content +=
      '⚠️ ' + this.formatter.getCategory() + this.getAddress() + ' сдана';
  }

  private produceRentTitle(): void {
    this.message.content +=
      '📮 Сдаётся ' + this.formatter.getCategory() + this.getAddress();
  }

  private getAddress(): string {
    const { street, house } = this.stock;
    return ` по адресу ${street}, ${house}\n\n`;
  }

  public producePrice(): void {
    this.message.content += `Стоимость: ${this.formatter.getPrice()}\n\n`;
  }

  public getMessage(): StockMessage {
    const result = this.message;
    this.reset();
    return result;
  }

  public produceShortInfo(): void {
    this.message.content +=
      '⚙️ ' + this.formatter.getShortInfo().join(' • ') + '\n\n';
  }
}
