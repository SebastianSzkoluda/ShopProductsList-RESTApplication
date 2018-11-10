export class ProductToBuy {

  productId: number;
  productName: string;
  shop: string;
  amountToBuy: number;

  constructor(product_id: number = null,
              product_name: string = null,
              shop: string = null,
              amountToBuy: number = null) {
    this.productId = product_id;
    this.productName = product_name;
    this.shop = shop;
    this.amountToBuy = amountToBuy;
  }

}
