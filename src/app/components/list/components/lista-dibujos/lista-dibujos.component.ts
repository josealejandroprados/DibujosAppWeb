import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalCargaInicialComponent } from 'src/app/shared/components/modal-carga-inicial/modal-carga-inicial.component';
import { ModalConsultaComponent } from 'src/app/shared/components/modal-consulta/modal-consulta.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ImageModel } from 'src/app/shared/models/image.model';
import { ModalConsulta } from 'src/app/shared/models/modal.consulta.model';
import { ModalModel } from 'src/app/shared/models/modal.model';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-lista-dibujos',
  templateUrl: './lista-dibujos.component.html',
  styleUrls: ['./lista-dibujos.component.css']
})
export class ListaDibujosComponent implements OnInit{

  // array de los registros de las imagenes guardados en firestore
  imagenes!:ImageModel[];

  idSelected!:string; // id del dibujo seleccionado para eliminar o editar
  pathSelected!:string; //path del dibujo seleccionado para eliminar o editar

  // modelo de modal para eliminar imagenes
  modalEliminar:ModalModel={
    title:'Eliminar Dibujo',
    hab_btn: false,
    textoBodyModal: '',
    textoBtn: 'Aceptar'
  }
  // accedo al componente hijo para usar su metodo abrirModal
  @ViewChild(ModalComponent) modalAccion!: ModalComponent;

  // modelo de modal para consultar al usuario si quiere eliminar el dibujo guardado
  modalConsultaEliminar:ModalConsulta = {
    title: 'Eliminar Dibujo',
    textoBodyModal: '¿Está seguro que desea eliminar el dibujo?'
  }

  // accedo al componente hijo ModalConsultaComponent para usar su metodo abrirModal
  @ViewChild(ModalConsultaComponent) modalConsulta!:ModalConsultaComponent;

  // accedo al componente hijo ModalCargaInicial para usar su metodo abrirModal al cargar la pagina
  @ViewChild(ModalCargaInicialComponent) modalInicio!:ModalCargaInicialComponent;

  ngOnInit(): void {
    // obtener todos los registros de las imagenes guardas en firestore
    this.obtenerImagenes();
  }
  constructor(
    private data: DataService
  ){}

  // metodo para obtener registros de firestore
  private obtenerImagenes(){
    this.imagenes = [];
    this.data.getImages().subscribe(images => {
      if(images.length>0){
        this.imagenes = images;
      }

      this.modalInicio.cerrarModal();
    });
  }

  // metodo que consulta primero al usuario si quiere eliminar el dibujo
  consultaEliminarImage(id:string, path:string){
    // abrir modal
    this.modalConsulta.abrirModalConsulta();
    this.idSelected = id;
    this.pathSelected = path;
  }

  // metodo para eliminar dibujo guardado tanto de storage como su registro de firestore
  eliminarImage(){
    // abrir modal
    this.modalEliminar.textoBodyModal = 'Eliminando imagen...'
    this.modalAccion.abrirModal();
    
    // llamo al servicio para eliminar el registro en firestore
    this.data.deleteImageFirestore(this.idSelected)
    .then(async () => {
      // elimino la imagen en Storage
      await this.data.deleteImage(this.pathSelected);

      this.modalEliminar.textoBodyModal = '¡Imagen eliminada con éxito!';
      this.modalEliminar.hab_btn = true;

      this.obtenerImagenes();
    })
    .catch(error => {
      console.log(error);
      this.modalEliminar.textoBodyModal = 'Error al eliminar la imagen';
      this.modalEliminar.hab_btn = true;
    });
    //
  }

  DeleteComplete(){
    // reinicio las variables
    this.modalEliminar.hab_btn = false;
    this.modalEliminar.textoBodyModal = '';
    this.idSelected = '';
    this.pathSelected = '';
  }

  // metodo para descargar la imagen del Storage de Firebase
  downloadImage(url: string, filename: string) {
    // hago solicitud GET para obtener la imagen
    fetch(url)
    // convierto la respuesta a un blob
    .then(response => response.blob())
    .then(blob => {
      // creo un elemento a
      const link = document.createElement('a');

      // creo una URL temporal para el blob
      const urlBlob = window.URL.createObjectURL(blob);
      link.href = urlBlob;

      // defino el nombre del archivo al descargar
      link.download = filename;  // Nombre con el que quieres descargar la imagen

      // simulo un click en el enlace para iniciar la descarga
      link.click();
      window.URL.revokeObjectURL(urlBlob); // Libera la URL temporal
    })
    .catch(error => console.error('Error al descargar la imagen', error));
  }
}
