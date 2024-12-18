import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'inventory-management';
  isMenuActive = false;
  isConnected = false;

  constructor(protected authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isUserConnected().subscribe((status) => {
      this.isConnected = status;
    });
  }

  toggleMenu(): void {
    this.isMenuActive = !this.isMenuActive;
  }
}
