import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  fecha = new Date();
  texto1 = '@'+this.fecha.getFullYear() + ' ' + 'Ing. José A. Prados' + ', IT Developer Full Stack';
  enlace_linkedIn = 'https://www.linkedin.com/in/jos%C3%A9-alejandro-prados-70930b169/';
  enlace_github = 'https://github.com/josealejandroprados';

  openWhatsApp(){
    const phoneNumber = '543814410958';
    const message = 'Hola como estas?';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
  }

}
