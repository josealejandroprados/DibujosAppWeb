import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListaDibujosComponent } from './components/lista-dibujos/lista-dibujos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ListaDibujosComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class ListModule { }
