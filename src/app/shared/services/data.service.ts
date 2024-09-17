import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { deleteObject, getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { ImageModel } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private storage:Storage,
    private firestore:Firestore,
    private auth:AuthService
  ) { }

  // agregar imagen al Storage
  addImageToFirebaseStorage(path:any, blob:any){
    // crear una referencia para la imagen que quiero cargar en Storage
    const imgRef = ref(this.storage,path);

    return uploadBytes(imgRef,blob);

    /*
    const uploadTask = uploadBytesResumable(imgRef,blob);

    
    uploadTask.on('state_changed', (snapshot) =>{
      const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;

      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // Handle unsuccessful uploads
      console.log(error);
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
      });
    })*/
  }

  // obtener url de la imagen recien cargada
  getUrlImage(path:string){
    // crear la referencia de la imagen a la que quiero obtener su url
    const imgRef = ref(this.storage,path)

    return getDownloadURL(imgRef);
  }

  // eliminar imagen
  deleteImage(path:string){
    // crear la referencia de la imagen que quiero eliminar
    const imgRef = ref(this.storage,path);

    return deleteObject(imgRef);
  }

  // eliminar todas imagenes
  async deleteAllImagesStorage(images:ImageModel[]){
    // recorro todo el array
    for(var k=0; k<images.length; k++){
      // elimino cada una de las imagenes con su path
      await this.deleteImage(images[k].path)
      .then( () => {
        console.log(`imagen ${images[k].nombre} eliminada exitosamente`);
      })
      .catch(error => {
        console.log(`error al eliminar la imagen ${images[k].nombre}`,error);
      });
    }
  }

  // guardar en firestore
  saveInFirestore(obj:any){
    // crear una referencia para el documento que voy a guardar
    const registroRef = collection(this.firestore,`${this.auth.getUser()}`);

    return addDoc(registroRef,obj);
  }

  // obtener la lista de imagenes registradas en la BBDD de Firestore
  getImages():Observable<ImageModel[]>{
    // obtener la referencia de la coleccion que quiero obtener
    const registrosRef = collection(this.firestore,`${this.auth.getUser()}`);
    
    return collectionData(registrosRef,{idField:'id'}) as Observable<ImageModel[]>;
  }

  // eliminar registro de la imagen en Firestore con su id
  deleteImageFirestore(id:string){
    // obtener una referencia al documento que quiero eliminar
    const registroRef = doc(this.firestore, `${this.auth.getUser()}/${id}`);

    return deleteDoc(registroRef);
  }

  // obtener un documento de Firestore con su id
  getImg(id:string){
    // obtener una referencia al documento que quiero obtener
    const registroRef = doc(this.firestore, `${this.auth.getUser()}/${id}`);

    return getDoc(registroRef);
  }

  // actualizar en firestore
  updateInFirestore(obj:any, id:string){
    // obtener una referencia al documento que quiero actualizar
    const registroRef = doc(this.firestore, `${this.auth.getUser()}/${id}`);

    return setDoc(registroRef,obj);
  }
  // 
}
