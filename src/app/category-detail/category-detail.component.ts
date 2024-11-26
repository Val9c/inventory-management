import { Component, Input } from '@angular/core';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent {
  @Input() category!: Category; // Reçoit une catégorie depuis le parent

  loremDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;
}
