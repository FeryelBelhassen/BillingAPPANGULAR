import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FactoryTarget } from '@angular/compiler';
import { Facture } from '../domain/facture';
//import { Factures } from '../models/factures.model';


@Injectable({
  providedIn: 'root'
})
export class FactureService {
  id(id: any, factureService: FactureService) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  getAllFactures() {
    return this.http.get<any>('http://localhost:8081/api/facture')
    //return this.http.get<any>('assets/demo/data/products.json')
        .toPromise()
        .then(res => res.data as Facture[])
        .then(data => data);
        
}

  public updateFacture(facture: Facture) {
        return this.http.put<Facture>("http://localhost:8081/api/facture" + "/"+ facture.numerofacture,facture);
        }  
  
  public deleteFacture(facture: { numerofacture: string; }) {
          return this.http.delete<Facture>("http://localhost:8081/api/facture" + "/"+ facture.numerofacture);
        }
  public createFacture(facture: {numerofacture: string}) {
          return this.http.post<Facture>("http://localhost:8081/api/facture", facture);
        }

}