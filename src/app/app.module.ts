import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AddProductDialogComponent } from './product-components/add-product-dialog/add-product-dialog.component';
import { EditProductDialogComponent } from './product-components/edit-product-dialog/edit-product-dialog.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";
import { AddCategoryDialogComponent } from './category-components/add-category-dialog/add-category-dialog.component';
import { EditCategoryDialogComponent } from './category-components/edit-category-dialog/edit-category-dialog.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import {MatCardModule} from "@angular/material/card";
import { DeleteEntityComponent } from './delete-entity/delete-entity.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AddProductDialogComponent,
    EditProductDialogComponent,
    AddCategoryDialogComponent,
    EditCategoryDialogComponent,
    CategoryComponent,
    ProductComponent,
    DeleteEntityComponent,
    ProductDetailComponent,
    CategoryDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatSelectModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
