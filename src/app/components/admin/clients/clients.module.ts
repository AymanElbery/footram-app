import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ClientsComponent } from './clients-list/clients.component';
import { ClientAddComponent } from './client-add/client-add.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { ClientsRoutingModule } from './clients-routing.module';


@NgModule({
  declarations: [
    ClientsComponent,
    ClientAddComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    ClientsRoutingModule
  ]
})
export class ClientsModule { }
