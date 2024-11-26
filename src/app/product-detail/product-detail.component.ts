import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  categoryName: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (productId) {
      this.loadProduct(productId);
    }
  }

  loadProduct(id: number): void {
    this.productService.getProducts().subscribe((products) => {
      this.product = products.find((p) => p.id === id) || null;
      if (this.product) {
        this.loadCategoryName(this.product.categoryId);
      }
    });
  }

  loadCategoryName(categoryId: number): void {
    this.productService.getCategories().subscribe((categories) => {
      const category = categories.find((c) => c.id === categoryId);
      this.categoryName = category ? category.name : 'Catégorie inconnue';
    });
  }
}
