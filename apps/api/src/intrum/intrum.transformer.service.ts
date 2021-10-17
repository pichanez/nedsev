import {
  flatProperties,
  newFlatProperties,
  roomProperties,
  SALE,
  stockProperties,
  StockTypes,
  webHookProperties,
} from './constants';
import {
  IStockTransformer,
  IStockTransformerFactory,
} from './interfaces/stock.transformer.interface';
import { StockWebHookRequest } from './interfaces/webhook/intrum.webhook.interface';
import {
  Category,
  IntrumFlatCategory,
  PricePeriod,
  PropertyType,
  Stock,
  Type,
} from './interfaces/stock';
import { pickProperties } from './intrum.utils';

class StockTransformer implements IStockTransformer {
  protected dryStock: StockWebHookRequest;
  protected _stock: any;
  public stock: Stock;

  constructor(dryStock: StockWebHookRequest) {
    this.dryStock = dryStock;
  }

  /**
   * 1. Взять основные свойства (возможна конвертация)
   * 2. Взять параметры и склеить с основными (возможна конвертация)
   * 3. Взять параметры и создать с параметрами
   */
  protected commonFormat() {
    const { snapshot } = this.dryStock;
    this._stock = pickProperties(webHookProperties, snapshot);
    this._stock = {
      ...this._stock,
      ...pickProperties(stockProperties, snapshot.extproperty, true),
    };

    this.setType();
    this.setPropertyType();
    this.setPrice();

    this.stock = this._stock;
    // setLocation
    // setDates
  }

  private setPrice(): void {
    this._stock.price = { value: this._stock.price };

    if (this._stock.type == Type.RENT) {
      this._stock.price.period = PricePeriod.MONTH;
    }
  }

  private setType(): void {
    this._stock.type = SALE.includes(this._stock.type) ? Type.SALE : Type.RENT;
  }

  private setPropertyType(): void {
    this._stock.propertyType = PropertyType.LIVING;
  }

  protected setCategory(category: Category) {
    this.stock.category = category;
  }

  protected getExtProperties(): any {
    return flatProperties;
  }

  protected setExtProperties(properties): void {
    this._stock.properties = pickProperties(
      properties,
      this.dryStock.snapshot.extproperty,
      true
    );
  }

  protected getCategoryName(): Category {
    return Category.FLAT;
  }

  public format(): Stock {
    this.commonFormat();
    this.setCategory(this.getCategoryName());

    this.setExtProperties(this.getExtProperties());

    this.stock.properties = this._stock.properties;
    return this.stock;
  }
}

class FlatTransformer extends StockTransformer implements IStockTransformer {
  protected getCategoryName(): Category {
    return Category.FLAT;
  }

  protected getExtProperties(): any {
    return flatProperties;
  }
}

class RoomTransformer extends FlatTransformer implements IStockTransformer {
  protected getCategoryName(): Category {
    return Category.ROOM;
  }

  protected getExtProperties(): any {
    return roomProperties;
  }
}

class NewFlatTransformer extends FlatTransformer implements IStockTransformer {
  protected getCategoryName(): Category {
    return Category.NEW_FLAT;
  }

  protected getExtProperties(): any {
    return newFlatProperties;
  }
}

export class StockTransformerFactory implements IStockTransformerFactory {
  public get(dryStock: StockWebHookRequest): IStockTransformer {
    const { FLATS_AND_ROOMS } = StockTypes;
    const { type, extproperty } = dryStock.snapshot;
    if (type == FLATS_AND_ROOMS) {
      const category = extproperty['776'].value; // TODO: Remove hardcoded category id

      if (category == IntrumFlatCategory.ROOM)
        return new RoomTransformer(dryStock);

      if (category == IntrumFlatCategory.FLAT) {
        return new FlatTransformer(dryStock);
      }

      if (category == IntrumFlatCategory.NEW_FLAT) {
        return new NewFlatTransformer(dryStock);
      }
    }
  }
}
