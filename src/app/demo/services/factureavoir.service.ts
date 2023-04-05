import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FactoryTarget } from '@angular/compiler';
import { FactureAvoir } from '../domain/factureavoir';


const API_URL = 'http://localhost:8080/api';
@Injectable({
  providedIn: 'root'
})
export class FactureAvoirService {
  id(id: any, factureavoirService: FactureAvoirService) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  getAllFactureAvoir() {
    return this.http.get<FactureAvoir[]>(`${API_URL}` + '/factureavoir');
          
  }

  public updateFactureAvoir(factureavoir: FactureAvoir) {
        return this.http.put<FactureAvoir>("http://localhost:8081/api/updatefactureavoir" + "/"+ factureavoir.numfactureavoir,factureavoir);
        }  
  
  public deleteFacture(facture: { numfactureavoir: string; }) {
          return this.http.delete<FactureAvoir>("http://localhost:8081/api/deletefactureavoir" + "/"+ facture.numfactureavoir);
        }
  public createFacture(facture: {numfactureavoir: string}) {
          return this.http.post<FactureAvoir>("http://localhost:8081/api/deletefactureavoir", facture);
        }

}