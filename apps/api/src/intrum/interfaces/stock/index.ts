import { ExtProperties } from './extProperties';
import { FlatStatuses } from '../../../app/constants';

export interface Stock {
  status: FlatStatuses;
  externalId: number;
  creationDate: Date;
  updatedDate: Date;
  street: string;
  region: string;
  district: string;
  house: string;
  type: Type;
  propertyType: PropertyType;
  category: Category;
  author: number;
  price: Price;

  properties: ExtProperties;
}

export enum PricePeriod {
  MONTH = 'month',
}

export interface Price {
  value: number;
  period?: PricePeriod;
}

enum LivingCategory {
  ROOM,
  FLAT,
  NEW_FLAT,
}

export const Category = {
  ...LivingCategory,
};

export type Category = LivingCategory;

export enum PropertyType {
  LIVING = 'living',
  COMMERCIAL = 'commercial',
}

export enum Type {
  SALE = 'sale',
  RENT = 'rent',
}

export enum IntrumFlatCategory {
  ROOM = 'комнаты и доли',
  FLAT = 'квартира вторичка',
  NEW_FLAT = 'квартира новостройка',
}

interface IGeo {
  latitude: number;
  longitude: number;
}
