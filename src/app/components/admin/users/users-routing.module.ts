import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users-list/users.component';
import { UserAddComponent } from './user-add/user-add.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: 'add',
    component: UserAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
