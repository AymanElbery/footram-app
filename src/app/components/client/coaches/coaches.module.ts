import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoachesComponent } from './coaches-list/coaches.component';
import { CoacheAddComponent } from './coache-add/coache-add.component';
import { CoacheImportComponent } from './coache-import/coache-import.component';

import { CoachesRoutingModule } from './coaches-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { TooltipModule } from 'ngx-bootstrap/tooltip';


@NgModule({
  declarations: [
    CoachesComponent,
    CoacheAddComponent,
    CoacheImportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TooltipModule.forRoot(),
    NgxPaginationModule,
    ReactiveFormsModule,
    CoachesRoutingModule
  ]
})
export class CoachesModule { }
