import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isUserConnected().pipe(
      map((isConnected) => !!isConnected),
      tap((isConnected) => {
        if (!isConnected) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
