import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FactoryTarget } from '@angular/compiler';
import { FactureAvoir } from '../domain/factureavoir';
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class FactureAvoirService {
/*
  const API_URL = 'http://localhost:8080/api';
*/
  API_URL = environment.baseUrl + 'api'
  id(id: any, factureavoirService: FactureAvoirService) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  public getAllFactureAvoir(): Observable<FactureAvoir[]>{
    console.log('heloooo')
    return this.http.get<FactureAvoir[]>(`${this.API_URL}/facturesavoir`);
  }

  public createFactureAvoir(factureavoir: FactureAvoir): Observable<any> {
    return this.http.post(`${this.API_URL}/addfactureavoir`, factureavoir);
  }

  public deleteFactureAvoir(id: number) {
    return this.http.delete(`${this.API_URL}/deletefactureavoir/${id}`);
  }

  public getFactureavoir(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/factureavoir/${id}`);
  }

  public updateFactureAvoir(id: number, factureavoir: FactureAvoir): Observable<any> {
    return this.http.put(`${this.API_URL}/updatefactureavoir/${id}`, factureavoir);
  }




}
