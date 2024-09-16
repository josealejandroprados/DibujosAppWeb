import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ModalModel } from 'src/app/shared/models/modal.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formRegister = new FormGroup({
    'email': new FormControl('',[Validators.required, Validators.email]),
    'password': new FormControl('', Validators.required)
  });

  modalRegisterUser:ModalModel = {
    title:'Registrar Usuario',
    hab_btn: false,
    textoBodyModal:'',
    textoBtn:'Aceptar'
  }

  @ViewChild(ModalComponent) modal!:ModalComponent;

  constructor(
    private auth:AuthService,
    private router:Router
  ){}

  register(){
    if(this.formRegister.valid){
      // abrir modal
      this.modalRegisterUser.textoBodyModal = 'Registrando usuario...';
      this.modal.abrirModal();

      // console.log(this.formRegister.value);

      this.auth.register(this.formRegister.value)
      .then(response => {
        // console.log(response);
        // registro realizado con exito
        this.modalRegisterUser.hab_btn = true;
        this.modalRegisterUser.textoBodyModal = 'Registro realizado con exito';

        // this.router.navigate(['/login']);
      })
      .catch(error => {
        console.log(error);
        this.modalRegisterUser.hab_btn = true;
        this.modalRegisterUser.textoBodyModal = '¡Ha ocurrido un error! No se pudo realizar el registro';
      });
    }
  }

  aceptar(){
    // reinicio variables de modal
    
    this.modalRegisterUser.hab_btn = false;

    if(this.modalRegisterUser.textoBodyModal=='Registro realizado con exito'){
      this.modalRegisterUser.textoBodyModal = '';

      // si el registro es exitoso => redirigir a pagina dibujar
      this.router.navigate(['/login']);
    }
    else{
      this.modalRegisterUser.textoBodyModal = '';
    }
  }

  // getters
  get email(){
    return this.formRegister.get('email') as FormControl;
  }
  get password(){
    return this.formRegister.get('password') as FormControl;
  }
  
}
