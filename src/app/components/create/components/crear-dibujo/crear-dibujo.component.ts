import { Component, OnInit, ViewChild } from '@angular/core';
import { CanvasComponent } from 'src/app/shared/components/canvas/canvas.component';
import { StylesLine } from 'src/app/shared/models/styles.line';
import { StylesText } from 'src/app/shared/models/styles.text';

@Component({
  selector: 'app-crear-dibujo',
  templateUrl: './crear-dibujo.component.html',
  styleUrls: ['./crear-dibujo.component.css']
})
export class CrearDibujoComponent implements OnInit{

  // accedo al componente hijo canvas
  @ViewChild(CanvasComponent) canvasChild!:CanvasComponent;
  
  constructor(){}

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
    this.canvasChild.saveDraw(name,'create');
  }
  
}
