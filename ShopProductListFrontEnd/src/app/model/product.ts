export class Product {

  productId: number;
  productName: string;
  frequencyOfUse: number;
  price: number;
  inStock: number;
  userComment: string;

  constructor(product_id: number = null,
              product_name: string = null,
              frequency_of_use: number = 0,
              price: number = 0,
              in_stock: number = 0,
              user_comment: string = '') {
    this.productId = product_id;
    this.productName = product_name;
    this.frequencyOfUse = frequency_of_use;
    this.price = price;
    this.inStock = in_stock;
    this.userComment = user_comment;
  }

}
