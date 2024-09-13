import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare var window:any;

@Component({
  selector: 'app-modal-save',
  templateUrl: './modal-save.component.html',
  styleUrls: ['./modal-save.component.css']
})
export class ModalSaveComponent implements OnInit, AfterViewInit{

  @Output() guardarDibujo = new EventEmitter<string>();

  // variable del modal
  varModalGuardar:any;

  // formulario del modal para guardar dibujo
  formSave = new FormGroup({
    'name': new FormControl('', Validators.required)
  });

  @ViewChild('inputNombre') inputNombre!: ElementRef;

  ngAfterViewInit(): void {
    const modalElement = document.getElementById('modal-save');

    if (modalElement) {
      modalElement.addEventListener('shown.bs.modal', () => {
        this.renderer.selectRootElement(this.inputNombre.nativeElement).focus();
      });
    }
  }

  ngOnInit(): void {
    this.varModalGuardar = new window.bootstrap.Modal(
      document.getElementById('modal-save')
    );
  }

  constructor(
    private renderer: Renderer2
  ){}

  abrirModalGuardar(){
    this.formSave.setValue({name:''});
    this.varModalGuardar.show();
  }

  cerrarModalGuardar(){
    this.varModalGuardar.hide();
  }

  save(){
    if(this.formSave.valid){
      // guardar imagen
      // console.log('guardando imagen en firebase storage')

      this.cerrarModalGuardar();

      // enviar el nombre del dibujo a guardar al componente padre
      this.guardarDibujo.emit(this.formSave.value.name || '');
    }
  }

  get name(){
    return this.formSave.get('name') as FormControl;
  }
}
