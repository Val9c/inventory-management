import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';
import { AddProductDialogComponent } from '../product-components/add-product-dialog/add-product-dialog.component';
import { EditProductDialogComponent } from '../product-components/edit-product-dialog/edit-product-dialog.component';
import { ConfirmDeleteDialogComponent } from '../product-components/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'category', 'quantity', 'actions'];
  dataSource = new MatTableDataSource<Product>();
  categories: Category[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private productService: ProductService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.dataSource.data = products;
    });
  }

  loadCategories() {
    this.productService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.dataSource.filterPredicate = (data: Product, filter: string) => {
      const categoryName = this.getCategoryName(data.categoryId).toLowerCase();
      const productName = data.name.toLowerCase();
      return productName.includes(filter) || categoryName.includes(filter);
    };

    this.dataSource.filter = filterValue;
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : 'Catégorie inconnue';
  }

  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = [...this.dataSource.data, result];
      }
    });
  }

  openEditProductDialog(product: Product): void {
    const dialogRef = this.dialog.open(EditProductDialogComponent, { data: product });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.dataSource.data.map(p => p.id === result.id ? result : p);
      }
    });
  }

  openDeleteProductDialog(product: Product): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, { data: product });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter(p => p.id !== product.id);
      }
    });
  }
}
