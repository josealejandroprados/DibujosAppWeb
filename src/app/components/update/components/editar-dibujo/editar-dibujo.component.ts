import { Component, OnInit, ViewChild } from '@angular/core';
import { CanvasComponent } from 'src/app/shared/components/canvas/canvas.component';
import { StylesLine } from 'src/app/shared/models/styles.line';
import { StylesText } from 'src/app/shared/models/styles.text';

@Component({
  selector: 'app-editar-dibujo',
  templateUrl: './editar-dibujo.component.html',
  styleUrls: ['./editar-dibujo.component.css']
})
export class EditarDibujoComponent implements OnInit{

  // accedo al componente hijo canvas
  @ViewChild(CanvasComponent) canvasChild!:CanvasComponent;
  
  ngOnInit(): void {
    // 
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
