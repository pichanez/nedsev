export interface IStockNotificationBuilder {
  produceSaleTitle(): void;
  produceRentTitle(): void;
  producePrepaymentTitle(): void;
  produceShortInfo(): void;
  produceBody(): void;
  produceBottom(): void;
}
