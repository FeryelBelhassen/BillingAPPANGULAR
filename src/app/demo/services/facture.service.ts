import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FactoryTarget } from '@angular/compiler';
import { Facture } from '../api/facture';
//import { Factures } from '../models/factures.model';

const baseUrl = 'http://localhost:8081/api/factures';
@Injectable({
  providedIn: 'root'
})
export class FactureService {
  id(id: any, factureService: FactureService) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  getAllFactures() {
    return this.http.get<Facture[]>('http://localhost:8081/api/factures');
    }
   

  get(id: any): Observable<Facture> {
    return this.http.get<Facture>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByNumero(numero: any): Observable<Facture[]> {
    return this.http.get<Facture[]>(`${baseUrl}?title=${numero}`);
  }
}

