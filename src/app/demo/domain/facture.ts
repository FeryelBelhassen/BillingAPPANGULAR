import { Client } from "./client";
import { Product } from "./product";

export class Facture {
    id?:number;
    numerofacture?: string;
    client?: Client []  ;
    product?: Product[];
    datefacture?: Date;
    montanttc?: number;
    montantht?: number;   
}

