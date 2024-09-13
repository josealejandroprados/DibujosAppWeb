import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListaDibujosComponent } from './components/lista-dibujos/lista-dibujos.component';


@NgModule({
  declarations: [
    ListaDibujosComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule
  ]
})
export class ListModule { }
