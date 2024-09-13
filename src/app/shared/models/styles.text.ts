export class StylesText{

    constructor(
        size:number = 16,
        color:string = '#2420D9',
        fuente:string = 'Arial',
        negrita:boolean = false,
        italica:boolean = false,
        subrayado:boolean = false,
        relleno:boolean = false,
        tachado:boolean = false
    ){
        this.size = size;
        this.color = color;
        this.fuente = fuente;
        this.negrita = negrita;
        this.italica = italica;
        this.subrayado = subrayado;
        this.relleno = relleno;
        this.tachado = tachado;
    }

    size:number;
    color:string;
    fuente:string;
    negrita:boolean;
    italica:boolean;
    subrayado:boolean;
    relleno:boolean;
    tachado:boolean;

    valoresIniciales(){
        return `size: ${this.size}, color: ${this.color}, fuente: ${this.fuente}, 
        negrita: ${this.negrita}, italica: ${this.italica}, subrayado: ${this.subrayado}, 
        relleno: ${this.relleno}, tachado: ${this.tachado}`;
    }
}