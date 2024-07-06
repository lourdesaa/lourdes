import { Injectable } from '@angular/core';
// Servicio de AUTENTIFICACIÓN de FIREBASE
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public auth: AngularFireAuth) { }

  registrar(email: string, password: string){
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  iniciarSesion(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  // Función para CERRAR SESIÓN
  cerrarSesion(){
    return this.auth.signOut();
  }

  // Función para tomar UID
  async obtenerUid(){
    const user = await this.auth.currentUser;

    if(user == null){
      return null;
    } else {
      return user.uid;
    }
  }
}
