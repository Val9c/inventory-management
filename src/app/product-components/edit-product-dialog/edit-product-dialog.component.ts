import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.css']
})
export class EditProductDialogComponent {
  editProductForm: FormGroup;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product
  ) {
    this.editProductForm = this.fb.group({
      name: [product.name, [Validators.required]],
      categoryId: [product.categoryId, [Validators.required]],
      quantity: [product.quantity, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onSubmit() {
    if (this.editProductForm.valid) {
      const updatedProduct = { ...this.product, ...this.editProductForm.value };
      this.productService.updateProduct(updatedProduct).subscribe(
        (result) => {
          this.dialogRef.close(result);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du produit', error);
        }
      );
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
