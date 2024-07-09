import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RolesComponent } from './roles-list/roles.component';
import { RoleAddComponent } from './role-add/role-add.component';

const routes: Routes = [
  {
    path: '',
    component: RolesComponent
  },
  {
    path: 'add',
    component: RoleAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
