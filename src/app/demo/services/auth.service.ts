import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Useer } from '../domain/useer';
import { User } from '../domain/user';
import jwtDecode from 'jwt-decode';
import * as  jwt from 'jsonwebtoken';
const AUTH_API = 'http://localhost:8080/api/auth/';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private userSubject: BehaviorSubject<Useer>;
  public useer: Observable<Useer>;
  private refreshTokenTimeout: any;
  currentUser: any;
  private userRole: BehaviorSubject<User>;
  private _userRole: Observable<User>;
  user!: User;
 

  constructor(private router: Router, private http: HttpClient, public jwtHelper: JwtHelperService) {
    this.userSubject = new BehaviorSubject<Useer>(null!);
    this.useer = this.userSubject?.asObservable();
    this.userRole = new BehaviorSubject<User>(null!);
    this._userRole = this.userRole?.asObservable();
   }

   getCurrentUser(): User | null {
    const token = this.userValue.jwtToken;
    if (token) {
      const decodedToken = jwt_decode(token) as unknown as { sub: string, name: string, roles: string };
      const user = {
        id: decodedToken.sub,
        name: decodedToken.name,
        roles: decodedToken.roles
      };
      return this.user;
    } else {
      return null;
    }
  }
  
   public get UserRole(): User{
    return this.userRole.value;
   }
   public set userValue(user: Useer){
    if (user.username){
      this.userValue.username = user.username;
    } if (user.password) {
      this.userValue.password = user.password;
    } if (user.jwtToken) {
      this.userValue.jwtToken = user.jwtToken;
    } if (user.refreshToken) {
      this.userValue.refreshToken = user.refreshToken;
    }

  }
  public get userValue(): Useer {
    return this.userSubject.value;
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


  
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    console.log(user)
    return !!user && user.roles[0].name === 'ADMIN';
  }

  isAgent(): boolean {
    const user = this.getCurrentUser();
    return !!user && user.roles[0].name === 'AGENT';
  }

  isMagasinier(): boolean {
    const user = this.getCurrentUser();
    return !!user && user.roles[0].name === 'MAGASINIER';
  }

  isClient(): boolean {
    const user = this.getCurrentUser();
    return !!user && user.roles[0].name === 'CLIENT';
  }


 login(username: string, password: string){
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json');
  
        let toSend = {
          'username': username,
          'password': password
        }
    return this.http.post<any>(AUTH_API+"signin", toSend, {headers}) 
    .pipe( map( data => {
      this.userSubject.next(new Useer(username, data['accessToken'] ))
      this.userValue.refreshToken = data['refreshToken'];
      this.startRefreshTokenTimer()
      this.userRole.next(new User(data['id'],data['email'], data['username'],password,data['roles']) )      
    }))
  

  }
  
  register(username: string, email: string, password: string, role: {id: number, name: string }[]): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
        role
      }
    );
  }

 
  getToken(){
    return localStorage.getItem('token');
  }
  
 
  logout(){
    this.userSubject.unsubscribe;
  }

  refreshToken(token:any) {
    // the expired token must be included in the Authorization header and the refresh in the body ?
    return this.http.get<any>(AUTH_API +'refreshtoken' )
        .pipe(map((data) => {
          console.log(data);
    }));
  }
    private startRefreshTokenTimer() {
      const jwtToken = JSON.parse(atob(this.userValue?.jwtToken!.split('.')[1]));
      const expires = new Date(jwtToken.exp * 1000);
      const timeout = expires.getTime() - Date.now() - (60 * 1000);
      this.refreshTokenTimeout = setTimeout(() => this.refreshToken(this.userValue.refreshToken).subscribe(), timeout);
    
    }
    
    private stopRefreshTokenTimer() {
      clearTimeout(this.refreshTokenTimeout);
    }
    
}
function jwt_decode(token: string): { sub: string; name: string; role: string } {
  const decodedToken = jwtDecode(token) as { sub: string; name: string; role: string };
  return decodedToken;
}

