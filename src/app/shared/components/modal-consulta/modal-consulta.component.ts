import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalConsulta } from '../../models/modal.consulta.model';

declare var window:any;

@Component({
  selector: 'app-modal-consulta',
  templateUrl: './modal-consulta.component.html',
  styleUrls: ['./modal-consulta.component.css']
})
export class ModalConsultaComponent implements OnInit{

  varModalConsulta:any;

  @Input() modalQuery!:ModalConsulta;
  @Output() aceptar = new EventEmitter<void>();

  ngOnInit(): void {
    this.varModalConsulta = new window.bootstrap.Modal(
      document.getElementById('modal-consulta')
    );
  }

  abrirModalConsulta(){
    this.varModalConsulta.show();
  }

  cerrarModalConsulta(){
    this.varModalConsulta.hide();
  }

  ok(){
    this.cerrarModalConsulta();

    // enviar orden de aceptacion del modal al componente padre
    this.aceptar.emit();
  }
  
}
