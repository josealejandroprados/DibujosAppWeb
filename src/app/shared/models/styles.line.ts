export class StylesLine{

    constructor(
        ancho:number = 1,
        color:string = '#F10985'
    ){
        this.ancho = ancho;
        this.color = color;
    }

    ancho:number;
    color:string;

    valoresIniciales(){
        return `size: ${this.ancho}, color: ${this.color}`;
    }
}