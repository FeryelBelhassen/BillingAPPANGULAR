import { Client } from "./client";
import { Product } from "./product";

export class Facture {
    id?:string;
    numerofacture?: string;
    client?: Client []  ;
    product?:  Array <Product> ;
    datefacture?: Date;
    montanttc?: number;
    montantht?: number;   
}

