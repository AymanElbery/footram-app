import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClassesComponent } from './classes-list/classes.component';
import { ClassAddComponent } from './class-add/class-add.component';
import { ClassDetailsComponent } from './class-details/class-details.component';


const routes: Routes = [
  {
    path: '',
    component: ClassesComponent
  },
  {
    path: 'add',
    component: ClassAddComponent
  },
  {
    path: 'details/:id',
    component: ClassDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesRoutingModule { }
