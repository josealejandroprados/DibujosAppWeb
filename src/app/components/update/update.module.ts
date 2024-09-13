import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateRoutingModule } from './update-routing.module';
import { EditarDibujoComponent } from './components/editar-dibujo/editar-dibujo.component';


@NgModule({
  declarations: [
    EditarDibujoComponent
  ],
  imports: [
    CommonModule,
    UpdateRoutingModule
  ]
})
export class UpdateModule { }
