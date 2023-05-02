import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../domain/client';
import { Router } from '@angular/router';
import { Facture } from '../domain/facture';

const API_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root',
})

export class ClientService {

  constructor(private http: HttpClient) {
      
    }

  getAllClients(){
    return this.http.get<Client[]>(`${API_URL}/clients`);
            
  }
    
  public createClient(client: Client): Observable<any> {
    return this.http.post(`${API_URL}/addclient`, client);
  }

  public deleteClient(id: number) {
    return this.http.delete(`${API_URL}/deleteclient/${id}`);
  }
  

  
    
  public getClient(id: number): Observable<Client> {  
    return this.http.get(`${API_URL}/clients/${id}`);  
  }  
  
  public updateClient(id: number, client: Client): Observable<any> {
    return this.http.put(`${API_URL}/updateclient/${id}`, client);
  }
      
  
  
}