import { Client } from "./client";

export interface Facture {
    id?:string;
    numerofacture?: string;
    client?: Set<Client>;
    datefacture?: Date;
    montanttc?: number;
    montantht?: number;
 
    

}