export class Product {
  constructor( code: number, designation: string, quantity: number, supplier: string, price: number) {
    this.code = code;
    this.designation = designation;
    this.quantity = quantity;
    this.supplier = supplier;
    this.price = price;
  }
    id?: number;
    code: number;
    designation: string;
    quantity: number;
    supplier: string;
    price: number;


}
