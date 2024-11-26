import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-delete-entity',
  templateUrl: './delete-entity.component.html',
  styleUrls: ['./delete-entity.component.css']
})
export class DeleteEntityComponent {
  errorMessage: string | null = null;

  constructor(
    private dialogRef: MatDialogRef<DeleteEntityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; type: 'product' | 'category' },
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  onDelete(): void {
    if (this.data.type === 'category') {
      this.productService.getProductsByCategory(this.data.id).subscribe(
        (products) => {
          if (products.length > 0) {
            this.errorMessage = 'Cette catégorie ne peut pas être supprimée car elle est utilisée par un ou plusieurs produits.';
          } else {
            this.categoryService.deleteCategory(this.data.id).subscribe(
              () => {
                this.dialogRef.close(true);
              },
              (error) => {
                this.errorMessage = "Erreur lors de la suppression de la catégorie.";
                console.error('Erreur lors de la suppression de la catégorie', error);
              }
            );
          }
        },
        (error) => {
          this.errorMessage = "Erreur lors de la vérification des produits liés à cette catégorie.";
          console.error('Erreur lors de la vérification des produits', error);
        }
      );
    } else {
      this.productService.deleteProduct(this.data.id).subscribe(
        () => {
          this.dialogRef.close(true);
        },
        (error) => {
          this.errorMessage = "Erreur lors de la suppression du produit.";
          console.error('Erreur lors de la suppression du produit', error);
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
