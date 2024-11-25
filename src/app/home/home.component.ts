import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName: string = 'Jean Dupont';
  stockItems = [
    { name: 'Produit 1', quantity: 10 },
    { name: 'Produit 2', quantity: 5 },
    { name: 'Produit 3', quantity: 20 }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  addNewItem() {
    alert('Ajouter un nouveau produit');
  }

  editItem(item: any) {
    alert(`Modifier ${item.name}`);
  }

  deleteItem(item: any) {
    alert(`Supprimer ${item.name}`);
  }

  logout(): void {
    this.authService.logout(); 
    this.router.navigate(['/login']); 
  }
}
