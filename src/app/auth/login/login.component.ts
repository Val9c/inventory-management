import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe((users: any) => {
      if (users.length === 0) alert('Erreur dans le pseudo ou le mot de passe');
      this.authService.users = users[0];
      if (!this.authService.users) return;
      this.authService.saveUser();
      this.router.navigate(['/home']);
    }, (error) => {
      alert('Erreur dans la requête');
    });
  }
}
