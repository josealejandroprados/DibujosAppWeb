import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

declare var window:any;

@Component({
  selector: 'app-modal-texto',
  templateUrl: './modal-texto.component.html',
  styleUrls: ['./modal-texto.component.css']
})
export class ModalTextoComponent implements OnInit, AfterViewInit{

  // defino variable del modal
  varModalTexto:any;

  // defino texto a emitir hacia componente padre
  @Output() texto = new EventEmitter<string>();

  // accedo al componente input
  @ViewChild('inputTexto') inputTexto!:ElementRef;

  // defino formulario reactivo
  formText = new FormGroup({
    'texto': new FormControl('')
  });

  ngOnInit(): void {
    this.varModalTexto = new window.bootstrap.Modal(
      document.getElementById('modal-texto')
    );
  }
  
  // metodo que espera a que todos los elementos del DOM estén listos
  ngAfterViewInit(): void {
    const modalElement = document.getElementById('modal-texto');

    if(modalElement){
      // agregar un evento al modal para que cuando se muestre se enfoque el input
      modalElement.addEventListener('shown.bs.modal', () => {
        // enfocar input
        this.renderer.selectRootElement(this.inputTexto.nativeElement).focus();
      });
    }
  }

  constructor(
    private renderer:Renderer2
  ){}

  abrirModal(){
    // limpio el contenido del input texto
    this.formText.setValue({texto:''});
    
    this.varModalTexto.show();
    
  }

  cerrarModal(){
    this.varModalTexto.hide();
  }

  enviar(){
    // guardo el texto en una constante
    const textoEnviar = this.formText.value.texto;

    // cierro el modal
    this.cerrarModal();

    // enviar al componente padre el texto del formulario
    this.texto.emit(textoEnviar || '');
  }
  
}
