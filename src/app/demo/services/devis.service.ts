import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Devis } from '../domain/devis';
import { Router } from '@angular/router';

const API_URL = 'http://localhost:8081/api/';

@Injectable({
  providedIn: 'root',
})

export class DevisService {

  constructor(private http: HttpClient) {
      
    }

  
  getAllDevis(): Observable<any>{
    console.log('heloooo')
    return this.http.get(API_URL + 'devis');
  }
    
  public updateDevis(devis: Devis) {
        return this.http.put<Devis>("http://localhost:8081/api/devis" + "/"+ devis.numerodevis,devis);
        }  
  
  public deleteDevis(devis: { numerodevis: string; }) {
          return this.http.delete<Devis>("http://localhost:8081/api/devis" + "/"+ devis.numerodevis);
        }
  public createDevis(devis: {numerodevis: string}) {
          return this.http.post<Devis>("http://localhost:8081/api/devis", devis);
        }
  
  
}