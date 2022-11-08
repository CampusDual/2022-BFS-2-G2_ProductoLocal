import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';

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
import { UsersLayoutComponent } from './users-layout.component';
import { UsersRoutingModule } from './users-routing.module';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select'; 
import { GetUserComponent } from './get-user/get-user.component';
import { ShowProducersComponent } from './show-producers/show-producers.component';
import { GetProducerComponent } from './get-producer/get-producer.component';
import { CreateProducerComponent } from './create-producer/create-producer.component';


@NgModule({
  declarations: [
    UsersComponent,
    UsersLayoutComponent,
    CreateComponent,
    GetUserComponent,
    ShowProducersComponent,
    GetProducerComponent,
    CreateProducerComponent,
  ],
  imports: [
    UsersRoutingModule,
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
export class UsersModule { }
