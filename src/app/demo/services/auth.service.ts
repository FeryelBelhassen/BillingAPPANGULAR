import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../api/user';
import { Router } from '@angular/router';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  loggenIn$ = new BehaviorSubject(false);
  userValue = new Observable();
    


  constructor(private http: HttpClient, public jwtHelper: JwtHelperService ) {
    
  }
 
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
  get isLoggedIn() {
    return true;
  }


 login(username: string, password: string):Observable<any>{
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
     
      httpOptions
    )
  }
  

  register(username: string, email: string, password: string, role: {id: number, name: string }[]): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
        role
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }

  getToken(){
    return localStorage.getItem('token');
  }
  refreshToken(token: string) {
    return this.http.post(AUTH_API + 'refreshtoken', { refreshToken: token}, httpOptions);
  }
 
}