import { Component, OnInit } from '@angular/core';

declare var window:any;

@Component({
  selector: 'app-modal-carga-inicial',
  templateUrl: './modal-carga-inicial.component.html',
  styleUrls: ['./modal-carga-inicial.component.css']
})
export class ModalCargaInicialComponent implements OnInit{

  private varModalInicial:any;

  ngOnInit(): void {
    this.varModalInicial = new window.bootstrap.Modal(
      document.getElementById('modal-carga-inicial')
    );

    this.abrirModal();
  }

  private abrirModal(){
    this.varModalInicial.show();
  }

  public cerrarModal(){
    this.varModalInicial.hide();
  }
  
}
