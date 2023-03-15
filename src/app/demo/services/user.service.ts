import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../api/user';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';



const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private currentUser!: BehaviorSubject<User>;
  private user!: Observable<User>;

  
  constructor(private authService : AuthService, private router: Router,
    private http: HttpClient) {}


  getAllUsers() {
      return this.http.get<User[]>('http://localhost:8081/api/user');
      }
  
  public updateUser(user: User) {
        return this.http.put<User>("http://localhost:8081/api/user" + "/"+ user.username,user);
        }  
  
  public deleteUser(user: { username: string; }) {
          return this.http.delete<User>("http://localhost:8081/api/user" + "/"+ user.username);
        }
  public createUser(user: {username: string}) {
          return this.http.post<User>("http://localhost:8081/api/user", user);
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