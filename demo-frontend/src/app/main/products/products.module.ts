import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsLayoutComponent } from './products-layout.component';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CreateProductComponent } from './create-product/create-product.component';
import { CreateProductByAdminComponent } from './create-product-by-admin/create-product-by-admin.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ShowProductComponent } from './show-product/show-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ShowProductProducerComponent } from './show-product-producer/show-product-producer.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductsLayoutComponent,
    CreateProductComponent,
    CreateProductByAdminComponent,
    ShowProductComponent,
    EditProductComponent,
    ShowProductProducerComponent,
  ],
  imports: [
    ProductsRoutingModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatCardModule,
    MatCheckboxModule,
    TranslateModule,
    MatSelectModule,
  ]
})
export class ProductsModule { }
