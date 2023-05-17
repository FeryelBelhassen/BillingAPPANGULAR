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

  public getAllFactures(): Observable<Facture[]>{
    console.log('heloooo')
    return this.http.get<Facture[]>(`${API_URL}/factures`);
  }

  getFactures(): Observable<Facture[]> {
    return this.http.get<Facture[]>(`${API_URL}/factureclient`);
  }
  
  public createFacture(facture: Facture): Observable<any> {
    return this.http.post(`${API_URL}/addfacture`, facture);
  }

  public deleteFacture(id: number) {
    return this.http.delete(`${API_URL}/deletefacture/${id}`);
  }
  
  public getFacture(id: number): Observable<any> {  
    return this.http.get(`${API_URL}/facture/${id}`);  
  }  

  public updateFacture(id: number, facture: Facture): Observable<any> {
    return this.http.put(`${API_URL}/updatefacture/${id}`, facture);
  }

  
}