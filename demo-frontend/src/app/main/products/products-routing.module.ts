import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductsLayoutComponent } from './products-layout.component';
import { CreateProductComponent } from './create-product/create-product.component';



const routes: Routes = [
  {
      path: '', 
      component: ProductsLayoutComponent,
      children: [
          {path: "", component: ProductsComponent},
          {path: 'createProduct', component: CreateProductComponent},
      ],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
