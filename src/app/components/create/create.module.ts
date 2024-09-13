import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create-routing.module';
import { CrearDibujoComponent } from './components/crear-dibujo/crear-dibujo.component';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    CrearDibujoComponent
  ],
  imports: [
    CommonModule,
    CreateRoutingModule,
    SharedModule
]
})
export class CreateModule { }
