import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = `${this.config.apiUrl}login`;
  logoutUrl = `${this.config.apiUrl}logout`;
  storageName = 'currentUser';
  currentUserSubject: BehaviorSubject<User> = new BehaviorSubject(null);
  lastToken: string = null;


  constructor(
    private config: ConfigService,
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
  ) {
    // Load cached userdata from the localstorage.
    const storedUser = localStorage.getItem(this.storageName);
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(loginData: User): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(
      this.loginUrl,
      { email: loginData.email, password: loginData.password }
    )
    .pipe( switchMap( response => {
      if (response.accessToken) {
        this.lastToken = response.accessToken;
        return this.userService.query(`email=${loginData.email}`);
      }
      return of(null);
    }))
    .pipe(
      tap( user => {
        if (!user) {
          localStorage.removeItem(this.storageName);
          this.currentUserSubject.next(null);
        } else {
          user[0].token = this.lastToken;
          localStorage.setItem(this.storageName, JSON.stringify(user[0]));
          this.currentUserSubject.next(user[0]);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.storageName);
    this.currentUserSubject.next(null);
    this.router.navigate(['login']);
  }
}
