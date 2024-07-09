import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UsersComponent } from './users-list/users.component';
import { UserAddComponent } from './user-add/user-add.component';

import { UsersRoutingModule } from './users-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    UsersComponent,
    UserAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
