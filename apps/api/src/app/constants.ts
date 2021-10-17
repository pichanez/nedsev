export enum FlatStatuses {
  ACTIVE = 'В продаже',
  PREPAYMENT = 'Внесён аванс',
}

export enum EventTypes {
  CREATE = 'create',
  EDIT = 'edit',
}

export enum OperationTypes {
  SALE = 'SALE',
  RENT = 'RENT',
}

export const SALE = [3, 19, 8, 13, 15];

export const SALE_TITLE = '✅ В продаже';
export const RENT_TITLE = '📮 Сдаётся';
export const PREPAYMENT_TITLE = '⚠️ Закрепился покупатель за объектом';

export const ROOM_CATEGORY_NAME = 'комната';
export const FLAT_CATEGORY_NAME = '-комн. квартира';
export const STUDIO_CATEGORY_NAME = 'студия';

export enum FlatCategories {
  ROOM = 'комнаты и доли',
  FLAT = 'квартира вторичка',
  NEW_FLAT = 'квартира новостройка',
}

export enum StockTypes {
  FLATS_AND_ROOMS = 1,
}

interface ICommonProperties {
  id: number;
  author: number;
  operationType: number;
  publish: number;
}

interface IWebHookProperties extends ICommonProperties {
  type: number;
  merge: object; // fix
  event: EventTypes;
}

const commonProperties = {
  externalId: 'id',
  author: 'author',
  type: 'parent',
};

export const webHookProperties = {
  type: 'type',
  merge: 'merge',
  event: 'event',
  ...commonProperties,
};

export const stockProperties = {
  status: 1196,
  geo: 487,
  photos: 474,
  category: 776,
  region: 481,
  city: 482,
  district: 630,
  street: 667,
  house: 484,
  price: 470,
  description: 624,
};

interface IFlatProperties {
  status: FlatStatuses;
  geo: 487;
  photos: String[];
  category: FlatCategories;
  studio: number;
  rooms: number;
  square: number;
  livingSpace: number;
  kitchenSpace: number;
  region: string;
  city: string;
  district: string;
  street: string;
  house: number;
  floor: number;
  floorsTotal: number;
  price: number;
  description: string;
  subname: string;
}

export interface IFlatStock extends IWebHookProperties {
  properties: IFlatProperties;
}

interface ITelegramMedia {
  type: string;
  media: string;
}
