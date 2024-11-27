import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Category } from '../../models/category.model';
import { productNameValidator, productQuantityValidator, productCategoryValidator } from '../../validators/validators';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent {
  productForm: FormGroup;
  categories: Category[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddProductDialogComponent>,
    private productService: ProductService,
    private fb: FormBuilder
  ) {
    this.productService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });

    this.productForm = this.fb.group({
      productName: ['', [productNameValidator()]],
      productQuantity: [0, [productQuantityValidator()]],
      selectedCategory: [null, [productCategoryValidator()]]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const newProduct = {
        name: this.productForm.value.productName,
        categoryId: this.productForm.value.selectedCategory,
        quantity: this.productForm.value.productQuantity
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
