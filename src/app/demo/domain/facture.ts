import { Client } from "./client";
import { Product } from "./product";

export interface Facture {
    id?:string;
    numerofacture?: string;
    client?: Client [] ;
    product?: Product[];
    datefacture?: Date;
    montanttc?: number;
    montantht?: number;
 
    

}