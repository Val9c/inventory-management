import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ProductService} from '../services/product.service';
import {CategoryService} from '../services/category.service';
import {Product} from '../models/product.model';
import {Category} from '../models/category.model';
import {AddProductDialogComponent} from '../product-components/add-product-dialog/add-product-dialog.component';
import {EditProductDialogComponent} from '../product-components/edit-product-dialog/edit-product-dialog.component';
import {DeleteEntityComponent} from '../delete-entity/delete-entity.component';
import {FilterProductsPipe} from '../pipes/filter-products.pipe';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'category', 'quantity', 'actions'];
  dataSource: Product[] = [];
  categories: Category[] = [];
  filterText: string = '';

  constructor(
    private dialog: MatDialog,
    private productService: ProductService,
    private categoryService: CategoryService,
    private filterProductsPipe: FilterProductsPipe
  ) {
    this.loadProducts();
  }

  ngAfterViewInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(products => {
      this.dataSource = products;
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onSearchChange(filterText: string) {
    this.filterText = filterText;
  }

  applyCustomFilter(): void {
    this.dataSource = this.filterProductsPipe.transform(
      this.dataSource,
      this.filterText,
      this.categories
    );
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find((c) => c.id === categoryId);
    return category ? category.name : 'Catégorie inconnue';
  }

  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource = [...this.dataSource, result];
        this.applyCustomFilter();
      }
    });
  }

  openEditProductDialog(product: Product): void {
    const dialogRef = this.dialog.open(EditProductDialogComponent, { data: product });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource = this.dataSource.map((p) => (p.id === result.id ? result : p));
        this.applyCustomFilter();
      }
    });
  }

  openDeleteProductDialog(product: Product): void {
    const dialogRef = this.dialog.open(DeleteEntityComponent, {
      data: { id: product.id, type: 'product' },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.dataSource = this.dataSource.filter((p) => p.id !== product.id);
        this.applyCustomFilter();
      }
    });
  }
}
