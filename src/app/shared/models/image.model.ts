export class ImageModel{
    constructor(
        id:string,
        nombre:string,
        url:string,
        path:string
    ){
        this.id = id;
        this.nombre = nombre;
        this.path = path;
        this.url = url;
    }

    id!:string;
    nombre!:string;
    url!:string;
    path!:string;
}