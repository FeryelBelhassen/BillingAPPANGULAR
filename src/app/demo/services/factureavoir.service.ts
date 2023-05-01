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

  public getAllFactureAvoir(): Observable<FactureAvoir[]>{
    console.log('heloooo')
    return this.http.get<FactureAvoir[]>(`${API_URL}/facturesavoir`);
  }

  public createFactureAvoir(factureavoir: FactureAvoir): Observable<any> {
    return this.http.post(`${API_URL}/addfactureavoir`, factureavoir);
  }

  public deleteFactureAvoir(id: number) {
    return this.http.delete(`${API_URL}/deletefactureavoir/${id}`);
  }
  
  public getFactureavoir(id: number): Observable<any> {  
    return this.http.get(`${API_URL}/factureavoir/${id}`);  
  }  

  public updateFactureAvoir(id: number, factureavoir: FactureAvoir): Observable<any> {
    return this.http.put(`${API_URL}/updatefactureavoir/${id}`, factureavoir);
  }


 

}