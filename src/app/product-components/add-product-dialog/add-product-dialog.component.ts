import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent {
  productName: string = '';
  productQuantity: number = 0;
  selectedCategory: number | null = null;
  categories: Category[] = [];

  constructor(
      private dialogRef: MatDialogRef<AddProductDialogComponent>,
      private productService: ProductService
  ) {
    this.productService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onSubmit() {
    if (this.selectedCategory !== null && this.productName && this.productQuantity > 0) {
      const newProduct = {
        name: this.productName,
        categoryId: this.selectedCategory,
        quantity: this.productQuantity
      };
      this.productService.addProduct(newProduct).subscribe((product) => {
        this.dialogRef.close(product);
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
