import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CanvasComponent } from 'src/app/shared/components/canvas/canvas.component';
import { StylesLine } from 'src/app/shared/models/styles.line';
import { StylesText } from 'src/app/shared/models/styles.text';

@Component({
  selector: 'app-editar-dibujo',
  templateUrl: './editar-dibujo.component.html',
  styleUrls: ['./editar-dibujo.component.css']
})
export class EditarDibujoComponent implements OnInit, AfterViewInit{

  // accedo al componente hijo canvas
  @ViewChild(CanvasComponent) canvasChild!:CanvasComponent;

  @ViewChild('mainElement') mainElem !: ElementRef<HTMLElement>;

  pantallaChica!:boolean;

  ngAfterViewInit(): void {
    // Detectar el tamaño de la pantalla al iniciar la aplicación
    const windowWidth = window.innerWidth;
    if(windowWidth<=991){
      this.pantallaChica = true;
    }
    else{
      this.pantallaChica = false;
      this.mainElem.nativeElement.classList.add('container-fluid');
    }
  }
  
  ngOnInit(): void {
    // 
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const windowWidth = (event.target as Window).innerWidth;
    console.log('window: ',windowWidth)
    if(windowWidth<=991){
      this.pantallaChica = true;
      this.mainElem.nativeElement.classList.remove('container-fluid');
    }
    else{
      this.pantallaChica = false;
      this.mainElem.nativeElement.classList.add('container-fluid');
    }
  }

  // eliminar todo el dibujo
  BorrarDibujo(){
    // llamo al metodo BorrarDibujo en el componente hijo canvas
    this.canvasChild.BorrarDibujo();
  }

  // opcion de dibujo seleccionada
  selectShape(shape: any) {
    // llamo al metodo selectShape del componente hijo canvas
    this.canvasChild.selectShape(shape);
  }

  // recibo estilos para el trazo de las formas desde el componente hijo menu-herramientas
  recibirEstilos(estilos:StylesLine){
    // llamo al metodo recibirEstilos en el componente hijo canvas
    this.canvasChild.recibirEstilos(estilos);
  }

  // recibo estilos para el texto desde el componente hijo menu-herramientas
  recibirEstilosTexto(estilosText:StylesText){
    // llamo al metodo recibirEstilosTexto en el componente hijo canvas
    this.canvasChild.recibirEstilosTexto(estilosText)
  }

  // metodo para guardar dibujo
  saveDraw(name:string){
    // llamo al metodo saveDraw que se encuentra en el componente hijo canvas
    this.canvasChild.saveDraw(name,'update');
  }

  // metodo para modificar el tamaño del borrador, llamado desde el componente hijo menu-herramientas
  updateEraser(acto:string){
    // acto: + o -
    this.canvasChild.updateSizeEraser(acto);
  }
  // 
}
