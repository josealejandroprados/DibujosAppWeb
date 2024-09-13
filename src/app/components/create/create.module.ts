import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create-routing.module';
import { CrearDibujoComponent } from './components/crear-dibujo/crear-dibujo.component';


@NgModule({
  declarations: [
    CrearDibujoComponent
  ],
  imports: [
    CommonModule,
    CreateRoutingModule
  ]
})
export class CreateModule { }
