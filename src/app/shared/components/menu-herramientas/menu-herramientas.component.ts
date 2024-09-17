import { AfterViewInit, Component, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { ModalConsultaComponent } from '../modal-consulta/modal-consulta.component';
import { ModalSaveComponent } from '../modal-save/modal-save.component';
import { ModalConsulta } from '../../models/modal.consulta.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Popover from 'bootstrap/js/dist/popover';
import * as $ from 'jquery';

@Component({
  selector: 'app-menu-herramientas',
  templateUrl: './menu-herramientas.component.html',
  styleUrls: ['./menu-herramientas.component.css']
})
export class MenuHerramientasComponent implements OnInit, AfterViewInit{

  // accedo al componente hijo modalConsulta para usar su metodo abrirModal
  @ViewChild(ModalConsultaComponent) modalConsulta!:ModalConsultaComponent;

  // accedo al componente hijo modalSave para usar su metodo abrirModal
  @ViewChild(ModalSaveComponent) modalGuardar!:ModalSaveComponent;

  // modelo de modal de consulta para borrar
  modalEliminar:ModalConsulta = {
    title: 'Eliminar Dibujo',
    textoBodyModal: '¿Está seguro que desea eliminar todo el dibujo?'
  }

  // declaración de eventos emitidos al componente Padre (create o update)
  @Output() formaSeleccionada = new EventEmitter<string>();
  @Output() eliminarDibujo = new EventEmitter<string>();
  @Output() estilosTrazo = new EventEmitter<any>();
  @Output() estilosTexto = new EventEmitter<any>();
  @Output() guardar = new EventEmitter<string>();
  @Output() modificarBorrador = new EventEmitter<string>();

  selectedShape: string = 'line';

  formStylesLine = new FormGroup({
    'ancho': new FormControl(1),
    'color': new FormControl('#F10985'),
  });

  formStylesText = new FormGroup({
    'size': new FormControl(16),
    'color': new FormControl('#2420D9'),
    'fuente': new FormControl('Arial'),
    'negrita': new FormControl(false),
    'italica': new FormControl(false),
    'subrayado': new FormControl(false),
    'relleno': new FormControl(false),
    'tachado': new FormControl(false)
  });

  currentRoute: string = ''; //ruta actual

  ngOnInit(): void {
    // llamo al metodo para modificar los estilos de algunas formas creadas con svg
    this.formas();

    // obtengo ruta actual
    this.currentRoute = this.router.url;
    // 
  }
  constructor(
    private router:Router,
    private auth:AuthService
  ){}

  ngAfterViewInit(): void {
    // cuando todos los elementos del DOM estén listos => agrego popovers, llamo al método addPopovers
    this.addPopovers();
  }

  // metodo para agregar popovers a los botones
  private addPopovers(){
    // boton guardar dibujo
    // obtengo referencia al boton guardar
    const btnSave = document.getElementById('save');
    // modifico el atributo data-bs-content del boton guardar según el usuario esté logueado o no
    if(!this.estaLogueado()){
      // si no está logueado
      btnSave?.setAttribute('data-bs-content','¡Es necesario iniciar sesión para guardar dibujo!');
    }
    else{
      // si está logueado
      btnSave?.setAttribute('data-bs-content','Guardar dibujo');
    }

    // agrego los popovers a los botones que tengan el atributo data-bs-toggle="popover"
    Array.from(document.querySelectorAll('[data-bs-toggle="popover"]')).forEach(
      popoverNode => new Popover(popoverNode,{
        trigger:'hover',
        container:'body'
      })
    );
  }

  // llamar al metodo guardarDibujo cuando se presiona Ctrl + S en el teclado
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 's' && this.estaLogueado()) {
      // si presiono Ctrl + S y ademas estoy logueado => abrir modal
      event.preventDefault(); // Evita la acción por defecto del navegador
      this.guardarDibujo();
    }
  }

  // metodo que abre el modal de guardar
  guardarDibujo(){
    /* primero verifico que el usuario esté logueado
    si no está logueado => No puede guardar dibujo */
    if(this.estaLogueado()){
      if(this.currentRoute==='/dibujar'){
        // en este caso estamos en el componente dibujar y quiero guardar un nuevo dibujo
        this.modalGuardar.abrirModalGuardar();
      }
      else{
        // en este caso estamos en el componente update y solo quiero guardar los cambios
        this.saveImage('');
      }
    }
  }

  /*metodo que recibe el nombre de la imagen para luego enviar al padre(crear-dibujo)
  y guardar imagen en firebase storage*/
  saveImage(name:string){
    // enviar al padre (crear-dibujo) el name
    this.guardar.emit(name);
  }

  // metodo consulta de eliminacion con el modal
  consultaEliminar(){
    // abrir modal
    this.modalConsulta.abrirModalConsulta();
  }

  // metodo para eliminar todo el dibujo que se encuentra en el lienzo en el componente padre
  BorrarDibujo(){
    // envio orden de eliminar dibujo al componente padre
    this.eliminarDibujo.emit('eliminarDibujo');
  }

  // opcion de dibujo seleccionada
  selectShape(shape: any) {
    this.selectedShape = shape;

    // envío la forma seleccionada al componente padre
    this.formaSeleccionada.emit(shape);
  }

  /* metodo para enviar al componente padre (create o update) los estilos 
  de trazo seleccionado cuando hay un cambio */
  enviarEstilosTrazo(){
    this.estilosTrazo.emit(this.formStylesLine.value);
  }

  /* metodo para enviar al componente padre (create o update) los estilos 
  de texto seleccionado cuando hay un cambio */
  enviarEstilosText(){
    this.estilosTexto.emit(this.formStylesText.value);
  }

  cambiarBorrador(acto:string){
    this.modificarBorrador.emit(acto);
  }

  // metodo para modificar los estilos de los iconos creados con svg
  private formas(){
    // modificar estilo del icono del triangulo rectangulo
    const triangle = document.getElementById("myTriangle");
    const polygonTriangle = triangle?.querySelector('polygon');

    triangle?.addEventListener('mouseover', () => {
      polygonTriangle?.setAttribute("stroke","black");
    });

    triangle?.addEventListener('mouseout', () => {
      polygonTriangle?.setAttribute("stroke","white");
    });

    // modificar estilo del icono del rectangulo
    const rectangle = document.getElementById("myRectangle");
    const polygonRect = rectangle?.querySelector('rect');

    rectangle?.addEventListener('mouseover', () => {
      polygonRect?.setAttribute("stroke","black");
    });

    rectangle?.addEventListener('mouseout', () => {
      polygonRect?.setAttribute("stroke","white");
    });

    // modificar estilo del icono de la estrella de 4 puntas
    const star4 = document.getElementById("mystar4");
    const polygonStar4_1 = document.getElementById('poligon1');
    const polygonStar4_2 = document.getElementById('poligon2');

    star4?.addEventListener('mouseover', () => {
      polygonStar4_1?.setAttribute("stroke","black")
      polygonStar4_2?.setAttribute("stroke","black");
    });

    star4?.addEventListener('mouseout', () => {
      polygonStar4_1?.setAttribute("stroke","white");
      polygonStar4_2?.setAttribute("stroke","white");
    });

    // modificar estilo del icono de la estrella de 6 puntas
    const star6 = document.getElementById("mystar6");
    const polygonStar6 = star6?.querySelector('polygon');

    star6?.addEventListener('mouseover', () => {
      polygonStar6?.setAttribute("stroke","black");
    });

    star6?.addEventListener('mouseout', () => {
      polygonStar6?.setAttribute("stroke","white");
    });

    // modifico estilo del icono de la elipse
    const ellipse = document.getElementById("ellipse");
    const polygonEllipse = ellipse?.querySelector('ellipse');

    ellipse?.addEventListener('mouseover', () => {
      polygonEllipse?.setAttribute("stroke","black");
    });

    ellipse?.addEventListener('mouseout', () => {
      polygonEllipse?.setAttribute("stroke","white");
    });

    // modifico estilo del icono del trapecio
    const trapezoid = document.getElementById("trapezoid");
    const polygonTrapezoid = trapezoid?.querySelector('polygon');

    trapezoid?.addEventListener('mouseover', () => {
      polygonTrapezoid?.setAttribute("stroke","black");
    });

    trapezoid?.addEventListener('mouseout', () => {
      polygonTrapezoid?.setAttribute("stroke","white");
    });
  }

  // metodo que devuelve true o false si el usuario se ha logueado
  estaLogueado(){
    return this.auth.estalogueado();
  }
  // 
}
