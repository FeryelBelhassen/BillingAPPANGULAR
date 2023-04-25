import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Devis } from '../domain/devis';
import { Router } from '@angular/router';

const API_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root',
})

export class DevisService {

  constructor(private http: HttpClient) {
      
    }

  
    public getAllDevis(): Observable<any>{
      console.log('heloooo')
      return this.http.get<Devis[]>(`${API_URL}/devis`);
    }
  
    public createDevis(devis: Devis): Observable<any> {
      return this.http.post(`${API_URL}/adddevis`, devis);
    }
  
    public deleteDevis(id: number) {
      return this.http.delete(`${API_URL}/deletedevis/${id}`);
    }
    
    public getDevis(id: number): Observable<any> {  
      return this.http.get(`${API_URL}/devis/${id}`);  
    }  
  
    public updateDevis(id: number, devis: Devis): Observable<any> {
      return this.http.put(`${API_URL}/updatedevis/${id}`, devis);
    }
  
  
  
}