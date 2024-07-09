import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoachesComponent } from './coaches-list/coaches.component';
import { CoacheAddComponent } from './coache-add/coache-add.component';
import { CoacheImportComponent } from './coache-import/coache-import.component';


const routes: Routes = [
  {
    path: '',
    component: CoachesComponent
  },
  {
    path: 'add',
    component: CoacheAddComponent
  },
  {
    path: 'import',
    component: CoacheImportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoachesRoutingModule { }
