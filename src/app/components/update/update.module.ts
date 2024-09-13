import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateRoutingModule } from './update-routing.module';
import { EditarDibujoComponent } from './components/editar-dibujo/editar-dibujo.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    EditarDibujoComponent
  ],
  imports: [
    CommonModule,
    UpdateRoutingModule,
    SharedModule
  ]
})
export class UpdateModule { }
