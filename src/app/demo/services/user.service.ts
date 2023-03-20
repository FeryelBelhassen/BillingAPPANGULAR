import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../domain/user';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Useer } from '../domain/useer';

const API_URL = 'http://localhost:8081/api/test/';

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

    getAllUsers() {
      return this.http.get<any>('http://localhost:8081/api/users')
      //return this.http.get<any>('assets/demo/data/products.json')
          .toPromise()
          .then(res => res.data as User[])
          .then(data => data);
          
  }
  /*getAllUsers(): Observable<User[]>{
    console.log('heloooo')
    return this.http.get<User[]>('http://localhost:8081/api/users');
      }*/
     
  
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