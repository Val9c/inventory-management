import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { AddCategoryDialogComponent } from '../category-components/add-category-dialog/add-category-dialog.component';
import { DeleteEntityComponent } from "../delete-entity/delete-entity.component";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource<Category>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private categoryService: CategoryService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.dataSource.data = categories;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.dataSource.filterPredicate = (data: Category, filter: string) => {
      const categoryName = data.name.toLowerCase();
      const categoryId = data.id.toString();

      return (
        categoryId.includes(filter) ||
        categoryName.includes(filter)
      );
    };

    this.dataSource.filter = filterValue;
  }

  selectedCategory: Category | null = null;

  selectCategory(category: Category) {
    this.selectedCategory = { ...category };
  }

  onCategoryUpdated(updatedCategory: Category) {
    if (this.selectedCategory) {
      this.selectedCategory = updatedCategory;
      this.dataSource.data = this.dataSource.data.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      );
    }
  }

  openAddCategoryDialog(): void {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = [...this.dataSource.data, result];
      }
    });
  }

  openDeleteCategoryDialog(category: Category): void {
    const dialogRef = this.dialog.open(DeleteEntityComponent, {
      data: { id: category.id, type: 'category' }
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.dataSource.data = this.dataSource.data.filter((c) => c.id !== category.id);
      }
    });
  }
}
