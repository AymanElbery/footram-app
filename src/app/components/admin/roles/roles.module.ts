import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RolesComponent } from './roles-list/roles.component';
import { RoleAddComponent } from './role-add/role-add.component';

import { RolesRoutingModule } from './roles-routing.module';


@NgModule({
  declarations: [
    RolesComponent,
    RoleAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RolesRoutingModule
  ]
})
export class RolesModule { }
