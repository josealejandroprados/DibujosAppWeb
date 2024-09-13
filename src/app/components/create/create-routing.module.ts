import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearDibujoComponent } from './components/crear-dibujo/crear-dibujo.component';

const routes: Routes = [
  {path:'dibujar', component: CrearDibujoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateRoutingModule { }
