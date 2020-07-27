import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

// Interfaces here
export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp:number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name: string;
}
const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', 'POST')
    .set('Access-Control-Allow-Headers', 'Origin')
    .set('Access-Control-Allow-Credentials', 'true');
@Injectable()
export class AuthenticationService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.token = token;
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('token');
    this.router.navigateByUrl('/');
    location.reload();

  }
  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }
  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
  public register(user: TokenPayload): Observable<any> {
    console.log("This is user",user)
    return this.request('post', 'register', user);
  }
  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }
  private request(method: 'post'|'get', type: 'login'|'register', user: TokenPayload): Observable<any> {
    let base;
    if (method === 'post') {
      base = this.http.post(`http://localhost:3000/v1/${type}`, user,{headers});
    } else {
      base = this.http.get(`localhost:3000/api/v1/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }
    console.log(base)
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
          console.log(data.token)
        }
        return data;
      })
    );
  
    return request;
  }
  

}