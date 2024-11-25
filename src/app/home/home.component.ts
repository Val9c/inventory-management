import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Product} from '../models/product.model';
import {AddProductDialogComponent} from '../product-components/add-product-dialog/add-product-dialog.component';
import {EditProductDialogComponent} from '../product-components/edit-product-dialog/edit-product-dialog.component';
import {ConfirmDeleteDialogComponent} from '../product-components/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'category', 'quantity', 'actions'];
  dataSource = new MatTableDataSource<Product>([
    { id: 1, name: 'Ordinateur Portable HP', category: 'Informatique', quantity: 15 },
    { id: 2, name: 'Smartphone Samsung Galaxy S23', category: 'Électronique', quantity: 30 },
    { id: 3, name: 'Casque Audio Sony WH-1000XM5', category: 'Audio', quantity: 10 },
    { id: 4, name: 'Clé USB SanDisk 64 Go', category: 'Informatique', quantity: 50 },
    { id: 5, name: 'Montre Connectée Fitbit Charge 5', category: 'Accessoires', quantity: 25 },
    { id: 6, name: 'Imprimante Canon PIXMA', category: 'Informatique', quantity: 12 },
    { id: 7, name: 'Cafetière Nespresso Vertuo', category: 'Électroménager', quantity: 8 },
    { id: 8, name: 'Télévision 4K LG OLED', category: 'Électronique', quantity: 5 },
    { id: 9, name: 'Brosse à Dents Électrique Oral-B', category: 'Santé & Hygiène', quantity: 40 },
    { id: 10, name: 'Appareil Photo Canon EOS 90D', category: 'Photographie', quantity: 7 },
  ]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = [...this.dataSource.data, result];
      }
    });
  }

  openEditProductDialog(product: Product): void {
    const dialogRef = this.dialog.open(EditProductDialogComponent, { data: product });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.dataSource.data.findIndex(p => p.id === result.id);
        if (index !== -1) {
          this.dataSource.data[index] = result;
        }
      }
    });
  }

  openDeleteProductDialog(product: Product): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, { data: product });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter(p => p.id !== product.id);
      }
    });
  }
}
