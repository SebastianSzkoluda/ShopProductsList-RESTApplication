export class Product {

  product_id: number;
  product_name: string;
  frequency_of_use: number;
  amount: number;
  in_stock: number;

  constructor(product_id: number = 0, product_name: string = null, frequency_of_use: number = 0, amount: number = 0, in_stock: number = 0) {
    this.product_id = product_id;
    this.product_name = product_name;
    this.frequency_of_use = frequency_of_use;
    this.amount = amount;
    this.in_stock = in_stock;
  }

}
