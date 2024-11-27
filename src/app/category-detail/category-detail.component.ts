import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnChanges {
  @Input() category: Category | null = null;
  @Output() categoryUpdated = new EventEmitter<Category>();

  categoryForm!: FormGroup;
  loremDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['category'] && this.category) {
      this.categoryForm.patchValue({
        name: this.category.name,
        description: this.loremDescription
      });
    }
  }

  updateCategory() {
    if (this.categoryForm.valid) {
      const updatedCategory: Category = {
        ...this.category!,
        name: this.categoryForm.value.name,
      };

      this.categoryService.updateCategory(updatedCategory).subscribe(
        (updatedCategory) => {
          this.categoryUpdated.emit(updatedCategory);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la catégorie', error);
        }
      );
    }
  }

  get name() {
    return this.categoryForm.get('name');
  }
}
