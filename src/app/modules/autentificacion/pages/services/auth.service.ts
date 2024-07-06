// Importaciones necesarias para el servicio de autenticación
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación
})
export class AuthService {
  // El constructor inyecta AngularFireAuth como una dependencia
  constructor(public auth: AngularFireAuth) { }

  // Método para registrar un nuevo usuario utilizando email y contraseña
  registrar(email: string, password: string){
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  // Método para iniciar sesión con un usuario existente utilizando email y contraseña
  iniciarSesion(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  // Método para cerrar la sesión del usuario actual
  cerrarSesion(){
    return this.auth.signOut();
  }

  // Método para obtener el UID del usuario actual
  async obtenerUid(){
    const user = await this.auth.currentUser;

    // Si user es null, devuelve null, sino, devuelve el UID del usuario
    if(user == null){
      return null;
    } else {
      return user.uid;
    }
  }
}
