import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../domain/user';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserComponent } from '../components/user/user.component';
import { Useer } from '../domain/useer';
import {environment} from "../../../environments/environment";



@Injectable({
  providedIn: 'root',
})

export class UserService {
  API_URL = environment.baseUrl + 'api';

  private currentUser!: BehaviorSubject<Useer>;
  private user!: Observable<Useer>;


  constructor(private authService : AuthService, private router: Router,
    private http: HttpClient) {
      this.currentUser = new BehaviorSubject<Useer>(this.authService.userValue);
      this.user = this.currentUser.asObservable();
    }


  public getAllUsers(): Observable<any>{
    console.log('heloooo')
    return this.http.get<User[]>(`${this.API_URL}/users`);
  }

  public createUser(user: User): Observable<any> {
    return this.http.post(`${this.API_URL}/adduser`, user);
  }

  public deleteUser(id: number) {
    return this.http.delete(`${this.API_URL}/deleteuser/${id}`);
  }



  getUserById(id: number) {
    return this.http.get<User>(`${this.API_URL}/user/${id}`);
  }


  public updateUser(id:number,user: User): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/updateuser/${id}`, user);
  }

  getPublicContent(): Observable<any> {
    return this.http.get(this.API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(this.API_URL + 'user', { responseType: 'text' });
  }

  getAgentBoard(): Observable<any> {
    return this.http.get(this.API_URL + 'agent', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(this.API_URL + 'admin', { responseType: 'text' });
  }

  getMagasinierBoard(): Observable<any> {
    return this.http.get(this.API_URL + 'magasinier', { responseType: 'text' });
  }

  getClientBoard(): Observable<any> {
    return this.http.get(this.API_URL + 'client', { responseType: 'text' });
  }



}
