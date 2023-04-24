import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FactoryTarget } from '@angular/compiler';
import { Facture } from '../domain/facture';


const API_URL = 'http://localhost:8080/api';
@Injectable({
  providedIn: 'root'
})
export class FactureService {
  id(id: any, factureService: FactureService) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  public getAllFactures(): Observable<any>{
    console.log('heloooo')
    return this.http.get<Facture[]>(`${API_URL}/factures`);
  }

  public createFacture(facture: Facture): Observable<any> {
    return this.http.post(`${API_URL}/addfacture`, facture);
  }

  public updateFacture(facture: Facture) {
        return this.http.put<Facture>("http://localhost:8081/api/updatefacture" + "/"+ facture.id,facture);
        }  
  
  public deleteFacture(facture: { id: string; }) {
          return this.http.delete<Facture>("http://localhost:8081/api/deletefacture" + "/"+ facture.id);
        }
  
}