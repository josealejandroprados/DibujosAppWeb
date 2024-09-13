export class ModalModel{

    constructor(
        title:string,
        hab_btn:boolean,
        textoBodyModal:string,
        textoBtn:string
    ){
        this.title = title;
        this.hab_btn = hab_btn;
        this.textoBodyModal = textoBodyModal;
        this.textoBtn = textoBtn;
    }

    title!:string;
    hab_btn!:boolean;
    textoBodyModal!:string;
    textoBtn!:string;
}