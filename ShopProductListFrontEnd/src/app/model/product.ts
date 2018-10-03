export class Product {

  productId: number;
  productName: string;
  frequencyOfUse: number;
  amount: number;
  inStock: number;
  userComment: string;

  constructor(product_id: number = null,
              product_name: string = null,
              frequency_of_use: number = 0,
              amount: number = 0,
              in_stock: number = 0,
              user_comment: string = '') {
    this.productId = product_id;
    this.productName = product_name;
    this.frequencyOfUse = frequency_of_use;
    this.amount = amount;
    this.inStock = in_stock;
    this.userComment = user_comment;
  }

}
