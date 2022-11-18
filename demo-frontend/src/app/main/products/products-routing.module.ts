import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductsLayoutComponent } from './products-layout.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { CreateProductByAdminComponent } from './create-product-by-admin/create-product-by-admin.component';
import { ShowProductComponent } from './show-product/show-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ShowProductProducerComponent } from './show-product-producer/show-product-producer.component';
import { ShowProductClientComponent } from './show-product-client/show-product-client.component';
import { GetProductDetailsComponent } from './get-product-details/get-product-details.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsLayoutComponent,
    children: [
      { path: "", component: ProductsComponent },
      { path: 'createProduct', component: CreateProductComponent },
      { path: 'createProductByAdmin/:login', component: CreateProductByAdminComponent },
      { path: 'createProductByAdmin', component: CreateProductByAdminComponent },
      { path: 'showProducts', component: ShowProductComponent },
      { path: 'myProducts', component: ShowProductProducerComponent },
      { path: 'edit/:id', component: EditProductComponent },
      { path: 'products', component: ShowProductClientComponent },
      { path: 'getProductDetail/:id', component: GetProductDetailsComponent}
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
