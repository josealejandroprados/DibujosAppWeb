import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './shared/guards/log-guard';

const routes: Routes = [
  {path:'', redirectTo:'/dibujar', pathMatch:'full'},
  {
    path:'',
    loadChildren: () => import('./components/auth/auth.module').then(
      m => m.AuthModule
    )
  },
  {
    path:'',
    loadChildren: () => import('./components/create/create.module').then(
      m => m.CreateModule
    )
  },
  {
    path:'',
    loadChildren: () => import('./components/list/list.module').then(
      m => m.ListModule
    ),
    canActivate:[LoginGuard]
  },
  {
    path:'',
    loadChildren: () => import('./components/update/update.module').then(
      m => m.UpdateModule
    ),
    canActivate:[LoginGuard]
  },
  {path:'**', redirectTo:'/dibujar', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration:'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
