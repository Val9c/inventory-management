import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users: { id: number; username: string } | undefined;

  constructor(private http: HttpClient, private router: Router) {}

  addUser(users: { username: string; password: string }): Observable<any> {
    return this.http.post('http://localhost:3000/api/users', users);
  }

  login(users: { username: string; password: string }): Observable<any> {
    return this.http.get('http://localhost:3000/api/users?username=' + users.username + '&password=' + users.password);
  }

  logout(): void {
    this.users = undefined;
    localStorage.removeItem('users');
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  saveUser(): void {
    if (this.users) {
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  getSavedUser(): { id: number; username: string } | null {
    const user = localStorage.getItem('users');
    return user ? JSON.parse(user) : null;
  }

  isUserConnected(): Observable<boolean> {
    if (this.users) {
      this.saveUser();
      return of(true);
    }

    const savedUser = this.getSavedUser();
    if (savedUser) {
      return this.http
        .get<any[]>(`http://localhost:3000/api/users?id=${savedUser.id}`)
        .pipe(
          map((users) => {
            if (users.length > 0) {
              this.users = users[0];
              return true;
            }
            return false;
          }),
          catchError(() => of(false))
        );
    }

    return of(false);
  }
}
