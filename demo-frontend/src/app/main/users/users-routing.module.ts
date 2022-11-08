import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProducerComponent } from './create-producer/create-producer.component';
import { CreateComponent } from './create/create.component';
import { GetProducerComponent } from './get-producer/get-producer.component';
import { GetUserComponent } from './get-user/get-user.component';
import { ShowProducersComponent } from './show-producers/show-producers.component';
import { UsersLayoutComponent } from './users-layout.component';
import { UsersComponent } from './users.component';


const routes: Routes = [
    {
        path: '', 
        component: UsersLayoutComponent,
        children: [
            {path: "", component: UsersComponent},
            {path: 'create', component: CreateComponent},
            {path: 'getUser', component: GetUserComponent},
            {path: "showProducers", component: ShowProducersComponent},
            {path: 'getUser/producer/:login', component: GetProducerComponent},
            {path: 'createProducer', component: CreateProducerComponent}
        ],
    },
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }

