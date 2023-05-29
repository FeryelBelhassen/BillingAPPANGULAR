import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produit } from '../domain/produit';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable()
export class ProductService {
/*
  const API_URL = 'http://localhost:8080/api';
*/
  API_URL = environment.baseUrl+'api';

    constructor(private http: HttpClient) { }



  public getProduits(): Observable<any>{
    console.log('heloooo')
    return this.http.get<Produit[]>(`${this.API_URL}/produits`);
  }


  public createProduit(product: Produit): Observable<any> {
    return this.http.post(`${this.API_URL}/addproduit`, product);
  }

  public updateProduit(id: number, product: Produit): Observable<any> {
    return this.http.put(`${this.API_URL}/updateproduit/${id}`, product);
  }

  public deleteProduit(id: number) {
    return this.http.delete(`${this.API_URL}/deleteproduit/${id}`);
  }


    public getProduit(id: number): Observable<any> {
      return this.http.get(`${this.API_URL}/produits/${id}`);
    }



}
