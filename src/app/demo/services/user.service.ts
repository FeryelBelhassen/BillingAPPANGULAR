import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../domain/user';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserComponent } from '../components/user/user.component';
import { Useer } from '../domain/useer';

const API_URL = 'http://localhost:8080/api';


@Injectable({
  providedIn: 'root',
})

export class UserService {

  private currentUser!: BehaviorSubject<Useer>;
  private user!: Observable<Useer>;

  
  constructor(private authService : AuthService, private router: Router,
    private http: HttpClient) {
      this.currentUser = new BehaviorSubject<Useer>(this.authService.userValue);
      this.user = this.currentUser.asObservable();
    }

  
  public getAllUsers(): Observable<any>{
    console.log('heloooo')
    return this.http.get<User[]>(`${API_URL}/users`);
  }

  public createUser(user: User): Observable<any> {
    return this.http.post(`${API_URL}/adduser`, user);
  }

  public deleteUser(id: number) {
    return this.http.delete(`${API_URL}/deleteuser/${id}`);
  }
  
  public getUser(id: number): Observable<any> {  
    return this.http.get(`${API_URL}/users/${id}`);  
  }  

  public updateUser(id:number,user: User): Observable<User> {
    return this.http.put<User>(`${API_URL}/updateuser/${id}`, user);
  }
  
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }
  
  getAgentBoard(): Observable<any> {
    return this.http.get(API_URL + 'agent', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getMagasinierBoard(): Observable<any> {
    return this.http.get(API_URL + 'magasinier', { responseType: 'text' });
  }

  getClientBoard(): Observable<any> {
    return this.http.get(API_URL + 'client', { responseType: 'text' });
  }

  
  
}