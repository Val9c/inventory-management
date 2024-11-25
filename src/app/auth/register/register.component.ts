import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  addUser() {
    this.authService.addUser(this.registerForm.value).subscribe({
      next: () => {
        console.log('Utilisateur ajouté avec succès');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', err);
        alert('Erreur lors de l\'inscription. Veuillez réessayer.');
      }
    });
  }
}
