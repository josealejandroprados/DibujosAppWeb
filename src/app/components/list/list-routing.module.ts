import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaDibujosComponent } from './components/lista-dibujos/lista-dibujos.component';

const routes: Routes = [
  {path:'listadibujos', component: ListaDibujosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
