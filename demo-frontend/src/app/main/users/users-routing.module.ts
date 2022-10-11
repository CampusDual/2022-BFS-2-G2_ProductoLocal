import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { UsersLayoutComponent } from './users-layout.component';
import { UsersComponent } from './users.component';


const routes: Routes = [
    {
        path: '', 
        component: UsersLayoutComponent,
        children: [
            {path: "", component: UsersComponent},
            {path: '/create', component: CreateComponent}
        ],
    },
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }

