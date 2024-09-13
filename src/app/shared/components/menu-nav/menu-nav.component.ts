import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})
export class MenuNavComponent implements OnInit{

  enlace_linkedIn = 'https://www.linkedin.com/in/jos%C3%A9-alejandro-prados-70930b169/';
  enlace_github_proyecto = 'https://github.com/josealejandroprados/DibujosAppWeb';

  ngOnInit(): void {
    // 
  }
  
  constructor(
    private auth: AuthService,
    private router: Router
  ){}

  logout(){
    this.auth.logout()
    .then( () => {
      console.log('has cerrado sesión');

      this.auth.deleteCredentials();

      this.router.navigate(['/login']);

      setTimeout(() => {
        window.location.reload();
      }, 200);
    })
    .catch(error => {
      console.log(error);
    });
  }

  getUser(){
    return this.auth.getUser();
  }

  estalogueado(){
    return this.auth.estalogueado();
  }

}
