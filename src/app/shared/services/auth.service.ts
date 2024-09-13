import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // defino opciones para cookies seguras
  options:any = {
    expires: 1, // Expiración en 1 día
    secure: true, // Asegura que solo se envíe en HTTPS
    sameSite: 'Strict', // Protege contra CSRF
  };
  
  constructor(
    private cookie:CookieService,
    private auth:Auth,
    private router:Router
  ) { }

  // registro de usuario con email y contraseña
  register(user:any){
    return createUserWithEmailAndPassword(this.auth,user.email,user.password);
  }

  // login usando email y contraseña
  login(user:any){
    return signInWithEmailAndPassword(this.auth,user.email,user.password);
  }

  // cerrar sesión
  logout(){
    return signOut(this.auth);
  }

  // obtener usuario actual
  getCurrentUser(user:any){
    this.auth.currentUser?.getIdToken()
    .then(token => {
      // llamar a metodo que guarda usuario en cookies
      this.setUser({token: token, user: user})
    })
    .catch(error => {
      console.log(error);
    });
  }

  // obtener el token
  getToken(){
    return this.cookie.get('token');
  }

  // obtener el usuario
  getUser(){
    return this.cookie.get('user');
  }

  // borrar usuario guardado en las cookies
  deleteCredentials(){
    this.cookie.deleteAll();
  }

  // metodo que indica con true o false si un usuario ha iniciado sesión
  estalogueado(){
    return this.cookie.get('token') ? true : false
  }

  // iniciar sesión con Google
  loginWithGoogle(){
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  // obtener el usuario cuando se inicia sesión con Google
  tokenWithGoogle(response:any){
    const credencial = GoogleAuthProvider.credentialFromResult(response);
    
    // llamar a metodo que guarda el usuario en cookies
    this.setUser({token: credencial?.idToken, user: response.user.email});
    
    // redirigir a pagina dibujar
    this.router.navigate(['/dibujar']);
  }

  // metodo para guardar el usuario en cookies
  private setUser(user:any){
    this.cookie.set('token',user.token,this.options);
    this.cookie.set('user',user.user,this.options);
  }
}
