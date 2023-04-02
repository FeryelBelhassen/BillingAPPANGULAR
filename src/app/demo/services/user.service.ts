import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../domain/user';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

const API_URL = 'http://localhost:8080/api/users';


@Injectable({
  providedIn: 'root',
})

export class UserService {

  private currentUser!: BehaviorSubject<User>;
  private user!: Observable<User>;

  
  constructor(private authService : AuthService, private router: Router,
    private http: HttpClient) {
      this.currentUser = new BehaviorSubject<User>(this.authService.userValue);
      this.user = this.currentUser.asObservable();
    }

  
  getAllUsers(): Observable<any>{
    console.log('heloooo')
    return this.http.get<User[]>(`${API_URL}`);
  }
    
  public updateUser(user: User, id:number) {
        return this.http.put<User>(`${API_URL}/${id}`, user);
        }  
  
  /*public deleteUser(user: { username: string; }) {
          return this.http.delete<User>(API_URL + "/"+ user.username);
        }*/
  public createUser(user: {username: string}) {
          return this.http.post<User>(API_URL, user);
        }
    deleteUser(id: number): Observable<Object>{
          return this.http.delete(`${API_URL}/${id}`);
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