import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';

@Pipe({
  name: 'filterProducts'
})
export class FilterProductsPipe implements PipeTransform {
  transform(products: Product[], filter: string, categories: Category[]): Product[] {

    if (!filter.trim()) {
      return products;
    }

    filter = filter.toLowerCase();

    return products.filter(product => {
      const productName = product.name.toLowerCase();
      const quantity = product.quantity.toString();
      const productId = product.id.toString();
      const categoryName = this.getCategoryName(product.categoryId, categories)?.toLowerCase() || '';

      return (
        productId.includes(filter) ||
        productName.includes(filter) ||
        quantity.includes(filter) ||
        categoryName.includes(filter)
      );
    });
  }

  private getCategoryName(categoryId: number, categories: Category[]): string | undefined {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : undefined;
  }
}
