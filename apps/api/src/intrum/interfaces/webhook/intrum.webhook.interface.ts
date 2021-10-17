import { Expose, Transform, Type } from 'class-transformer';

export class BaseWebHookRequest {
  subject_type: string;

  @Type(() => Number)
  subject_type_id: number;

  event: EventType;

  object_type: string;

  @Type(() => Number)
  object_sub_type: number;

  @Type(() => Number)
  object_sub_id: number;
}

enum EventType {
  CREATE = 'create',
  EDIT = 'edit',
}

class BaseSnapshot {
  merge: WebHookMerge[];
}

class StockSnapshot extends BaseSnapshot {
  @Type(() => Number)
  id: number;

  @Type(() => Number)
  group_id: number;

  @Type(() => Number)
  parent: number;

  parentname: string;

  name: string;

  @Type(() => Number)
  author: number;

  @Type(() => Number)
  count: number;

  date_add: string;

  @Type(() => Number)
  publish: number;

  @Type(() => Number)
  copy: number;

  @Type(() => Number)
  type: number;

  typename: string;

  stock_activity_type: string;

  stock_activity_date: string;

  related_with_customer: string;

  // "stock_creator_id:
  // "shared_managers": []
  extproperty: Property[];
}

export class StockWebHookRequest extends BaseWebHookRequest {
  @Type(() => StockSnapshot)
  snapshot: StockSnapshot;
}

export class SuccessMessage {
  message: string;
}

class MergePairBody {
  type: string;
  value: number;
}
export class WebHookMerge {
  [key: string]: MergePairBody;
}

class PropertyBody {
  @Type(() => Number)
  id: number;
  type: string;
  value: any;
}

class Property {
  [key: string]: {
    id: number;
  };
}
