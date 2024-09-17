import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ModalConsulta } from '../../models/modal.consulta.model';
import { DataService } from '../../services/data.service';

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

  enlace_linkedIn = 'https://www.linkedin.com/in/jos%C3%A9-alejandro-prados-70930b169/';
  enlace_github_proyecto = 'https://github.com/josealejandroprados/DibujosAppWeb';

  ngOnInit(): void {
    this.varModalAcciones = new window.bootstrap.Modal(
      document.getElementById('modal-acciones')
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

      // redirigir a login
      this.router.navigate(['/login']);

      // recargar pagina luego de 200 ms (browser refresh)
      setTimeout(() => {
        window.location.reload();
      }, 200);
    })
    .catch(error => {
      console.log(error);
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
      // realizo el logout
      this.logout();

      // cerrar modal
      this.cerrarModalConsulta();
    }
    else{
      // elimino cuenta
      // obtener registros de Firestore
      this.data.getImages().subscribe(async datos => {
        // eliminar los dibujos de Storage usando el path
        await this.data.deleteAllImagesStorage(datos);

        // eliminar todos los registros de Firestore y eliminar usuario (dentro del metodo deleteAllFirestore)
        await this.data.deleteAllFirestore(datos);

        // cerrar modal
        this.cerrarModalConsulta();
      });
      
    }
  }

  // metodo para cerrar modal
  cerrarModalConsulta(){
    this.varModalAcciones.hide();

    // reiniciar variables del modalAcciones
    this.modalAcciones.textoBodyModal='';
    this.modalAcciones.title='';
  }

}
