import { Product } from "./product";

export class Devis {
    constructor( numerodevis: string,  product: Product[], datedevis: Date, price: number) {
      this.numerodevis = numerodevis;
      this.product = product;
      this.datedevis = datedevis;
      this.price = price;
    }

    id?:number;
    numerodevis?: string;
    datedevis?: Date;
    price?: number;
    product?: Product[];

  
  }
  

