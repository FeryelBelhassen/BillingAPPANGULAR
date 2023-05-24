import { Client } from "./client";
import { Product } from "./product";

export class Facture {
  constructor( numerofacture: string, client: Client[], product: Product[], datefacture: Date, montanttc: number, montantht: number, total: number) {
    this.numerofacture = numerofacture;
    this.client = client;
    this.product = product;
    this.datefacture = datefacture;
    this.montanttc = montanttc;
    this.montantht = montantht;
    this.total = total;
  }
    id?:number;
    numerofacture: string;
    client: Client []  ;
    product: Product[];
    datefacture: Date;
    montanttc: number;
    montantht: number;
    total: number;

}

