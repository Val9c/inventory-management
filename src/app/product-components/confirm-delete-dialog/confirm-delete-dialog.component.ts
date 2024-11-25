import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
})
export class ConfirmDeleteDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public product: Product
  ) {}

  onDelete(): void {
    this.productService.deleteProduct(this.product.id).subscribe(
      () => {
        this.dialogRef.close(true);
      },
      (error) => {
        console.error('Erreur lors de la suppression du produit', error);
        this.dialogRef.close(false);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
