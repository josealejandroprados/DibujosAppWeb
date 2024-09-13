import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ModalModel } from 'src/app/shared/models/modal.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formLogin = new FormGroup({
    'email': new FormControl('',[Validators.required, Validators.email]),
    'password': new FormControl('', Validators.required)
  });

  modalLogin:ModalModel = {
    title:'Iniciar Sesión',
    hab_btn: false,
    textoBodyModal:'',
    textoBtn:'Aceptar'
  }

  @ViewChild(ModalComponent) modal!:ModalComponent;

  constructor(
    private router:Router,
    private auth:AuthService
  ){}

  login(){
    if(this.formLogin.valid){
      // abrir modal
      this.modalLogin.textoBodyModal = 'Iniciando...';
      this.modal.abrirModal();

      // console.log(this.formLogin.value);

      this.auth.login(this.formLogin.value)
      .then( response => {
        // console.log(response);
        console.log('inicio de sesión exitoso');
        this.auth.getCurrentUser(this.formLogin.value.email);

        // inicio de sesión exitoso
        this.modalLogin.hab_btn = true;
        this.modalLogin.textoBodyModal = 'Inicio de sesión exitoso, Bienvenido';
      })
      .catch(error => {
        // error al hacer login
        this.modalLogin.hab_btn = true;
        this.modalLogin.textoBodyModal = '¡Error! Por favor verifique su email y/o contraseña';
        console.log(error);
      });
    }
  }

  loginWithGoogle(){
    this.auth.loginWithGoogle()
    .then(response => {
      // console.log(response.user.email);
      console.log('inicio de sesion con Google exitoso')

      this.auth.tokenWithGoogle(response);
    })
    .catch(error => {
      console.table(error);
    });
  }

  aceptar(){
    // reiniciar variables del modal
    this.modalLogin.hab_btn = false;
    this.modalLogin.textoBodyModal = '';
    if(this.auth.estalogueado()){
      this.router.navigate(['/dibujar']);
    }
    else{
      this.router.navigate(['/login']);
    }
  }
  
}
