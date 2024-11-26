import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  username: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const user = localStorage.getItem('users');

    if (user) {
      const userObj = JSON.parse(user);
      this.username = userObj.username || 'Invité';
    } else {
      this.username = 'Invité';
    }
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }
}
