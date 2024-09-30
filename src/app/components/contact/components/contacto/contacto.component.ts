import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ModalModel } from 'src/app/shared/models/modal.model';
import { ContactService } from 'src/app/shared/services/contact.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {

  // formulario reactivo de contacto
  formEmail = new FormGroup({
    'nombre': new FormControl('', Validators.required),
    'email_user': new FormControl('', [Validators.required,Validators.email]),
    'telefono': new FormControl(''),
    'asunto': new FormControl('',Validators.required),
    'mensaje': new FormControl('', Validators.required)
  });

  // modelo de modal de contacto
  modalContact:ModalModel = {
    title:'Contacto',
    hab_btn: false,
    textoBodyModal:'',
    textoBtn:'Ok'
  }

  // accedo al componente hijo ModalCarga
  @ViewChild(ModalComponent) modal_accion!:ModalComponent;

  constructor(
    private contact:ContactService,
    private router:Router
  ){}

  // metodo para enviar email
  enviarEmail(){
    if(this.formEmail.valid){
      // abrir modal
      this.modalContact.textoBodyModal = 'Enviando mensaje...';
      this.modal_accion.abrirModal();

      // llamo al servicio
      this.contact.sendEmail(this.formEmail.value).subscribe(resultado => {
        if(resultado.message=='exito'){
          // mensaje enviado con exito
          this.modalContact.textoBodyModal = '¡Su mensaje ha sido enviado con éxito!\nEn breve le estaré respondiendo \nmuchas gracias por comunicarse conmigo';
          this.modalContact.hab_btn = true;
        }
        else{
          // fallo al enviar el mensaje
          this.modalContact.textoBodyModal = '¡Ha ocurrido un error! \nNo se pudo enviar su mensaje, disculpe las molestias';
          this.modalContact.hab_btn = true;
        }
      });
    }
  }

  // metodo aceptar del modal luego de que el email se envió o falló
  aceptar(){
    this.modalContact.hab_btn = false;
    this.modalContact.textoBodyModal = '';
    this.router.navigate(['/dibujar']);
  }

  //getters
  get nombre(){
    return this.formEmail.get('nombre') as FormControl;
  }
  get email_user(){
    return this.formEmail.get('email_user') as FormControl;
  }
  get asunto(){
    return this.formEmail.get('asunto') as FormControl;
  }
  get mensaje(){
    return this.formEmail.get('mensaje') as FormControl;
  }
}
