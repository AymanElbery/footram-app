import { Routes } from "@angular/router";
import { adminGuard } from "src/app/guards/admin.guard";
import { clientGuard } from "src/app/guards/client.guard";

export const content: Routes = [

  // admin routes ..
  {
    path: 'home',
    loadChildren: () => import('../../../components/admin/home/home.module').then(m => m.HomeModule), 
    canActivate: [adminGuard]
  },
  {
    path: 'clients',
    loadChildren: () => import('../../../components/admin/clients/clients.module').then(m => m.ClientsModule), 
    canActivate: [adminGuard]
  },
  {
    path: 'roles',
    loadChildren: () => import('../../../components/admin/roles/roles.module').then(m => m.RolesModule),
    canActivate: [adminGuard] 
  },
  {
    path: 'users',
    loadChildren: () => import('../../../components/admin/users/users.module').then(m => m.UsersModule), 
    canActivate: [adminGuard]
  },

  
  // client routes ..
  {
    path: 'dashboard',
    loadChildren: () => import('../../../components/client/dashboard/dashboard.module').then(m => m.DashboardModule), 
    canActivate: [clientGuard]
  },
  {
    path: 'coaches',
    loadChildren: () => import('../../../components/client/coaches/coaches.module').then(m => m.CoachesModule), 
    canActivate: [clientGuard]
  },
  {
    path: 'classes',
    loadChildren: () => import('../../../components/client/classes/classes.module').then(m => m.ClassesModule), 
    canActivate: [clientGuard]
  },
 
];
