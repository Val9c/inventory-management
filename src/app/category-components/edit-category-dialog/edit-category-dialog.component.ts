import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent {
  editCategoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public category: Category
  ) {
    this.editCategoryForm = this.fb.group({
      name: [category.name, [Validators.required]]
    });
  }

  onSubmit() {
    if (this.editCategoryForm.valid) {
      const updatedCategory = { ...this.category, ...this.editCategoryForm.value };

      this.categoryService.updateCategory(updatedCategory).subscribe(
        (result) => {
          this.dialogRef.close(result);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la catégorie', error);
        }
      );
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
