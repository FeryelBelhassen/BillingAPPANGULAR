import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Devis } from '../domain/devis';
import { Router } from '@angular/router';
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root',
})

export class DevisService {
/*
  const API_URL = 'http://localhost:8080/api';
*/
  API_URL = environment.baseUrl+'api'

  constructor(private http: HttpClient) {

    }


    public getAllDevis(): Observable<any>{
      console.log('heloooo')
      return this.http.get<Devis[]>(`${this.API_URL}/devis`);
    }

    public createDevis(devis: Devis): Observable<any> {
      return this.http.post(`${this.API_URL}/adddevis`, devis);
    }

    public deleteDevis(id: number) {
      return this.http.delete(`${this.API_URL}/deletedevis/${id}`);
    }

    public getDevis(id: number): Observable<any> {
      return this.http.get(`${this.API_URL}/devis/${id}`);
    }

    public updateDevis(id:number,devis: Devis): Observable<Devis> {
      return this.http.put<Devis>(`${this.API_URL}/updatedevis/${id}`, devis);
    }



}
