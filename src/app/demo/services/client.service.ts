import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../domain/client';
import { Router } from '@angular/router';
import { Facture } from '../domain/facture';
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root',
})

export class ClientService {

/*
  const API_URL = 'http://localhost:8080/api';
*/
  API_URL = environment.baseUrl+'api'
  constructor(private http: HttpClient) {

    }

  getAllClients(){
    return this.http.get<Client[]>(`${this.API_URL}/clients`);

  }

  public createClient(client: Client): Observable<any> {
    return this.http.post(`${this.API_URL}/addclient`, client);
  }

  public deleteClient(id: number) {
    return this.http.delete(`${this.API_URL}/deleteclient/${id}`);
  }




  public getClient(id: number): Observable<Client> {
    return this.http.get(`${this.API_URL}/clients/${id}`);
  }

  public updateClient(id: number, client: Client): Observable<any> {
    return this.http.put(`${this.API_URL}/updateclient/${id}`, client);
  }



}
