import  { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './shared/components/layout/content/content.component';
import { content } from "./shared/routes/routes/routers";
import { FullComponent } from './shared/components/layout/full/full.component';
import { full } from './shared/routes/full';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: ContentComponent,
    children: content,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
