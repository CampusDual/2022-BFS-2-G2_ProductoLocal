import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductsLayoutComponent } from './products-layout.component';
import { CreateProductComponent } from './create-product/create-product.component';
<<<<<<< Updated upstream
import { CreateProductByAdminComponent } from './create-product-by-admin/create-product-by-admin.component';
=======
import { ShowProductComponent } from './show-product/show-product.component';
>>>>>>> Stashed changes



const routes: Routes = [
  {
      path: '', 
      component: ProductsLayoutComponent,
      children: [
          {path: "", component: ProductsComponent},
          {path: 'createProduct', component: CreateProductComponent},
<<<<<<< Updated upstream
          {path: 'createProductByAdmin', component: CreateProductByAdminComponent},
=======
          {path: 'showProducts', component:ShowProductComponent},
>>>>>>> Stashed changes
      ],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
