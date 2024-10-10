import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasComponent } from './components/canvas/canvas.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuHerramientasComponent } from './components/menu-herramientas/menu-herramientas.component';
import { MenuNavComponent } from './components/menu-nav/menu-nav.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalCargaInicialComponent } from './components/modal-carga-inicial/modal-carga-inicial.component';
import { ModalConsultaComponent } from './components/modal-consulta/modal-consulta.component';
import { ModalSaveComponent } from './components/modal-save/modal-save.component';
import { ModalTextoComponent } from './components/modal-texto/modal-texto.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuHerramientasVerticalComponent } from './components/menu-herramientas-vertical/menu-herramientas-vertical.component';



@NgModule({
  declarations: [
    CanvasComponent,
    FooterComponent,
    MenuHerramientasComponent,
    MenuNavComponent,
    ModalComponent,
    ModalCargaInicialComponent,
    ModalConsultaComponent,
    ModalSaveComponent,
    ModalTextoComponent,
    MenuHerramientasVerticalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    FooterComponent,
    MenuNavComponent,
    ModalComponent,
    MenuHerramientasComponent,
    ModalTextoComponent,
    ModalConsultaComponent,
    CanvasComponent,
    ModalCargaInicialComponent,
    MenuHerramientasVerticalComponent
  ]
})
export class SharedModule { }
