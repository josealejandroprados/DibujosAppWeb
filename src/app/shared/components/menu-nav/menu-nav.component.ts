import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ModalConsulta } from '../../models/modal.consulta.model';
import { DataService } from '../../services/data.service';
import { ModalModel } from '../../models/modal.model';

declare var window:any;

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})
export class MenuNavComponent implements OnInit{

  varModalAcciones:any;
  modalAcciones:ModalConsulta = {
    title:'',
    textoBodyModal:''
  };
  action:string='';

  varModalExecute:any;
  modalExecute:ModalModel={
    title:'',
    textoBodyModal:'',
    textoBtn:'Aceptar',
    hab_btn:false
  }

  enlace_linkedIn = 'https://www.linkedin.com/in/jos%C3%A9-alejandro-prados-70930b169/';
  enlace_github_proyecto = 'https://github.com/josealejandroprados/DibujosAppWeb';

  ngOnInit(): void {
    this.varModalAcciones = new window.bootstrap.Modal(
      document.getElementById('modal-acciones')
    );

    this.varModalExecute = new window.bootstrap.Modal(
      document.getElementById('modal-execute-action')
    );
  }
  
  constructor(
    private auth: AuthService,
    private router: Router,
    private data:DataService
  ){}
  
  // metodo para cerrar sesión
  logout(){
    this.auth.logout()
    .then( () => {
      console.log('has cerrado sesión');

      // eliminar cookies y sesionStorage
      this.auth.deleteCredentials();

      this.modalExecute.textoBodyModal = '¡Has cerrado sesión! Vuelve pronto!';
      this.modalExecute.hab_btn = true;
    })
    .catch(error => {
      console.log(error);

      // eliminar cookies y sesionStorage
      this.auth.deleteCredentials();

      this.modalExecute.textoBodyModal = 'Ha ocurrido un error al cerrar sesión';
      this.modalExecute.hab_btn = true;
    });
  }

  // metodo que devuelve el usuario logueado en caso de existir
  getUser(){
    return this.auth.getUser();
  }

  // metodo que retorna true o false dependiendo de si se ha logueado o no un usuario
  estalogueado(){
    return this.auth.estalogueado();
  }

  consultaAcciones(accion:string){
    this.action = accion;

    if(this.action=='logout'){
      this.modalAcciones = {
        title: 'Cerrar Sesión',
        textoBodyModal: '¿Estás seguro que deseas cerrar sesión?'
      }
    }
    else{
      this.modalAcciones = {
        title: 'Eliminar Cuenta',
        textoBodyModal: '¿Estás seguro que deseas eliminar tu cuenta?. \n\n¡Esto eliminará todos tus dibujos!'
      }
    }

    // abrir modal
    this.varModalAcciones.show();
  }

  // metodo de aceptación de accion (cerrar sesion o eliminar cuenta) en modal
  ok(){
    if(this.action=='logout'){
      // cerrar modal
      this.cerrarModalConsulta();

      // modifico propiedades de modalExecute
      this.modalExecute.title = 'Cerrar Sesión';
      this.modalExecute.textoBodyModal = '';
      // abrir modal execute
      this.varModalExecute.show();

      // realizo el logout
      this.logout();
    }
    else{
      // cerrar modal de consulta
      this.cerrarModalConsulta();

      // modifico propiedades de modalExecute
      this.modalExecute.title = 'Eliminar Cuenta';
      this.modalExecute.textoBodyModal = 'Eliminando dibujos...'
      // abrir modal execute
      this.varModalExecute.show();

      // elimino cuenta
      // obtener registros de Firestore
      this.data.getImages().subscribe(async datos => {
        // eliminar los dibujos de Storage usando el path
        await this.data.deleteAllImagesStorage(datos);

        // eliminar todos los registros de Firestore y eliminar usuario (dentro del metodo deleteAllFirestore)
        // await this.data.deleteAllFirestore(datos);
        var promesasPendientes: Promise<any>[] = [];

        // recorro todo el array
        for(var k=0; k<datos.length; k++){
          // elimino cada registro con su id
          const promesa = this.data.deleteImageFirestore(datos[k].id);
        
          // guardo la promesa en un array de promesas
          promesasPendientes.push(promesa);
        }

        // verificar si se han cumplido todas las promesas
        Promise.all(promesasPendientes)
        .then( resultados => {
          console.log('registros eliminados con exito',resultados);
        
          // limpio el array de promesas
          promesasPendientes = [];
        
          // eliminar usuario
          console.log('eliminando usuario...');
          this.modalExecute.textoBodyModal = 'Eliminando usuario...';
          this.auth.deleteAccountUser()
          .then( () => {
            console.log('usuario eliminado con éxito');

            // eliminar credenciales
            this.auth.deleteCredentials();

            this.modalExecute.hab_btn = true;
            this.modalExecute.textoBodyModal = 'Usuario eliminado con exito';
          })
          .catch(error => {
            console.log('error al eliminar el usuario', error);

            // eliminar credenciales
            this.auth.deleteCredentials();

            this.modalExecute.hab_btn = true;
            this.modalExecute.textoBodyModal='¡Error! para poder eliminar su usuario necesita realizar una autenticacion mas reciente, por favor vuelva a autenticarse';
          });
        })
        .catch(error => {
          console.log('una de las promesas falló',error)
        });
      });
      
    }
  }

  aceptar(){
    if(this.modalExecute.title == 'Eliminar Cuenta'){
      // se dio click en aceptar despues de eliminar cuenta
      if(this.modalExecute.textoBodyModal=='Usuario eliminado con exito'){
        // cerrar modal y reiniciar variables de modal Execute
        this.cerrarModalExecute();
        // redirigir a /dibujar
        this.router.navigate(['dibujar']);
      }
      else{
        // cerrar modal y reiniciar variables de modal Execute
        this.cerrarModalExecute();
        // redirigir a login
        this.router.navigate(['login']);
      }
    }
    else{
      // se dio click en aceptar despues de cerrar sesión

      // cerrar modal execute y reiniciar variables de modal execute
      this.cerrarModalExecute();
      
      // redirigir a dibujar
      this.router.navigate(['/dibujar']);

      // recargar pagina luego de 200 ms (browser refresh)
      setTimeout(() => {
        window.location.reload();
      }, 200);
    }
    
  }

  // metodo para cerrar modal execute y reiniciar variables de modalExecute
  private cerrarModalExecute(){
    // cerrar modal execute
    this.varModalExecute.hide();
    // reiniciar variables de modal execute
    this.modalExecute.title = '';
    this.modalExecute.textoBodyModal = '';
    this.modalExecute.hab_btn = false;
    this.modalExecute.textoBtn = 'Aceptar';
  }

  // metodo para cerrar modal
  cerrarModalConsulta(){
    this.varModalAcciones.hide();

    // reiniciar variables del modalAcciones
    this.modalAcciones.textoBodyModal='';
    this.modalAcciones.title='';
  }

}
