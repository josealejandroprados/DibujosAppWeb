import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ModalModel } from '../../models/modal.model';
import { ModalTextoComponent } from '../modal-texto/modal-texto.component';
import { ModalCargaInicialComponent } from '../modal-carga-inicial/modal-carga-inicial.component';
import { StylesLine } from '../../models/styles.line';
import { StylesText } from '../../models/styles.text';
import { DataService } from '../../services/data.service';
import { CanvasService } from '../../services/canvas.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit, AfterViewInit{

  // accedo al componente hijo modalComponent para luego ejecutar su metodo abrirModal
  @ViewChild(ModalComponent) modalAccion!:ModalComponent;
  // modelo de modal accion para guardar imagen
  modalComplete:ModalModel={
    title: '',
    hab_btn: false,
    textoBodyModal: '',
    textoBtn: 'Aceptar'
  }

  // accedo al componente hijo modal texto para luego usar su metodo abrirModal
  @ViewChild(ModalTextoComponent) modalText!:ModalTextoComponent;

  // accedo al componente hijo modal-carga-inicial para usar su metodo cerrarModal
  @ViewChild(ModalCargaInicialComponent) modalInicio!:ModalCargaInicialComponent;

  // accedo al elemento canvas 'dibujo' usando decorador ViewChild
  @ViewChild('dibujo', {static:true}) canvas!:ElementRef<HTMLCanvasElement>;
  // creo el contexto
  private ctx!:CanvasRenderingContext2D;
  // defino una propiedad para saber si estoy dibujando
  private estaDibujando:boolean = false;
  // (startX,startY): punto de inicio de dibujo
  private startX = 0;
  private startY = 0;
  // forma seleccionada para dibujar, inicio en line
  selectedShape: string = 'line';

  private backupImage: ImageData | null = null; // Backup del canvas actual
  anchoMaximo!:any; //ancho maximo del canvas
  contenedorCanvas:any; //identificador del section que contiene al canvas
  
  stylesLine = new StylesLine(); //estilos de linea para las formas y lapiz

  stylesText = new StylesText(); //estilos para el texto

  // variable para el tamaño del borrador
  eraserSize:number=10;

  /* 
  id de un dibujo guardado previamente, esto se usará en caso de que estemos en el componente
  editar-dibujo para obtener el dibujo y cargarlo en el canvas
  */
  id!:string;
  dataImageUpdate:any;

  currentRoute: string = ''; //ruta actual

  // metodo que se ejecuta cuando estan listos todos los componentes HTML de la página
  ngAfterViewInit(): void {
    // verifico si la ruta tiene un parámetro id
    this.activRout.params.subscribe(params => {
      // si estoy en el componente update => obtengo un id
      this.id = params['id'];
      if(this.id){
        // si hay un id => llamo al metodo para obtener el registro de la imagen en Firestore
        this.data.getImg(this.id)
        .then(response => {
          this.dataImageUpdate = response.data(); // registro de la imagen en Firestore
          this.backupImage = null; // inicio el backup en null

          /* llamo al metodo para cargar la imagen en el lienzo y hacer backup*/
          this.obtenerImgUpdate(this.dataImageUpdate);

          // terminada la carga de la imagen se cierra el modal de carga inicial
          this.modalInicio.cerrarModal();
        })
        .catch(error => {
          console.log(error);
        });
      }
    });

    if(this.currentRoute=='/dibujar'){
      /* si estoy en el componente crear-dibujo => agregó un fondo blanco
      cuando está listo el componente canvas */
      this.addWhiteBackground();
    }
  }
  
  ngOnInit(): void {
    // obtengo ruta actual
    this.currentRoute = this.router.url;

    /// accedo al contexto del canvas
    this.ctx = this.canvas.nativeElement.getContext('2d')!;

    // obtengo referencia al section contenedor
    this.contenedorCanvas = document.getElementById('contenedor');
    // defino el ancho maximo del lienzo en la propiedad anchoMaximo
    // el valor será el ancho del contenedor menos 50px
    this.anchoMaximo = this.contenedorCanvas?.offsetWidth - 50;

    // llamo al metodo para que modifique el icono del cursor al inicio de la aplicación
    this.updateCursor();
    // **************************************************************************************
  }
  constructor(
    private data:DataService,
    private canv:CanvasService,
    private auth:AuthService,
    private activRout:ActivatedRoute,
    private router:Router
  ){}

  // obtener imagen cuando estamos en el componente update
  obtenerImgUpdate(data:any){
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = data.url;

    // cargar imagen
    img.onload = () => {
      // Obtener las dimensiones originales de la imagen
      const originalWidth = img.width;
      const originalHeight = img.height;

      // Calcular la nueva altura manteniendo la proporción
      const aspectRatio = originalHeight / originalWidth;
      const newHeight = this.anchoMaximo * aspectRatio;

      // Ajustar el alto del canvas según la nueva altura
      this.canvas.nativeElement.height = newHeight;

      this.ctx.drawImage(img,0,0,this.anchoMaximo, newHeight);

      // Guardar el canvas actual
      this.backupImage = this.ctx.getImageData(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

      // guardar imagen en localStorage
      this.saveCanvasImage();
    }
  }

  // Función para guardar la imagen en sesionStorage
  private saveCanvasImage() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    sessionStorage.setItem('canvasImage', canvas.toDataURL()); // Guarda la URL en sessionStorage
  }

  // metodo para agregar un fondo blanco al lienzo
  addWhiteBackground(){
    // defino estilo de relleno blanco
    this.ctx.fillStyle = '#FFFFFF';

    // dibujo un rectangulo de color blanco que abarque toda la superficie del canvas
    this.ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    // Guardar copia de backup de la imagen del canvas
    this.backupImage = this.ctx.getImageData(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    // guardar imagen en sessionStorage
    this.saveCanvasImage();
  }

  private redimensionarImagen(){
    // Recupera la URL de datos de localStorage
    const dataUrl = sessionStorage.getItem('canvasImage');

    const img = new Image();
    img.onload = () => {
      // Redibuja la imagen en el canvas ajustando el tamaño
      // Obtener las dimensiones originales de la imagen
      const originalWidth = this.backupImage?.width;
      const originalHeight = this.backupImage?.height;

      // Calcular la nueva altura manteniendo la proporción
      const aspectRatio = (originalHeight || 1) / (originalWidth || 1);
      const newHeight = this.anchoMaximo * aspectRatio;

      // Ajustar el alto del canvas según la nueva altura
      this.canvas.nativeElement.height = newHeight;
      this.ctx.drawImage(img, 0, 0, this.anchoMaximo, newHeight);
    }
    img.src = dataUrl || '';
  }

  // agrego evento al cambio de tamaño de pantalla
  // esto es para que se modifique el ancho del lienzo y sea responsive
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.adjustCanvasSize();

    // this.obtenerImgUpdate(this.dataImageUpdate);
    // this.redimensionarImagen();
    this.redimensionarImagen();
  }

  private adjustCanvasSize() {
    if (this.contenedorCanvas) {
      // ajustar ancho maximo
      this.anchoMaximo = this.contenedorCanvas.offsetWidth - 50;
    }
  }

  // escuchamos el evento mousedown con el decorador
  @HostListener('mousedown', ['$event'])
  onMouseDown(event:MouseEvent){
    // hemos presionado el boton del mouse
    // verifico si el click se hizo sobre el lienzo
    if(this.canvas.nativeElement===event.target){
      // cambio la prop estaDibujando a true para indicar que estoy dibujando
      this.estaDibujando = true;
      // defino el punto de arranque
      this.startX = event.offsetX;
      this.startY = event.offsetY;
      // console.log(this.startX,this.startY,'probando')

      if (this.selectedShape === 'pencil') {
        // si dibujo con el lapiz, llamo al metodo drawPencil
        this.canv.drawPencil(this.startX,this.startY,this.ctx,this.stylesLine);
      }
      else if(this.selectedShape === 'eraser'){
        // llamo al metodo para borrar
        this.canv.erase(this.startX, this.startY,this.ctx, this.eraserSize);
        console.log(this.canvas.nativeElement.style.cursor)
      }
      else if(this.selectedShape === 'fill'){
        // llamo al metodo para rellenar
        this.canv.fillArea(this.startX+22,this.startY+24,this.stylesLine.color,this.canvas,this.ctx);
      }
      else if(this.selectedShape === 'text'){
        // abrir modal texto
        this.modalText.abrirModal();
      }
      else{
        // en este caso estoy dibujando una figura
        // Guardar el canvas actual
        this.backupImage = this.ctx.getImageData(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
      }
    }
    
  }

  @HostListener('mousemove',['$event'])
  onMouseMove(event:MouseEvent){
    // evaluo si estoy dibujando(boton mouse presionado)
    if(this.estaDibujando){
      if (this.selectedShape === 'pencil') {
        // en este caso estoy dibujando con el lapiz

        // llamo al metodo drawPencil con las coordenadas actuales del mouse
        this.canv.drawPencil(event.offsetX, event.offsetY,this.ctx, this.stylesLine);
      }
      else if(this.selectedShape === 'eraser'){
        this.canv.erase(event.offsetX,event.offsetY, this.ctx, this.eraserSize);
      }
      else{
        // en este caso estoy dibujando una de las figuras
        this.restoreCanvas();

        this.canv.drawShape(this.startX, this.startY, event.offsetX, event.offsetY, true, this.ctx, this.selectedShape,this.stylesLine);
      }
    }
  }

  @HostListener('mouseup',['$event'])
  onMouseUp(event:MouseEvent){
    // si dejo de presionar el boton del mouse, cambio la prop estaDibujando a false
    if (this.estaDibujando && this.selectedShape !== 'pencil' && this.selectedShape!=='eraser' 
      && this.selectedShape!=='fill' && this.selectedShape!=='text') {
      this.restoreCanvas();
      const endX = event.offsetX;
      const endY = event.offsetY;
      this.canv.drawShape(this.startX, this.startY, endX, endY, false, this.ctx, this.selectedShape, this.stylesLine);
      // 
    }
    // para indicar que ya dejé de dibujar
    this.estaDibujando = false;
    // cierro el trazo con closePath
    this.ctx.closePath();

    // Guardar copia de backup de la imagen del canvas
    this.backupImage = this.ctx.getImageData(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    
    // guardar imagen en sessionStorage
    this.saveCanvasImage();
  }

  // evento para modificar el tamaño del borrador (eraser)
  @HostListener('window:keydown', ['$event'])
  aumentarBorrador(event:KeyboardEvent){
    if(event.key === '+' && this.eraserSize <40){
      // incrementar tamaño del borrador sin superar el maximo de 40
      this.eraserSize += 10;
      this.updateIconEraser(); //modificar icono del borrador
    }
    if(event.key === '-' && this.eraserSize>10){
      // decrementar tamaño del borrador sin bajar del minimo de 10
      this.eraserSize -= 10;
      this.updateIconEraser(); //modificar icono del borrador
    }    
  }

  // actualizar icono del cursor segun la forma o herramienta a usar
  updateCursor() {
    const canvasElement = this.canvas.nativeElement;
    switch (this.selectedShape) {
      case 'pencil':
        canvasElement.style.cursor = 'url(assets/images/iconos/lapiz.png), auto';
        break;
      case 'eraser':
        canvasElement.style.cursor = 'url(assets/images/iconos/borrador10.jpg), auto';
        this.eraserSize = 10;
        break;
      case 'fill':
        canvasElement.style.cursor = 'url(assets/images/iconos/bote-de-pintura.png), auto';
        break;
      case 'text':
        canvasElement.style.cursor = 'text';
        break;
      default:
        canvasElement.style.cursor = 'pointer';
        break;
    }
  }

  // metodo para modificar icono del borrador
  updateIconEraser(){
    // modificar el cursor según el tamaño
    switch (this.eraserSize){
      case 10:
        this.canvas.nativeElement.style.cursor = 'url(assets/images/iconos/borrador10.jpg), auto';
        break;
      case 20:
        this.canvas.nativeElement.style.cursor = 'url(assets/images/iconos/borrador20.jpg), auto';
        break;
      case 30:
        this.canvas.nativeElement.style.cursor = 'url(assets/images/iconos/borrador30.jpg), auto';
        break;
      case 40:
        this.canvas.nativeElement.style.cursor = 'url(assets/images/iconos/borrador40.jpg), auto';
        break;
    }
  }

  // restaurar copia de backup del canvas
  restoreCanvas() {
    if (this.backupImage) {
      this.ctx.putImageData(this.backupImage, 0, 0);
    }
  }

  // eliminar todo el dibujo
  BorrarDibujo(){
    // llamo al metodo del servicio canv para eliminar el dibujo
    this.canv.BorrarDibujo(this.ctx,this.canvas);

    // llamo al metodo para dibujar un fondo blanco
    this.addWhiteBackground();
  }

  // opcion de dibujo seleccionada
  selectShape(shape: any) {
    this.selectedShape = shape;

    this.updateCursor();
  }

  // recibo estilos para el trazo de las formas desde el componente hijo menu-herramientas
  recibirEstilos(estilos:any){
    this.stylesLine = estilos;
  }

  // recibo estilos para el texto desde el componente hijo menu-herramientas
  recibirEstilosTexto(estilosText:StylesText){
    this.stylesText = estilosText;
  }
  
  // metodo dibujar texto
  drawText(newText:string){
    // dibujar newText en coordenadas (startX, startY), llamo al metodo en el servicio
    this.canv.drawText(newText,this.ctx,this.startX,this.startY,this.stylesText);

    // hago un backup de la imagen del canvas
    this.backupImage = this.ctx.getImageData(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    // actualizo la imagen
    this.restoreCanvas();
  }

  // metodo para guardar dibujo
  saveDraw(name:string, accion:string){
    // abrir modal
    if(accion=='create'){
      this.modalComplete.title = 'Guardar Imagen';
      this.modalComplete.textoBodyModal = 'Guardando imagen...';
    }
    else{
      this.modalComplete.title = 'Actualizar Imagen';
      this.modalComplete.textoBodyModal = 'Guardando cambios en la imagen...';
    }
    this.modalAccion.abrirModal();

    // accedo al canvas por el id
    const dibujoComplete:HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    
    dibujoComplete.toBlob((blob) => {
      if(blob){
        var filePath = '',
            nombre = '';

        if(accion==='create'){
          /* cuando es create defino el path y el nombre viene como parametro
          que se ingreso en el modal*/
          filePath = `${this.auth.getUser()}/images/${new Date().getTime()}_${name+'.png'}`;
          nombre = name;
        }
        else{
          // cuando es update son los mismo path y nombre
          filePath = this.dataImageUpdate.path;
          nombre = this.dataImageUpdate.nombre;
        }

        // llamo al servicio para agregar el dibujo a Storage
        this.data.addImageToFirebaseStorage(filePath,blob)
        .then(async response => {
          console.log(response);

          // obtener url
          const url = await this.data.getUrlImage(filePath);
          console.log('url obtenida: ',url)

          // guardar en BBDD de FireStore
          const obj = {
            path: filePath,
            url: url,
            nombre: nombre
          }
          
          if(accion=='create'){
            // si es create => guardar registro nuevo en Firestore
            this.data.saveInFirestore(obj)
            .then(response => {
              
              // si es create el texto del modal será
              this.modalComplete.hab_btn = true;
              this.modalComplete.textoBodyModal = 'Imagen guardada con exito';
              console.log('imagen guardada con exito',response);
            })
            .catch(error => {
              console.log('ha ocurrido un error al cargar la imagen',error);
              this.modalComplete.textoBodyModal = 'Error al guardar la imagen';
              this.modalComplete.hab_btn = true;
            });
          }
          else{
            // si es update => actualizar registro existente con su id
            await this.data.updateInFirestore(obj,this.id)
            .then(response => {
              // si es update el texto del modal será
              this.modalComplete.hab_btn = true;
              this.modalComplete.textoBodyModal = 'Imagen actualizada con exito';
            })
            .catch(error => {
              console.log('ha ocurrido un error al cargar la imagen',error);
              this.modalComplete.textoBodyModal = 'Error al guardar la imagen';
              this.modalComplete.hab_btn = true;
            });
          }
          // 
        })
        .catch(error => {
          console.log(error);
          this.modalComplete.textoBodyModal = 'Ha ocurrido un error, no se pudo guardar su imagen';
          this.modalComplete.hab_btn = true;
        })
      }
    });
  }

  UploadComplete(){
    // reinicio variables
    this.modalComplete.textoBodyModal = '';
    this.modalComplete.hab_btn = false;
    this.modalComplete.title = '';

    this.router.navigate(['/listadibujos']);
  }
  // 
}
