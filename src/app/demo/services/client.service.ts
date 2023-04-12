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
    
  public updateClient(client: Client) {
        return this.http.put<Client>("http://localhost:8081/api/client" + "/"+ client.username,client);
        }  
  
  public deleteClient(client: { username: string; }) {
          return this.http.delete<Client>("http://localhost:8081/api/client" + "/"+ client.username);
        }
  public createClient(client: Client): Observable<any> {
      return this.http.post(`${API_URL}/addclient`, client);
    }
      
  
  
}