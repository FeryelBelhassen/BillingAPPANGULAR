import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FactoryTarget } from '@angular/compiler';
import { Facture } from '../domain/facture';
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class FactureService {
/*
  const API_URL = 'http://localhost:8080/api';
*/
  API_URL = environment.baseUrl + 'api'

  constructor(private http: HttpClient) { }

  public getAllFactures(): Observable<Facture[]>{
    console.log('heloooo')
    return this.http.get<Facture[]>(`${this.API_URL}/factures`);
  }

  public getFactureParClient(idClient: number): Observable<Facture[]>{
    return this.http.get<Facture[]>(`${this.API_URL}/factures-per-user?idUser=`+idClient)

  }

  getFactures(): Observable<Facture[]> {
    return this.http.get<Facture[]>(`${this.API_URL}/factureclient`);
  }

  public createFacture(facture: Facture): Observable<any> {
    return this.http.post(`${this.API_URL}/addfacture`, facture);
  }

  public deleteFacture(id: number) {
    return this.http.delete(`${this.API_URL}/deletefacture/${id}`);
  }

  public getFacture(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/facture/${id}`);
  }

  public updateFacture(id: number, facture: Facture): Observable<any> {
    return this.http.put(`${this.API_URL}/updatefacture/${id}`, facture);
  }


}
