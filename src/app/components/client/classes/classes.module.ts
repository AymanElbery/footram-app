import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ClassesComponent } from './classes-list/classes.component';
import { ClassAddComponent } from './class-add/class-add.component';
import { ClassDetailsComponent } from './class-details/class-details.component';

import { ClassesRoutingModule } from './classes-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CustomDatePipe } from 'src/app/pipes/custom-date.pipe';
import { WeekDaysPipe } from 'src/app/pipes/week-days.pipe';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';


@NgModule({
  declarations: [
    ClassesComponent,
    ClassAddComponent,
    ClassDetailsComponent,
    CustomDatePipe,
    WeekDaysPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    TooltipModule.forRoot(),
    TabsModule.forRoot(),
    ReactiveFormsModule,
    ClassesRoutingModule
  ]
})
export class ClassesModule { }
