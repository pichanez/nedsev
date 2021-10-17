import { HttpService, Injectable } from '@nestjs/common';
import {
  EventTypes,
  FlatCategories,
  FlatStatuses,
  IFlatStock,
  PREPAYMENT_TITLE,
  RENT_TITLE,
  SALE,
  SALE_TITLE,
  StockTypes,
  webHookProperties,
  ROOM_CATEGORY_NAME,
  FLAT_CATEGORY_NAME,
  STUDIO_CATEGORY_NAME,
} from './constants';

import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { IntrumService } from './intrum';

class StockFactory {
  public get(stockType, stock) {
    switch (Number(stockType)) {
      case StockTypes.FLATS_AND_ROOMS:
        return new Flat(stock);
    }
  }
}

export class Stock {
  protected dryStock: any;
  public stock: IFlatStock;
  public intrum: IntrumService;

  constructor(stock) {
    this.dryStock = stock;
    this.formatStock();
  }

  // Only webhook
  protected formatStock() {
    const { snapshot } = this.dryStock;

    this.dryStock.snapshot.event = this.dryStock.event;

    this.stock = this.pickProperties(webHookProperties, snapshot);
  }

  protected getCategory() {
    const { category, studio, rooms } = this.stock.properties;
    const { ROOM, FLAT, NEW_FLAT } = FlatCategories;

    if (category == ROOM) return ROOM_CATEGORY_NAME;

    if (category == FLAT || NEW_FLAT) {
      if (studio) return STUDIO_CATEGORY_NAME;
      return `${rooms}${FLAT_CATEGORY_NAME}`;
    }
  }

  protected getOperationType(): string {
    const { operationType } = this.stock;
    if (SALE.includes(operationType)) {
      return SALE_TITLE;
    } else {
      return RENT_TITLE;
    }
  }

  protected pickProperties(
    aObj: object,
    bObj: object,
    withValue: boolean = false
  ): any {
    const result = {};
    Object.entries(aObj).forEach((entry) => {
      const [key, value] = entry;
      result[key] = withValue ? bObj[value].value : bObj[value];
      if (!isNaN(Number(result[key]))) {
        result[key] = Number(result[key]);
      }
    });
    return result;
  }
}

class Flat extends Stock {
  constructor(stock) {
    super(stock);
  }

  protected getLivingSquare(square: number): string {
    return `${square} м²`;
  }

  public getMessage() {
    const { ACTIVE, PREPAYMENT } = FlatStatuses;
    const { merge, event } = this.stock;

    // TODO: Добавить проверку на publish
    // if (event == EventTypes.CREATE) {
    //   return this.getNewMessage();
    // }

    // if (flatProperties.status in merge) {
    //   switch (this.stock.properties.status) {
    //     case ACTIVE:
    //       return this.getNewMessage();
    //     case PREPAYMENT:
    //       return this.getPrepaymentMessage();
    //   }
    // } else return;
  }

  private getPrepaymentMessage() {
    const { street, house } = this.stock.properties;
    return `${PREPAYMENT_TITLE} по адресу ${street}, ${house}`;
  }

  //   private getNewMessage() {
  //     const { price } = this.stock.properties;
  //
  //     return `${this.getTitle()}
  //
  // ${this.getShortInfo()}
  //
  // 💵 Стоимость: ${price.toLocaleString('ru-RU')} ₽
  //
  // Номер объекта: ${this.stock.id}
  //     `;
  //   }
}

@Injectable()
export class AppService {
  constructor(private intrum: IntrumService) {}
  getData(stock) {
    const newStock = new StockFactory().get(stock.snapshot.type, stock);
    const message = newStock.getMessage();
    console.log(stock);
    // if (message !== undefined) {
    //   this.bot.telegram.sendMessage('986567446', message);
    // } else return;

    return { message: 'ok' };
  }
}
