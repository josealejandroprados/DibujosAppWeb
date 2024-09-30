import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private baseUrl = 'https://lista-tareas-app-backend.vercel.app';

  constructor(private http:HttpClient) { }

  // metodo para solicitar al backend que envie un email con los datos del usuario
  sendEmail(email:any){
    return this.http.post<any>(`${this.baseUrl}/sendemail`,email);
  }
  
}
