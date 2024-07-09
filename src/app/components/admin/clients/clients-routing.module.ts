import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientAddComponent } from './client-add/client-add.component';
import { ClientsComponent } from './clients-list/clients.component';

const routes: Routes = [
  {
    path: '',
    component: ClientsComponent
  },
  {
    path: 'add',
    component: ClientAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
