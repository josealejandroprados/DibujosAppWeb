import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarDibujoComponent } from './components/editar-dibujo/editar-dibujo.component';

const routes: Routes = [
  {path:'editardibujo/:id', component: EditarDibujoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateRoutingModule { }
