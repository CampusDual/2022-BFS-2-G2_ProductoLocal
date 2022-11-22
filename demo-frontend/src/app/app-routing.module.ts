import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LandingComponent } from './core/landing/landing.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent,  pathMatch: 'full'},
  { path: '', component:LandingComponent},
  { path: 'users', loadChildren: () => import('./main/users/users.module').then(x => x.UsersModule)},
  { path: 'products', loadChildren: () => import('./main/products/products.module').then(x => x.ProductsModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
