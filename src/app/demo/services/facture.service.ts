import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FactoryTarget } from '@angular/compiler';
import { Facture } from '../domain/facture';


const API_URL = 'http://localhost:8080/api/factures';
@Injectable({
  providedIn: 'root'
})
export class FactureService {
  id(id: any, factureService: FactureService) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  getAllFactures() {
    return this.http.get<Facture[]>(`${API_URL}`);
          
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