import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.css']
})
export class AddCategoryDialogComponent {
  categoryName: string = '';

  constructor(
    private dialogRef: MatDialogRef<AddCategoryDialogComponent>,
    private categoryService: CategoryService
  ) {}

  onSubmit() {
    if (this.categoryName) {
      const newCategory = { name: this.categoryName };

      this.categoryService.addCategory(newCategory).subscribe((category) => {
        this.dialogRef.close(category);
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
