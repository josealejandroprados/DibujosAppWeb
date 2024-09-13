import { ElementRef, Injectable } from '@angular/core';
import { StylesText } from '../models/styles.text';
import { StylesLine } from '../models/styles.line';

enum Shape {
  Line = 'line',
  Rectangle = 'rectangle',
  Circle = 'circle',
  Triangle = 'triangle',
  Rhombus = 'rhombus',
  Heart = 'heart',
  Pentagon = 'pentagon',
  Hexagon = 'hexagon',
  Heptagon = 'heptagon',
  Octagon = 'octagon',
  Star4 = 'star4',
  Star5 = 'star5',
  Star6 = 'star6',
  ArrowUp = 'arrowUp',
  Curve = 'curve',
  TriangleRight = 'triangleRight',
  Ellipse = 'ellipse',
  Trapezoid = 'trapezoid',
  Pencil = 'pencil',
  Eraser = 'eraser',
  Fill = 'fill',
  Text = 'text',
  Square = 'square',
  Bell = 'bell',
}

@Injectable({
  providedIn: 'root'
})
export class CanvasService {

  constructor() { }

  // dibujar la figura que viene especificada en el parametro selectedShape
  drawShape(x1: number, y1: number, x2: number, y2: number, isPreview: boolean = false, ctx:CanvasRenderingContext2D, selectedShape:any, styles:StylesLine) {
    ctx.beginPath();
    switch (selectedShape) {
      case Shape.Line:
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        break;
      case Shape.Rectangle:
        ctx.rect(x1, y1, x2 - x1, y2 - y1);
        break;
      case Shape.Circle:
        const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
        break;
      case Shape.Triangle:
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x1 - (x2 - x1), y2);
        ctx.closePath();
        break;
      case Shape.Rhombus:
        const width = x2 - x1;
        const height = y2 - y1;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1 + width / 2, y1 + height / 2);
        ctx.lineTo(x1, y1 + height);
        ctx.lineTo(x1 - width / 2, y1 + height / 2);
        ctx.closePath();
        break;
      case Shape.Heart:
        this.drawHeart(x1, y1, x2 - x1, y2 - y1,ctx);
        break;
      case Shape.Pentagon:
        this.drawPolygon(x1, y1, x2, y2, 5, ctx); // Dibuja pentágono
        break;
      case Shape.Hexagon:
        this.drawPolygon(x1, y1, x2, y2, 6, ctx); // Dibuja hexágono
        break;
      case Shape.Heptagon:
          this.drawPolygon(x1, y1, x2, y2, 7, ctx); // Dibuja octágono
          break;
      case Shape.Octagon:
        this.drawPolygon(x1, y1, x2, y2, 8, ctx); // Dibuja octágono
        break;
      case Shape.Star4:
        this.drawStar(x1, y1, x2 - x1, y2 - y1, 4, ctx); //dibuja estrella de 4 puntas
        break;
      case Shape.Star5:
        this.drawStar(x1, y1, x2 - x1, y2 - y1, 5, ctx); // Dibuja estrella de 5 puntas
        break;
      case Shape.Star6:
        this.drawStar(x1, y1, x2 - x1, y2 - y1, 6,ctx); // Dibuja estrella de 6 puntas
        break;
      case Shape.ArrowUp:
        this.drawHollowArrow(x1, y1, x2, y2, ctx);
        break;
      case Shape.Curve:
        this.drawCurve(x1, y1, x2, y2, ctx);
        break;
      case Shape.TriangleRight:
        this.drawRightTriangle(x1, y1, x2, y2, ctx);
        break;
      case Shape.Ellipse:
        this.drawEllipse(x1, y1, x2, y2, ctx);
        break;
      case Shape.Trapezoid:
        this.drawTrapezoid(x1, y1, x2, y2, ctx);
        break;
      case Shape.Square:
        this.drawPerfectSquare(x1, y1, x2, y2, ctx);
        break;
      case Shape.Bell:
        this.drawBell(x1, y1, x2, y2, ctx);
        break;
    }
    ctx.lineWidth = styles.ancho;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = styles.color;
    ctx.fillStyle = styles.color;

    // dibujar trazo sin relleno
    ctx.stroke();
  }

  // dibujar con lapiz
  drawPencil(x: number, y: number, ctx:CanvasRenderingContext2D, styles:any) {
    // comenzar un trazado
    ctx.beginPath();
      
    // establecemos propiedades de la linea (ancho, terminación, forma, color)
    ctx.lineWidth = parseInt(styles.ancho);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    // defino color del trazo
    ctx.strokeStyle = styles.color;

    // movemos el cursor a la posicion actual
    ctx.moveTo(x, y+24);
    // Traza línea desde el último punto hasta el punto actual
    ctx.lineTo(x, y+24);
    // Aplica el trazo
    ctx.stroke();
  }

  // borrar
  erase(x: number, y: number, ctx:CanvasRenderingContext2D) {
    const eraserSize = 10;  // Tamaño del borrador
    ctx.clearRect(x, y, eraserSize, eraserSize);
  }

  // dibujar texto
  drawText(newText:string, ctx:CanvasRenderingContext2D, x:number, y:number, stylesText:StylesText){
    console.log(stylesText)
    // dibujar newText en coordenadas (x, y)
    if(stylesText.relleno==true){
      // dibujar texto con relleno usando el metodo fillText()
      if(stylesText.negrita==true && stylesText.italica==true){
        // dibujar con negrita e italica
        ctx.font = `bold italic ${stylesText.size}px ${stylesText.fuente}`;
        ctx.fillStyle = stylesText.color;
        ctx.fillText(newText, x, y);
      }
      else if(stylesText.negrita==true && stylesText.italica==false){
        // dibujar con negrita, no italica
        ctx.font = `bold ${stylesText.size}px ${stylesText.fuente}`;
        ctx.fillStyle = stylesText.color;
        ctx.fillText(newText, x, y);
      }
      else if(stylesText.negrita==false && stylesText.italica==true){
        // dibujar con italica, negrita no
        ctx.font = `italic ${stylesText.size}px ${stylesText.fuente}`;
        ctx.fillStyle = stylesText.color;
        ctx.fillText(newText, x, y);
      }
      else if(stylesText.negrita==false && stylesText.italica==false){
        // dibujar sin negrita ni italica
        ctx.font = `${stylesText.size}px ${stylesText.fuente}`;
        ctx.fillStyle = stylesText.color;
        ctx.fillText(newText, x, y);
      }
    }
    else{
      // console.log('dibujo sin relleno')
      ctx.fillStyle = ''; //quito relleno de estilo
      ctx.lineWidth = 1; /*modifico el ancho de linea para dibujar el texto sin relleno
      hago esta modificacion ya que luego de dibujar formas, este valor puede ser mayor a 1
      y dibujar el texto con un ancho de linea grande provocando que se vea con relleno*/

      // dibujar texto sin relleno usando el metodo strokeText()
      if(stylesText.italica==true){
        // dibujar con italica
        ctx.font = `italic ${stylesText.size}px ${stylesText.fuente}`;
        ctx.strokeStyle = stylesText.color;
        ctx.strokeText(newText, x, y);
      }
      else if(stylesText.italica==false){
        // dibujar sin italica
        ctx.font = `${stylesText.size}px ${stylesText.fuente}`;
        ctx.strokeStyle = stylesText.color;
        ctx.strokeText(newText, x, y);
      }
    }
    // verificar si lleva subrayado
    if(stylesText.subrayado==true){
      // dibujar subrayado
      const textWidth = ctx.measureText(newText).width;

      // dibujar la linea debajo del texto
      const lineHeight = 5;  // Distancia entre el texto y la línea
      const underlineThickness = 2;  // Grosor de la línea
      ctx.beginPath();
      ctx.moveTo(x, y + lineHeight);
      ctx.lineTo(x + textWidth, y + lineHeight);
      ctx.lineWidth = underlineThickness;
      ctx.strokeStyle = stylesText.color;
      ctx.stroke();
      ctx.closePath();
    }
    // verificar si el texto debe ir tachado
    if(stylesText.tachado==true){
      // dibujar subrayado
      const textWidth = ctx.measureText(newText).width;

      // Calcular la posición de la línea de tachado (en el centro vertical del texto)
      console.log(stylesText.size, y)
      const strikeHeight = y - stylesText.size / 2 +3;  // Línea en el centro del texto
      console.log(strikeHeight)

      // Dibujar la línea de tachado
      const strikeThickness = 2;  // Grosor de la línea
      ctx.beginPath();
      ctx.moveTo(x, strikeHeight);
      ctx.lineTo(x + textWidth, strikeHeight);
      ctx.lineWidth = strikeThickness;
      ctx.strokeStyle = stylesText.color;
      ctx.stroke();
      ctx.closePath();
    }
  }

  // dibujar campana
  drawBell(startX: number, startY: number, endX: number, endY: number, ctx:CanvasRenderingContext2D) {
    const width = Math.abs(endX - startX);  // Ancho según la distancia entre los puntos de inicio y fin
    const height = Math.abs(endY - startY); // Altura según la distancia entre los puntos de inicio y fin
  
    const x = startX < endX ? startX : endX;  // Determinar el punto x mínimo (izquierdo)
    const y = startY < endY ? startY : endY;  // Determinar el punto y mínimo (superior)
  
    ctx.beginPath();
  
    // Dibujar el arco de la campana (parte superior)
    ctx.moveTo(x, y + height * 0.4);
    ctx.arc(x + width / 2, y + height * 0.4, width / 2, Math.PI, 0, false);
  
    // Dibujar los lados curvados de la campana
    // dibujo el lado derecho
    ctx.quadraticCurveTo(x + width, y + height * 0.55, x + width*1.1, y + height * 0.7);
    // dibujo el lado izquierdo
    ctx.moveTo(x, y + height * 0.4);
    ctx.quadraticCurveTo(x, y + height * 0.55, x - width*0.1, y + height * 0.7);
  
    // Dibujar la base de la campana
    ctx.moveTo(x -width*0.1, y + height * 0.7);
    ctx.lineTo(x + width*1.1, y + height * 0.7);
    // dibujo el arco de la parte inferior de la campana
    ctx.arc(x + width / 2, y + height * 0.7, width / 4, 0, Math.PI, false);
  
    ctx.stroke();
  }
  
  // dibujar cuadrado perfecto
  drawPerfectSquare(startX: number, startY: number, currentX: number, currentY: number, ctx:CanvasRenderingContext2D){
    const sideLength = Math.min(Math.abs(currentX - startX), Math.abs(currentY - startY));
  
    ctx.beginPath();
    ctx.rect(startX, startY, sideLength, sideLength);
    ctx.stroke();
  }

  // dibujar linea curva
  private drawCurve(x1: number, y1: number, x2: number, y2: number, ctx:CanvasRenderingContext2D) {
    const controlX = (x1 + x2) / 2;
    const controlY = y1 - 50; // Controla la curvatura
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(controlX, controlY, x2, y2);
  }

  // dibujar pentagono (sides=5) o hexagono (sides=6)
  private drawPolygon(x1: number, y1: number, x2: number, y2: number, sides: number, ctx:CanvasRenderingContext2D) {
    const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const angle = (2 * Math.PI) / sides;
    ctx.moveTo(x1 + radius * Math.cos(0), y1 + radius * Math.sin(0));
    for (let i = 1; i <= sides; i++) {
      ctx.lineTo(
        x1 + radius * Math.cos(i * angle),
        y1 + radius * Math.sin(i * angle)
      );
    }
    ctx.closePath();
  }

  // dibujar flecha
  private drawHollowArrow(x1: number, y1: number, x2: number, y2: number, ctx:CanvasRenderingContext2D) {
    const headLength = 20; // Tamaño de la punta de la flecha
    const dx = x2 - x1;
    const dy = y2 - y1;
    const angle = Math.atan2(dy, dx);
  
    // Dibuja la línea de la flecha
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
  
    // Dibuja la punta hueca de la flecha
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - headLength * Math.cos(angle - Math.PI / 6), y2 - headLength * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - headLength * Math.cos(angle + Math.PI / 6), y2 - headLength * Math.sin(angle + Math.PI / 6));
    // 
  }

  // dibujar trapezio
  private drawTrapezoid(x1: number, y1: number, x2: number, y2: number, ctx:CanvasRenderingContext2D) {
    const topWidth = (x2 - x1) * 0.6;  // Ancho de la parte superior del trapecio
    const offsetX = (x2 - x1 - topWidth) / 2;
  
    ctx.moveTo(x1 + offsetX, y1);  // Esquina superior izquierda
    ctx.lineTo(x2 - offsetX, y1);  // Esquina superior derecha
    ctx.lineTo(x2, y2);            // Esquina inferior derecha
    ctx.lineTo(x1, y2);            // Esquina inferior izquierda
    ctx.closePath();               // Cerrar el trapecio
  }

  // dibujar triangulo rectangulo
  private drawRightTriangle(x1: number, y1: number, x2: number, y2: number, ctx:CanvasRenderingContext2D) {
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y1); // Base horizontal
    ctx.lineTo(x1, y2); // Altura vertical
    ctx.closePath();    // Cierra el triángulo
  }

  // dibujar elipse
  private drawEllipse(x1: number, y1: number, x2: number, y2: number, ctx:CanvasRenderingContext2D) {
    const centerX = (x1 + x2) / 2;
    const centerY = (y1 + y2) / 2;
    const radiusX = Math.abs(x2 - x1) / 2;
    const radiusY = Math.abs(y2 - y1) / 2;
  
    ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
  }

  // dibujar estrella
  private drawStar(x1: number, y1: number, width: number, height: number, points: number, ctx:CanvasRenderingContext2D) {
    const outerRadius = Math.min(width, height) / 2;
    const innerRadius = outerRadius / 2;
    const angle = Math.PI / points;
  
    ctx.moveTo(
      x1 + outerRadius * Math.cos(0),
      y1 - outerRadius * Math.sin(0)
    );
  
    for (let i = 1; i <= 2 * points; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      ctx.lineTo(
        x1 + radius * Math.cos(i * angle),
        y1 - radius * Math.sin(i * angle)
      );
    }
  
    ctx.closePath();
  }

  // dibujar corazon
  private drawHeart(x: number, y: number, width: number, height: number, ctx:CanvasRenderingContext2D) {
    const topCurveHeight = height * 0.3;
    ctx.beginPath();
    ctx.moveTo(x, y + topCurveHeight);
    ctx.bezierCurveTo(
      x, y, 
      x - width / 2, y, 
      x - width / 2, y + topCurveHeight
    );
    ctx.bezierCurveTo(
      x - width / 2, y + (height + topCurveHeight) / 2, 
      x, y + (height + topCurveHeight) / 2, 
      x, y + height
    );
    ctx.bezierCurveTo(
      x, y + (height + topCurveHeight) / 2, 
      x + width / 2, y + (height + topCurveHeight) / 2, 
      x + width / 2, y + topCurveHeight
    );
    ctx.bezierCurveTo(
      x + width / 2, y, 
      x, y, 
      x, y + topCurveHeight
    );
    ctx.closePath();
  }

  // eliminar dibujo
  BorrarDibujo(ctx:CanvasRenderingContext2D, canvas:ElementRef<HTMLCanvasElement>){
    ctx.clearRect(0, 0, canvas.nativeElement.width, canvas.nativeElement.height);
  }

  // metodo para rellenar un area
  fillArea(x: number, y: number, fillColor: string, canvas:ElementRef<HTMLCanvasElement>, ctx:CanvasRenderingContext2D) {
    // parametros (x,y): coordenadas actuales, fillColor: color con el que se pintará
    const canvasWidth = canvas.nativeElement.width; //ancho del lienzo
    const canvasHeight = canvas.nativeElement.height; //altura del lienzo
    const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight); //obtener imagen como datos
    const data = imageData.data; // accedo a los datos de la imagen
    const targetColor = this.getColorAtPixel(data, x, y, canvas); //obtener el color en el pixel (x,y)
  
    if (this.colorsMatch(targetColor, this.hexToRgb(fillColor))) {
      // console.log('no hacer nada')
      return;  // El área ya está del color de relleno, no hacer nada
    }

    // rellenar
    this.floodFill(data, x, y, targetColor, this.hexToRgb(fillColor), canvas);
    // actualizar datos de la imagen
    ctx.putImageData(imageData, 0, 0);
  }

  floodFill(data: Uint8ClampedArray, x: number, y: number, targetColor: number[], fillColor: number[], canvas:ElementRef<HTMLCanvasElement>) {
    const stack = [{ x, y }]; // inicializo la pila stack en el punto inicial

    const canvasWidth = canvas.nativeElement.width; //obtener ancho del lienzo
  
    // recorrer la pila
    while (stack.length > 0) {
      // extraer un pixel (x,y) de la pila
      const x = stack[stack.length-1].x;
      const y = stack[stack.length-1].y;
      stack.pop(); //quito el pixel de la pila

      // calculo la posición en la matriz de pixeles (currentPos) para el pixel (x,y)
      const currentPos = (y * canvasWidth + x) * 4;
  
      // verificar si el color coincide
      if (!this.colorsMatch(targetColor, this.getPixelColor(data, currentPos))) {
        // si el color del pixel actual no coincide con el color objetivo, se omite y se pasa al siguiente en la pila
        continue;
      }
  
      // si el color coincide, se establece el color del pixel actual en el color de relleno
      this.setPixelColor(data, currentPos, fillColor);
  
      // Apilar los píxeles adyacentes
      if (x > 0) stack.push({ x: x - 1, y });
      if (x < canvasWidth - 1) stack.push({ x: x + 1, y });
      if (y > 0) stack.push({ x, y: y - 1 });
      if (y < canvas.nativeElement.height - 1) stack.push({ x, y: y + 1 });
    }
  }
  
  // metodo que obtiene el color de un pixel especifico en el lienzo
  getColorAtPixel(data: Uint8ClampedArray, x: number, y: number, canvas:ElementRef<HTMLCanvasElement>): number[] {
    const canvasWidth = canvas.nativeElement.width;
    const index = (y * canvasWidth + x) * 4;
    return [data[index], data[index + 1], data[index + 2], data[index + 3]];
  }
  
  // metodo que obtiene el color de un pixel en una posición especifica de la matriz data
  getPixelColor(data: Uint8ClampedArray, index: number): number[] {
    return [data[index], data[index + 1], data[index + 2], data[index + 3]];
  }
  
  // metodo que establece el color de un pixel en una posición especifica de la matriz data
  setPixelColor(data: Uint8ClampedArray, index: number, color: number[]) {
    data[index] = color[0];
    data[index + 1] = color[1];
    data[index + 2] = color[2];
    data[index + 3] = 255;  // Totalmente opaco
  }
  
  // metodo que compara si dos colores son identicos
  colorsMatch(color1: number[], color2: number[]): boolean {
    // devuelve true si los colores son identicos
    return color1[0] === color2[0] && color1[1] === color2[1] && color1[2] === color2[2] && color1[3] === color2[3];
  }
  
  // metodo que convierte un color hexadecimal a un array de valores [r, g, b, 255]
  hexToRgb(hex: string): number[] {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b, 255];
  }
}
